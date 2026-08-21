"use client";

import { useEffect, useRef, useState } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

function SocialGlyph({ kind }: { kind: "github" | "linkedin" | "email" }) {
  if (kind === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" className="reference-social-glyph"><path d="M6.5 8.8v9.7M6.5 5.8v.1M11 18.5v-5.2a2.8 2.8 0 0 1 5.6 0v5.2M11 10.8v7.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /><path d="M3.8 4.2h16.4A1.6 1.6 0 0 1 21.8 5.8v12.4a1.6 1.6 0 0 1-1.6 1.6H3.8a1.6 1.6 0 0 1-1.6-1.6V5.8a1.6 1.6 0 0 1 1.6-1.6Z" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>;
  if (kind === "email") return <svg aria-hidden="true" viewBox="0 0 32 32" className="reference-social-glyph"><path d="M13.948 15.685a3 3 0 0 0 4.114.006l10.075-9.464A3 3 0 0 0 27 6H5a3 3 0 0 0-1.08.209z" fill="currentColor" /><path d="M19.431 17.149a5.007 5.007 0 0 1-6.857-.01L2.4 7.527A3 3 0 0 0 2 9v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V9a2.96 2.96 0 0 0-.377-1.425z" fill="currentColor" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 512 512" className="reference-social-glyph"><path d="M255.968 5.329C114.624 5.329 0 120.401 0 262.353c0 113.536 73.344 209.856 175.104 243.872 12.8 2.368 17.472-5.568 17.472-12.384 0-6.112-.224-22.272-.352-43.712-71.2 15.52-86.24-34.464-86.24-34.464-11.616-29.696-28.416-37.6-28.416-37.6-23.264-15.936 1.728-15.616 1.728-15.616 25.696 1.824 39.2 26.496 39.2 26.496 22.848 39.264 59.936 27.936 74.528 21.344 2.304-16.608 8.928-27.936 16.256-34.368-56.832-6.496-116.608-28.544-116.608-127.008 0-28.064 9.984-51.008 26.368-68.992-2.656-6.496-11.424-32.64 2.496-68 0 0 21.504-6.912 70.4 26.336 20.416-5.696 42.304-8.544 64.096-8.64 21.728.128 43.648 2.944 64.096 8.672 48.864-33.248 70.336-26.336 70.336-26.336 13.952 35.392 5.184 61.504 2.56 68 16.416 17.984 26.304 40.928 26.304 68.992 0 98.72-59.84 120.448-116.864 126.816 9.184 7.936 17.376 23.616 17.376 47.584 0 34.368-.32 62.08-.32 70.496 0 6.88 4.608 14.88 17.6 12.352C438.72 472.145 512 375.857 512 262.353 512 120.401 397.376 5.329 255.968 5.329Z" fill="currentColor" /></svg>;
}

export function ReferenceHero({ dictionary, onOpenWork }: { dictionary: PortfolioDictionary; onOpenWork: () => void }) {
  const storyRef = useRef<HTMLElement>(null);
  const primaryVideo = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const github = socialLinks.find((link) => link.kind === "github");
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin");
  const email = socialLinks.find((link) => link.kind === "email");
  const heroLines = dictionary.hero.headline.replace(". ", ".\n");
  const isScrolled = scrollProgress > 0.08;

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const handleScroll = () => {
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = primaryVideo.current;
    if (!video) return;

    const syncVideo = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const targetTime = scrollProgress * video.duration;
      if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.01) video.currentTime = targetTime;
    };

    syncVideo();
    video.addEventListener("loadedmetadata", syncVideo);
    video.addEventListener("durationchange", syncVideo);
    return () => {
      video.removeEventListener("loadedmetadata", syncVideo);
      video.removeEventListener("durationchange", syncVideo);
    };
  }, [scrollProgress]);

  return (
    <section ref={storyRef} className="reference-scroll-story" aria-labelledby="reference-hero-title">
      <div className={`reference-sticky-scene ${isScrolled ? "is-scrolled" : ""}`}>
        <video
          ref={primaryVideo}
          className="reference-video reference-video-primary reference-video-scrub"
          src="/reference/charlles-hero-biscuit.webm"
          poster="/reference/charlles-avatar-biscuit.png"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="reference-night-layer" aria-hidden="true">
          <span className="reference-star star-a" /><span className="reference-star star-b" /><span className="reference-star star-c" /><span className="reference-star star-d" />
          <span className="reference-star star-e" /><span className="reference-star star-f" /><span className="reference-star star-g" />
        </div>
        <div className="reference-scrim" aria-hidden="true" style={{ opacity: Math.max(0.16, 0.76 - scrollProgress * 0.58) }} />
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
