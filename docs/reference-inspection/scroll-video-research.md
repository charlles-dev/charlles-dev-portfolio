# Scroll-driven video research

## Findings

1. `HTMLMediaElement.currentTime` changes the media position by seeking; it is the correct primitive for mapping scroll progress to a video timeline, but repeated writes should be coalesced rather than issued for every raw scroll event. Source: [MDN currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime).

2. `HTMLVideoElement.requestVideoFrameCallback()` runs when a new video frame is sent to the compositor and is preferable to `timeupdate` for frame-aware synchronization. It exposes `mediaTime`, `presentedFrames`, and expected display timing. Source: [MDN requestVideoFrameCallback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback).

3. `requestVideoFrameCallback()` is synchronized to the lower of the video frame rate and display refresh rate, while `requestAnimationFrame()` follows the page refresh rate. This makes it useful for observing the result of a seek and for avoiding redundant visual updates, but it does not guarantee frame-accurate seeking; WebCodecs would be required for that level of control. Source: [web.dev requestVideoFrameCallback](https://web.dev/articles/requestvideoframecallback-rvfc).

4. CSS scroll-driven animation timelines can bind animation progress directly to scrolling and avoid main-thread scroll listeners for CSS-only effects. They do not directly seek an HTML video element, so the video timeline still needs a small JavaScript controller. Source: [MDN scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines).

## Implementation decision

The current hero controller uses independent top and bottom ping-pong loops and only scrubs a reduced middle interval. That discards part of the video timeline and makes the loop boundaries visible. The replacement should use one normalized scroll timeline for the entire video duration, write `currentTime` only through a requestAnimationFrame coalescer, and reserve small stable endpoint windows for idle/awake ping-pong playback. The seek target must be monotonic during the middle region and must never be overwritten by a second loop controller while the user is scrolling.

The source video is 9.35 seconds after removing the incompatible final eye-closing tail. Proposed normalized mapping: 0–0.16 scroll = idle endpoint window; 0.16–0.84 = the complete central timeline including awakening; 0.84–1 = awake endpoint window. The exact source-time bounds should be measured from the new video before coding, rather than inferred from the previous 6.95-second approximation.


## Measured hero timeline

The integrated WebM is VP9, 1280×720, 24 fps, and approximately 9.35 seconds after the incompatible eye-closing tail was removed. A 5 fps contact sheet shows the first third as the closed-eye idle state, the middle as a continuous dark-to-celestial awakening, and the final third as the open-eye state with side/diagonal glances. The new controller uses the full normalized source timeline: the idle endpoint window is 0–29% of source time, the central scroll mapping is 29–73%, and the awake endpoint window is 73–99%.

The scroll range is mapped as follows: 0–16% scroll uses the idle ping-pong loop; 16–84% scrubs monotonically across the source from 29% to 73%, including the entire awakening sequence; 84–100% uses the awake ping-pong loop. Seeks in the central range are coalesced into one `requestAnimationFrame`, so rapid scroll events cannot issue competing `currentTime` writes. The endpoint controller carries the current time into the relevant window when changing state instead of resetting to a fixed frame.
