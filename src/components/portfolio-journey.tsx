"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { PortfolioDictionary } from "@/lib/i18n";

type JourneySection = PortfolioDictionary["journey"]["sections"][number];

const mediaById: Record<JourneySection["id"], { poster: string; video?: string; position?: string }> = {
  education: {
    poster: "/reference/story/charlles-education.jpeg",
    video: "/reference/story/charlles-education-loop.mp4",
    position: "center 42%",
  },
  certifications: {
    poster: "/reference/story/charlles-certifications.jpeg",
    video: "/reference/story/charlles-certifications-loop.mp4",
  },
  stack: {
    poster: "/reference/story/charlles-stack.jpeg",
    video: "/reference/story/charlles-stack-loop.mp4",
  },
};

function JourneyMedia({ section }: { section: JourneySection }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const media = mediaById[section.id];

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !media.video || prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "12% 0px", threshold: 0.18 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [media.video, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || failed || prefersReducedMotion) {
      video?.pause();
      return;
    }

    if (!isVisible || document.visibilityState !== "visible") {
      video.pause();
      return;
    }

    const playback = video.play();
    playback?.catch(() => undefined);
  }, [failed, isVisible, prefersReducedMotion, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleVisibility = () => {
      if (document.visibilityState !== "visible" || !isVisible) video.pause();
      else if (!prefersReducedMotion) video.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isVisible, prefersReducedMotion]);

  return (
    <div ref={rootRef} className={`journey-media journey-media-${section.id}`} role="img" aria-label={section.mediaLabel}>
      <div className="journey-media-poster-layer">
        <Image
          src={media.poster}
          alt=""
          width={2048}
          height={2048}
          sizes="(max-width: 820px) 100vw, 46vw"
          className="journey-media-poster"
          style={{ objectPosition: media.position }}
        />
      </div>
      {media.video && (
        <video
          ref={videoRef}
          className={`journey-media-video ${canPlay && !failed ? "is-ready" : ""}`}
          src={shouldLoad && !failed && !prefersReducedMotion ? media.video : undefined}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setCanPlay(true)}
          onError={() => setFailed(true)}
        />
      )}
      <span className="journey-media-caption" aria-hidden="true">
        <i /> {section.mediaCaption}
      </span>
    </div>
  );
}

export function PortfolioJourney({ dictionary }: { dictionary: PortfolioDictionary }) {
  return (
    <section className="portfolio-journey" aria-labelledby="portfolio-journey-title">
      <header className="journey-intro">
        <p className="reference-eyebrow">{dictionary.journey.eyebrow}</p>
        <h2 id="portfolio-journey-title">{dictionary.journey.title}</h2>
        <p>{dictionary.journey.description}</p>
      </header>

      <div className="journey-sections">
        {dictionary.journey.sections.map((section) => (
          <article className={`journey-section journey-section-${section.id}`} key={section.id}>
            <JourneyMedia section={section} />
            <div className="journey-copy">
              <div className="journey-heading">
                <div>
                  <p className="reference-eyebrow">{section.eyebrow}</p>
                  <h3>{section.title}</h3>
                  <p className="journey-description">{section.description}</p>
                </div>
              </div>

              <ul className="journey-items">
                {section.items.map((item) => (
                  <li key={`${section.id}-${item.title}`}>
                    <span>{item.label}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <p className="journey-tags" aria-label={`${item.title}: ${item.tags.join(", ")}`}>{item.tags.join(" / ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
