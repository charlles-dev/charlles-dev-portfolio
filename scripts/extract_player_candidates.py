from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

SOURCE = Path("game-assets/production/player/player-master-reference-v2.png")
OUT = Path("game-assets/production/player-candidates")
OUT.mkdir(parents=True, exist_ok=True)

# The master sheet uses a stable 3x2 grid. These labels are review candidates,
# not runtime-approved animation states.
labels = [
    ("idle", 0, 0),
    ("walk", 1, 0),
    ("interact", 2, 0),
    ("use-lumen", 1, 1),
    ("dash", 2, 1),
]

image = Image.open(SOURCE).convert("RGBA")
width, height = image.size
cell_w, cell_h = width // 3, height // 2

for label, col, row in labels:
    left = col * cell_w
    top = row * cell_h
    right = (col + 1) * cell_w
    bottom = (row + 1) * cell_h
    tile = image.crop((left, top, right, bottom))
    arr = np.asarray(tile).astype(np.float32)
    rgb = arr[:, :, :3]

    # Estimate the pale paper background from the four corners. The character
    # is much darker/oranger than this background, so this does not touch the
    # dark hair, glasses, skin, hoodie, or mint Lumen.
    samples = np.concatenate([
        rgb[:24, :24].reshape(-1, 3),
        rgb[:24, -24:].reshape(-1, 3),
        rgb[-24:, :24].reshape(-1, 3),
        rgb[-24:, -24:].reshape(-1, 3),
    ], axis=0)
    bg = np.median(samples, axis=0)
    distance = np.linalg.norm(rgb - bg, axis=2)

    # Soft matte: preserve antialiased outlines while making paper and its
    # pale shadow disappear. The original RGB is preserved for foreground.
    # The paper texture varies across the tile, so a low threshold leaves a
    # visible cream checker/halo. Foreground colors are much farther from the
    # corner-paper median; retain only the high-distance region and feather it.
    alpha = np.clip((distance - 78.0) / 28.0, 0.0, 1.0)
    alpha = (alpha * 255.0).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(radius=0.45))
    rgba = Image.fromarray(np.dstack([rgb.astype(np.uint8), np.asarray(alpha_img)]), mode="RGBA")

    bbox = rgba.getchannel("A").point(lambda value: 255 if value > 25 else 0).getbbox()
    if bbox is None:
        raise RuntimeError(f"No foreground detected for {label}")
    pad = 18
    bbox = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(cell_w, bbox[2] + pad),
        min(cell_h, bbox[3] + pad),
    )
    sprite = rgba.crop(bbox)
    sprite.save(OUT / f"sprite-{label}-candidate.png", optimize=True)

print(f"extracted={len(labels)} output={OUT}")
