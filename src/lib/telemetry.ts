export type TelemetryEvent =
  | { name: "panel_open"; panel: "work" | "about" | "contact" }
  | { name: "contact_cta_click"; channel: "whatsapp" | "email" | "calendar" }
  | { name: "video_fallback"; media: "hero-scrub" | "hero-idle" | "hero-awake" }
  | { name: "projects_refresh_error"; source: "api" };

export type TelemetrySink = (event: TelemetryEvent) => void;

const CONSENT_KEY = "charlles-telemetry-consent";
let sink: TelemetrySink | null = null;

function hasConsent() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function configureTelemetry(nextSink: TelemetrySink | null) {
  sink = nextSink;
}

export function setTelemetryConsent(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (enabled) window.localStorage.setItem(CONSENT_KEY, "granted");
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Storage can be unavailable in private browsing or locked-down contexts.
  }
}

export function trackTelemetry(event: TelemetryEvent) {
  if (!sink || !hasConsent()) return;
  try {
    sink(event);
  } catch {
    // Observability must never interfere with the portfolio experience.
  }
}
