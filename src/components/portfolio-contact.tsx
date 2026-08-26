"use client";

import { useEffect, useRef, type RefObject } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { bookingUrl, profile, socialLinks } from "@/lib/portfolio";
import { trackTelemetry } from "@/lib/telemetry";

function ContactMedia({ video, videoRef }: { video: string; videoRef: RefObject<HTMLVideoElement | null> }) {
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: hover) and (pointer: fine)").matches || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => undefined);
      else {
        element.pause();
        element.currentTime = 0;
      }
    }, { threshold: .45 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [videoRef]);

  return (
    <span className="portfolio-contact-media" aria-hidden="true">
      <video ref={videoRef} src={video} muted playsInline loop preload="auto" />
    </span>
  );
}

export function PortfolioContact({ dictionary }: { dictionary: PortfolioDictionary }) {
  const whatsappVideoRef = useRef<HTMLVideoElement>(null);
  const callVideoRef = useRef<HTMLVideoElement>(null);
  const whatsapp = socialLinks.find((link) => link.kind === "whatsapp");
  const discord = socialLinks.find((link) => link.kind === "discord");
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(dictionary.contact.emailSubject)}&body=${encodeURIComponent(dictionary.contact.emailBody)}`;
  const play = (ref: RefObject<HTMLVideoElement | null>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => undefined);
  };
  const pause = (ref: RefObject<HTMLVideoElement | null>) => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <section className="portfolio-contact-section" id="contact" aria-labelledby="portfolio-contact-title">
      <div className="portfolio-contact-heading">
        <p className="reference-eyebrow">{dictionary.contact.eyebrow}</p>
        <h2 id="portfolio-contact-title">{dictionary.contact.cardTitle}</h2>
        <p>{dictionary.contact.cardBody}</p>
      </div>

      <div className="portfolio-contact-actions">
        {whatsapp && (
          <a className="portfolio-contact-action is-primary" href={whatsapp.href} target="_blank" rel="noreferrer" aria-label={dictionary.contact.primaryCta} onPointerEnter={() => play(whatsappVideoRef)} onPointerLeave={() => pause(whatsappVideoRef)} onFocus={() => play(whatsappVideoRef)} onBlur={() => pause(whatsappVideoRef)} onClick={() => trackTelemetry({ name: "contact_cta_click", channel: "whatsapp" })}>
            <ContactMedia video="/reference/contact/charlles-whatsapp.mp4" videoRef={whatsappVideoRef} />
            <span className="portfolio-contact-action-copy">
              <small>{dictionary.contact.availability}</small>
              <strong>{dictionary.contact.primaryCta}</strong>
              <span>{dictionary.contact.description}</span>
            </span>
            <IconGlyph name="external-link" className="size-5" />
          </a>
        )}

        <a className="portfolio-contact-action" href={bookingUrl} target="_blank" rel="noreferrer" aria-label={dictionary.contact.callCta} onPointerEnter={() => play(callVideoRef)} onPointerLeave={() => pause(callVideoRef)} onFocus={() => play(callVideoRef)} onBlur={() => pause(callVideoRef)} onClick={() => trackTelemetry({ name: "contact_cta_click", channel: "calendar" })}>
          <ContactMedia video="/reference/contact/charlles-call.mp4" videoRef={callVideoRef} />
          <span className="portfolio-contact-action-copy">
            <small>{dictionary.contact.callMeta}</small>
            <strong>{dictionary.contact.callCta}</strong>
            <span>{dictionary.contact.cardBody}</span>
          </span>
          <IconGlyph name="external-link" className="size-5" />
        </a>
      </div>

      <div className="portfolio-contact-direct" aria-label={dictionary.contact.direct}>
        <a href={emailHref} aria-label="Email" onClick={() => trackTelemetry({ name: "contact_cta_click", channel: "email" })}>
          <IconGlyph name="mail" className="size-5" />
          {profile.email}
        </a>
        {discord && (
          <a href={discord.href} target="_blank" rel="noreferrer" aria-label={discord.label}>
            <IconGlyph name="discord" className="size-5" />
            {discord.label}
          </a>
        )}
      </div>

      <footer className="portfolio-footer">
        <span>{dictionary.footer.rights}</span>
        <span>{dictionary.footer.built}</span>
      </footer>
    </section>
  );
}
