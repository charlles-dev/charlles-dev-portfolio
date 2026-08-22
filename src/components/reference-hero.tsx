"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";

import { IconGlyph } from "@/components/icon-glyph";
import type { PortfolioDictionary } from "@/lib/i18n";
import { profile, socialLinks } from "@/lib/portfolio";

type SocialKind = "github" | "linkedin" | "email" | "discord" | "whatsapp";

type LoopState = "idle" | "transition" | "awake";

const SCROLL_VIDEO_START = 0.12;
const SCROLL_VIDEO_END = 0.85;
const AWAKE_LOOP_SRC = "/reference/charlles-hero-awake-loop.webm";

function handleVideoError(event: SyntheticEvent<HTMLVideoElement>) {
  const video = event.currentTarget;
  const fallback = video.dataset.fallbackSrc;
  if (!fallback || video.dataset.fallbackUsed === "true") return;
  video.dataset.fallbackUsed = "true";
  video.src = fallback;
  video.load();
}

function SocialGlyph({ kind }: { kind: SocialKind }) {
  if (kind === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" className="reference-social-glyph"><path d="M4.7 3.2A2.3 2.3 0 1 1 4.7 7.8a2.3 2.3 0 0 1 0-4.6ZM2.7 9.2h4v11.6h-4V9.2Zm6.4 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12v5.92h-4v-5.25c0-1.25-.02-2.86-1.75-2.86-1.75 0-2.02 1.37-2.02 2.77v5.34h-4V9.2Z" fill="currentColor" /></svg>;
  if (kind === "email") return <svg aria-hidden="true" viewBox="0 0 32 32" className="reference-social-glyph"><path d="M13.948 15.685a3 3 0 0 0 4.114.006l10.075-9.464A3 3 0 0 0 27 6H5a3 3 0 0 0-1.08.209z" fill="currentColor" /><path d="M19.431 17.149a5.007 5.007 0 0 1-6.857-.01L2.4 7.527A3 3 0 0 0 2 9v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V9a2.96 2.96 0 0 0-.377-1.425z" fill="currentColor" /></svg>;
  if (kind === "discord") return <svg aria-hidden="true" viewBox="0 0 256 199" className="reference-social-glyph"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0C96.911 9.645 94.193 4.113 91.897 0a207.9 207.9 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.633 108.636 108.636 0 0 0 5.356-4.236c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.236 136.07 136.07 0 0 1-21.887 10.653 160.469 160.469 0 0 0 13.873 22.848c21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.055-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.168 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.866 0 23.236 11.804 23.015 26.2 0 14.375-10.149 26.18-23.015 26.18Z" fill="currentColor" /></svg>;
  if (kind === "whatsapp") return <svg aria-hidden="true" viewBox="0 0 512 512" className="reference-social-glyph"><path d="M256.064 0h-.128C114.784 0 0 114.816 0 256c0 56 18.048 107.904 48.736 150.048l-31.904 95.104 98.4-31.456C155.712 496.512 204 512 256.064 512 397.216 512 512 397.152 512 256S397.216 0 256.064 0m148.96 361.504c-6.176 17.44-30.688 31.904-50.24 36.128-13.376 2.848-30.848 5.12-89.664-19.264-75.232-31.168-123.68-107.616-127.456-112.576-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624 26.176-62.304c6.176-6.304 16.384-9.184 26.176-9.184 3.168 0 6.016.16 8.576.288 7.52.32 11.296.768 16.256 12.64 6.176 14.88 21.216 51.616 23.008 55.392 1.824 3.776 3.648 8.896 1.088 13.856-2.4 5.12-4.512 7.392-8.288 11.744s-7.36 7.68-11.136 12.352c-3.456 4.064-7.36 8.416-3.008 15.936 4.352 7.36 19.392 31.904 41.536 51.616 28.576 25.44 51.744 33.568 60.032 37.024 6.176 2.56 13.536 1.952 18.048-2.848 5.728-6.176 12.8-16.416 20-26.496 5.12-7.232 11.584-8.128 18.368-5.568 6.912 2.4 43.488 20.48 51.008 24.224 7.52 3.776 12.48 5.568 14.304 8.736 1.792 3.168 1.792 18.048-4.384 35.52Z" fill="currentColor" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 512 512" className="reference-social-glyph"><path d="M255.968 5.329C114.624 5.329 0 120.401 0 262.353c0 113.536 73.344 209.856 175.104 243.872 12.8 2.368 17.472-5.568 17.472-12.384 0-6.112-.224-22.272-.352-43.712-71.2 15.52-86.24-34.464-86.24-34.464-11.616-29.696-28.416-37.6-28.416-37.6-23.264-15.936 1.728-15.616 1.728-15.616 25.696 1.824 39.2 26.496 39.2 26.496 22.848 39.264 59.936 27.936 74.528 21.344 2.304-16.608 8.928-27.936 16.256-34.368-56.832-6.496-116.608-28.544-116.608-127.008 0-28.064 9.984-51.008 26.368-68.992-2.656-6.496-11.424-32.64 2.496-68 0 0 21.504-6.912 70.4 26.336 20.416-5.696 42.304-8.544 64.096-8.64 21.728.128 43.648 2.944 64.096 8.672 48.864-33.248 70.336-26.336 70.336-26.336 13.952 35.392 5.184 61.504 2.56 68 16.416 17.984 26.304 40.928 26.304 68.992 0 98.72-59.84 120.448-116.864 126.816 9.184 7.936 17.376 23.616 17.376 47.584 0 34.368-.32 62.08-.32 70.496 0 6.88 4.608 14.88 17.6 12.352C438.72 472.145 512 375.857 512 262.353 512 120.401 397.376 5.329 255.968 5.329Z" fill="currentColor" /></svg>;
}

export function ReferenceHero({ dictionary, onOpenWork }: { dictionary: PortfolioDictionary; onOpenWork: () => void }) {
  const storyRef = useRef<HTMLElement>(null);
  const primaryVideo = useRef<HTMLVideoElement>(null);
  const idleVideo = useRef<HTMLVideoElement>(null);
  const awakeVideo = useRef<HTMLVideoElement>(null);
  const scrollProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const github = socialLinks.find((link) => link.kind === "github");
  const linkedIn = socialLinks.find((link) => link.kind === "linkedin");
  const discord = socialLinks.find((link) => link.kind === "discord");
  const whatsapp = socialLinks.find((link) => link.kind === "whatsapp");
  const email = socialLinks.find((link) => link.kind === "email");
  const heroLines = dictionary.hero.headline.replace(". ", ".\n");
  const isScrolled = scrollProgress > 0.08;
  const loopState: LoopState = scrollProgress <= SCROLL_VIDEO_START ? "idle" : scrollProgress >= SCROLL_VIDEO_END ? "awake" : "transition";
  const isLooping = loopState !== "transition";
  const transitionProgress = Math.min(1, Math.max(0, (scrollProgress - SCROLL_VIDEO_START) / (SCROLL_VIDEO_END - SCROLL_VIDEO_START)));
  const contrast = transitionProgress;
  const tone = Math.round(255 - contrast * 245);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const handleScroll = () => {
      if (prefersReducedMotion) {
        scrollProgressRef.current = 0;
        setScrollProgress(0);
        return;
      }
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      scrollProgressRef.current = progress;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    const mutedTone = Math.max(24, tone - 18);
    root.style.setProperty("--reference-ink", `rgb(${tone} ${tone} ${tone})`);
    root.style.setProperty("--reference-muted", `rgba(${mutedTone} ${mutedTone} ${mutedTone} / .68)`);
    root.style.setProperty("--reference-subtle", `rgba(${mutedTone} ${mutedTone} ${mutedTone} / .46)`);
    root.style.setProperty("--reference-faint", `rgba(${mutedTone} ${mutedTone} ${mutedTone} / .35)`);
    return () => {
      root.style.removeProperty("--reference-ink");
      root.style.removeProperty("--reference-muted");
      root.style.removeProperty("--reference-subtle");
      root.style.removeProperty("--reference-faint");
    };
  }, [tone]);

  useEffect(() => {
    const main = primaryVideo.current;
    if (!main) return;
    if (prefersReducedMotion) {
      main.pause();
      return;
    }

    let animationFrame = 0;
    const syncMain = () => {
      if (document.visibilityState === "visible" && !main.seeking && Number.isFinite(main.duration) && main.duration > 0) {
        const targetTime = Math.min(Math.max((scrollProgressRef.current - SCROLL_VIDEO_START) / (SCROLL_VIDEO_END - SCROLL_VIDEO_START), 0), 1) * main.duration;
        if (Math.abs(main.currentTime - targetTime) > 0.008) main.currentTime = targetTime;
      }
      animationFrame = window.requestAnimationFrame(syncMain);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") syncMain();
    };

    main.addEventListener("loadedmetadata", syncMain);
    document.addEventListener("visibilitychange", handleVisibility);
    animationFrame = window.requestAnimationFrame(syncMain);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      main.removeEventListener("loadedmetadata", syncMain);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const idle = idleVideo.current;
    const awake = awakeVideo.current;
    if (!idle || !awake) return;
    if (prefersReducedMotion) {
      idle.pause();
      awake.pause();
      idle.style.opacity = "0";
      awake.style.opacity = "0";
      return;
    }

    const playVideo = (video: HTMLVideoElement) => {
      const attempt = () => {
        const playResult = video.play();
        if (playResult && typeof playResult.catch === "function") playResult.catch(() => undefined);
      };
      if (video.readyState >= 2) attempt();
      else video.addEventListener("canplay", attempt, { once: true });
    };

    const setActive = (video: HTMLVideoElement, active: boolean) => {
      video.style.opacity = active ? "1" : "0";
      if (active) {
        if (video === awake && !video.getAttribute("src")) {
          video.src = AWAKE_LOOP_SRC;
          video.load();
        }
        playVideo(video);
      }
      else {
        video.pause();
        video.currentTime = 0;
      }
    };

    if (loopState === "idle") {
      setActive(idle, true);
      setActive(awake, false);
    } else if (loopState === "awake") {
      setActive(idle, false);
      setActive(awake, true);
    } else {
      setActive(idle, false);
      setActive(awake, false);
    }

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") {
        idle.pause();
        awake.pause();
      } else if (loopState === "idle") {
        playVideo(idle);
      } else if (loopState === "awake") {
        playVideo(awake);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [loopState, prefersReducedMotion]);

  return (
    <section ref={storyRef} className="reference-scroll-story" aria-labelledby="reference-hero-title">
        <div className={`reference-sticky-scene ${isScrolled ? "is-scrolled" : ""} ${isLooping ? "is-looping" : ""} is-${loopState}-state`} data-loop-state={loopState} data-motion={prefersReducedMotion ? "reduced" : "full"}>
        <video
          ref={primaryVideo}
          className="reference-video reference-video-primary reference-video-scrub"
          src="/reference/charlles-hero-two-state.webm"
          data-fallback-src="/reference/charlles-hero-two-state.mp4"
          onError={handleVideoError}
          poster="/reference/charlles-hero-two-state-poster.webp"
          muted
          playsInline
          preload={prefersReducedMotion ? "none" : "auto"}
          aria-hidden="true"
        />
        <video
          ref={idleVideo}
          className="reference-video reference-video-idle"
          src="/reference/charlles-hero-idle-loop.webm"
          data-fallback-src="/reference/charlles-hero-idle-loop.mp4"
          onError={handleVideoError}
          poster="/reference/charlles-hero-two-state-poster.webp"
          loop
          muted
          playsInline
          preload={prefersReducedMotion ? "none" : "auto"}
          aria-hidden="true"
        />
        <video
          ref={awakeVideo}
          className="reference-video reference-video-awake"
          data-fallback-src="/reference/charlles-hero-awake-loop.mp4"
          onError={handleVideoError}
          poster="/reference/charlles-hero-two-state-poster.webp"
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="reference-night-layer" aria-hidden="true" style={{ opacity: Math.max(0.14, 1 - contrast * 0.86) }}>
          <span className="reference-star star-a" /><span className="reference-star star-b" /><span className="reference-star star-c" /><span className="reference-star star-d" />
          <span className="reference-star star-e" /><span className="reference-star star-f" /><span className="reference-star star-g" />
        </div>
        <div className="reference-scrim" aria-hidden="true" style={{ opacity: Math.max(0.12, 0.76 - scrollProgress * 0.66) }} />
        <div className="reference-top-scrim" aria-hidden="true" />

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
          {discord && <a href={discord.href} target="_blank" rel="noreferrer" aria-label="Discord"><SocialGlyph kind="discord" /><span>Discord</span></a>}
          {whatsapp && <a href={whatsapp.href} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialGlyph kind="whatsapp" /><span>WhatsApp</span></a>}
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
