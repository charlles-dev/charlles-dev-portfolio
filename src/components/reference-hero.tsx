"use client";

import { useEffect, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

function SocialGlyph({ kind }: { kind: "github" | "linkedin" | "email" }) {
  if (kind === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" className="reference-social-glyph"><path d="M6.5 8.8v9.7M6.5 5.8v.1M11 18.5v-5.2a2.8 2.8 0 0 1 5.6 0v5.2M11 10.8v7.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /><path d="M3.8 4.2h16.4A1.6 1.6 0 0 1 21.8 5.8v12.4a1.6 1.6 0 0 1-1.6 1.6H3.8a1.6 1.6 0 0 1-1.6-1.6V5.8a1.6 1.6 0 0 1 1.6-1.6Z" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>;
  if (kind === "email") return <svg aria-hidden="true" viewBox="0 0 24 24" className="reference-social-glyph"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="reference-social-glyph"><path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.15c.44.08.6-.19.6-.42v-1.48c-2.45.53-2.97-1.05-2.97-1.05-.4-1.02-.98-1.29-.98-1.29-.8-.55.06-.54.06-.54.89.06 1.36.91 1.36.91.79 1.35 2.06.96 2.56.74.08-.57.31-.96.56-1.18-1.96-.22-4.02-.98-4.02-4.36 0-.96.34-1.75.91-2.37-.09-.22-.39-1.12.09-2.34 0 0 .74-.24 2.42.9a8.4 8.4 0 0 1 4.4 0c1.68-1.14 2.42-.9 2.42-.9.48 1.22.18 2.12.09 2.34.57.62.91 1.41.91 2.37 0 3.39-2.07 4.13-4.04 4.35.32.28.6.83.6 1.68v2.49c0 .24.16.51.61.42A8.8 8.8 0 0 0 12 3.2Z" fill="currentColor" /></svg>;
}

export function ReferenceHero({ dictionary, onOpenWork }: { dictionary: PortfolioDictionary; onOpenWork: () => void }) {
  const storyRef = useRef<HTMLElement>(null);
  const primaryVideo = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const github = socialLinks.find((link) => link.kind === "github");
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin");
  const email = socialLinks.find((link) => link.kind === "email");
  const heroLines = dictionary.hero.headline.replace(". ", ".\n");

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const handleScroll = () => {
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      setIsScrolled(Math.min(1, Math.max(0, -rect.top / travel)) > 0.08);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = primaryVideo.current;
    if (!video) return;

    const handleReady = () => setReady(true);
    video.addEventListener("canplay", handleReady, { once: true });
    const playResult = video.play?.();
    if (playResult && typeof playResult.catch === "function") void playResult.catch(() => undefined);

    return () => video.removeEventListener("canplay", handleReady);
  }, []);

  return (
    <section ref={storyRef} className="reference-scroll-story" aria-labelledby="reference-hero-title">
      <div className={`reference-sticky-scene ${ready ? "is-ready" : ""} ${isScrolled ? "is-scrolled" : ""}`}>
        <video className="reference-video reference-video-idle" src="/reference/hero-idle.webm" poster="/reference/hero-still.avif" autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
        <video ref={primaryVideo} className="reference-video reference-video-primary" src="/reference/hero.webm" poster="/reference/hero-still.avif" muted playsInline preload="auto" aria-hidden="true" />
        <video className="reference-video reference-video-loop" src="/reference/hero-loop.webm" poster="/reference/hero-still.avif" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />
        <div className="reference-night-layer" aria-hidden="true">
          <span className="reference-star star-a" /><span className="reference-star star-b" /><span className="reference-star star-c" /><span className="reference-star star-d" />
          <span className="reference-star star-e" /><span className="reference-star star-f" /><span className="reference-star star-g" />
        </div>
        <div className="reference-scrim" aria-hidden="true" />
        <div className="reference-top-scrim" aria-hidden="true" />

        <div className="reference-stage-header">
          <p className="reference-availability"><span className="status-dot" aria-hidden="true" />{dictionary.hero.status}</p>
        </div>

        <div className="reference-hero-content">
          <div className="reference-hero-copy">
            <p className="reference-eyebrow">{dictionary.hero.eyebrow}</p>
            <h1 id="reference-hero-title">{heroLines}</h1>
            <p className="reference-hero-description">{dictionary.hero.description}</p>
            <button type="button" className="reference-primary-button" onClick={onOpenWork}>
              {dictionary.hero.primaryCta}<IconGlyph name="arrow-right" className="size-4" />
            </button>
          </div>
        </div>

        <aside className="reference-social-rail" aria-label={dictionary.nav.contact}>
          {github && <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub"><SocialGlyph kind="github" /><span>GitHub</span></a>}
          {linkedIn && <a href={linkedIn.href} target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialGlyph kind="linkedin" /><span>LinkedIn</span></a>}
          {email && <a href={email.href} aria-label="Email"><SocialGlyph kind="email" /><span>Email</span></a>}
        </aside>

        <div className="reference-hero-meta">
          <span>{profile.name}</span><span aria-hidden="true">/</span><span>{dictionary.hero.role}</span>
        </div>
        <div className="reference-scroll-hint"><span>{dictionary.hero.scrollLabel}</span><span className="reference-scroll-arrow" aria-hidden="true">↓</span></div>
      </div>
    </section>
  );
}
