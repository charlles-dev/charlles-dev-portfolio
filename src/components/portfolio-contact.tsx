"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { Locale, PortfolioDictionary } from "@/lib/i18n";
import { bookingUrl, profile, socialLinks } from "@/lib/portfolio";
import { getProfessionalContent } from "@/lib/professional-content";
import { trackTelemetry } from "@/lib/telemetry";

function ContactMedia({ video, videoRef }: { video: string; videoRef: RefObject<HTMLVideoElement | null> }) {
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: hover) and (pointer: fine)").matches || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => undefined);
      else element.pause();
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

export function PortfolioContact({ locale, dictionary }: { locale: Locale; dictionary: PortfolioDictionary }) {
  const whatsappVideoRef = useRef<HTMLVideoElement>(null);
  const callVideoRef = useRef<HTMLVideoElement>(null);
  const whatsapp = socialLinks.find((link) => link.kind === "whatsapp");
  const discord = socialLinks.find((link) => link.kind === "discord");
  const intentContent = getProfessionalContent(locale).contactIntents;
  const professionalContent = getProfessionalContent(locale);
  const [intentId, setIntentId] = useState(intentContent.options[0].id);
  const intent = intentContent.options.find((option) => option.id === intentId) ?? intentContent.options[0];
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(intent.emailSubject)}&body=${encodeURIComponent(intent.emailBody)}`;
  const whatsappHref = whatsapp ? `${whatsapp.href}?text=${encodeURIComponent(intent.whatsapp)}` : "";
  const contextualBookingUrl = `${bookingUrl}?notes=${encodeURIComponent(intent.label)}`;
  const play = (ref: RefObject<HTMLVideoElement | null>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => undefined);
  };
  const pause = (ref: RefObject<HTMLVideoElement | null>) => {
    const video = ref.current;
    if (!video) return;
    video.pause();
  };

  return (
    <section className="portfolio-contact-section" id="contact" aria-labelledby="portfolio-contact-title">
      <div className="portfolio-contact-heading">
        <p className="reference-eyebrow">{dictionary.contact.eyebrow}</p>
        <h2 id="portfolio-contact-title">{dictionary.contact.cardTitle}</h2>
        <p>{dictionary.contact.cardBody}</p>
      </div>

      <fieldset className="contact-intent">
        <legend>{intentContent.label}</legend>
        <div>
          {intentContent.options.map((option) => (
            <label key={option.id} className={option.id === intentId ? "is-active" : undefined}>
              <input type="radio" name="contact-intent" value={option.id} checked={option.id === intentId} onChange={() => setIntentId(option.id)} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="portfolio-contact-actions">
        {whatsapp && (
          <a className="portfolio-contact-action is-primary" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={`${dictionary.contact.primaryCta}: ${intent.label}`} onPointerEnter={() => play(whatsappVideoRef)} onPointerLeave={() => pause(whatsappVideoRef)} onFocus={() => play(whatsappVideoRef)} onBlur={() => pause(whatsappVideoRef)} onClick={() => trackTelemetry({ name: "contact_cta_click", channel: "whatsapp" })}>
            <ContactMedia video="/reference/contact/charlles-whatsapp.mp4" videoRef={whatsappVideoRef} />
            <span className="portfolio-contact-action-copy">
              <small>{dictionary.contact.availability}</small>
              <strong>{dictionary.contact.primaryCta}</strong>
              <span>{dictionary.contact.description}</span>
            </span>
            <IconGlyph name="external-link" className="size-5" />
          </a>
        )}

        <a className="portfolio-contact-action" href={contextualBookingUrl} target="_blank" rel="noreferrer" aria-label={`${dictionary.contact.callCta}: ${intent.label}`} onPointerEnter={() => play(callVideoRef)} onPointerLeave={() => pause(callVideoRef)} onFocus={() => play(callVideoRef)} onBlur={() => pause(callVideoRef)} onClick={() => trackTelemetry({ name: "contact_cta_click", channel: "calendar" })}>
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
        <a href={`/${locale}/cv`} aria-label={professionalContent.contextMenu.cv}>
          <IconGlyph name="solar-document" className="size-5" />
          {professionalContent.contextMenu.cv}
        </a>
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
