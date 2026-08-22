import { afterEach, describe, expect, it, vi } from "vitest";

import { configureTelemetry, setTelemetryConsent, trackTelemetry } from "@/lib/telemetry";

afterEach(() => {
  configureTelemetry(null);
  setTelemetryConsent(false);
  vi.restoreAllMocks();
});

describe("privacy-first telemetry", () => {
  it("does not emit while consent is absent", () => {
    const sink = vi.fn();
    configureTelemetry(sink);

    trackTelemetry({ name: "panel_open", panel: "work" });

    expect(sink).not.toHaveBeenCalled();
  });

  it("emits only the allowlisted event after explicit opt-in", () => {
    const sink = vi.fn();
    configureTelemetry(sink);
    setTelemetryConsent(true);

    trackTelemetry({ name: "contact_cta_click", channel: "calendar" });

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink).toHaveBeenCalledWith({ name: "contact_cta_click", channel: "calendar" });
  });

  it("forwards a project refresh error without extra payload after opt-in", () => {
    const sink = vi.fn();
    configureTelemetry(sink);
    setTelemetryConsent(true);

    trackTelemetry({ name: "projects_refresh_error", source: "api" });

    expect(sink).toHaveBeenCalledWith({ name: "projects_refresh_error", source: "api" });
  });

  it("stops emitting after consent is revoked", () => {
    const sink = vi.fn();
    configureTelemetry(sink);
    setTelemetryConsent(true);
    setTelemetryConsent(false);

    trackTelemetry({ name: "video_fallback", media: "hero-scrub" });

    expect(sink).not.toHaveBeenCalled();
  });
});
