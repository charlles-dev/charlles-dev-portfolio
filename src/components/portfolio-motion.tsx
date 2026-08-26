"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INTRO_COMPLETE_EVENT = "charlles:intro-complete";

export function PortfolioMotion() {
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>(".reference-app");
    if (!root) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 901px)",
        },
        (conditions) => {
          if (!conditions.conditions?.animate) return;

          const isDesktop = Boolean(conditions.conditions.desktop);
          const heroTitleLines = gsap.utils.toArray<HTMLElement>(".reference-hero-line > span");
          const heroSupport = gsap.utils.toArray<HTMLElement>(
            ".reference-hero-copy > .reference-eyebrow, .reference-hero-description, .reference-hero-copy > .reference-primary-button",
          );
          const heroPeripheral = gsap.utils.toArray<HTMLElement>(
            ".reference-social-rail a, .reference-hero-meta, .reference-scroll-hint",
          );
          let heroPlayed = false;

          const playHero = () => {
            if (heroPlayed) return;
            heroPlayed = true;

            gsap.timeline({ defaults: { ease: "power4.out" } })
              .from(heroSupport[0], { autoAlpha: 0, y: 18, duration: 0.62 })
              .from(heroTitleLines, { yPercent: 115, duration: 1.05, stagger: 0.09 }, 0.08)
              .from(heroSupport.slice(1), { autoAlpha: 0, y: 24, duration: 0.72, stagger: 0.09 }, 0.34)
              .from(heroPeripheral, { autoAlpha: 0, x: 18, duration: 0.62, stagger: 0.045 }, 0.5);
          };

          if (document.documentElement.hasAttribute("data-intro-complete")) playHero();
          else window.addEventListener(INTRO_COMPLETE_EVENT, playHero, { once: true });

          gsap.to(
            [".reference-hero-content", ".reference-social-rail", ".reference-hero-meta", ".reference-scroll-hint"],
            {
              autoAlpha: 0,
              y: -42,
              ease: "none",
              scrollTrigger: {
                trigger: ".reference-scroll-story",
                start: "top top",
                end: "22% top",
                scrub: 0.65,
              },
            },
          );

          gsap.from(".portfolio-section-heading > *", {
            autoAlpha: 0,
            y: 72,
            duration: 1.05,
            stagger: 0.14,
            ease: "power4.out",
            scrollTrigger: { trigger: "#work", start: "top 78%", once: true },
          });

          gsap.fromTo(
            ".portfolio-work-scene img",
            { scale: 1.14, yPercent: -4 },
            {
              scale: 1.02,
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: "#work", start: "top bottom", end: "bottom top", scrub: 1.1 },
            },
          );

          gsap.utils.toArray<HTMLElement>(".portfolio-selected-projects > li").forEach((project, index) => {
            gsap.from(project, {
              autoAlpha: 0,
              x: isDesktop ? 84 : 28,
              duration: 0.9,
              delay: Math.min(index * 0.04, 0.12),
              ease: "power4.out",
              scrollTrigger: { trigger: project, start: "top 88%", once: true },
            });
          });

          gsap.from(".portfolio-about-media", {
            autoAlpha: 0,
            x: isDesktop ? -96 : 0,
            y: isDesktop ? 0 : 48,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: { trigger: "#about", start: "top 76%", once: true },
          });
          gsap.fromTo(
            ".portfolio-about-media img",
            { scale: 1.13 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
          gsap.from(".portfolio-about-copy > *", {
            autoAlpha: 0,
            x: isDesktop ? 72 : 0,
            y: isDesktop ? 0 : 34,
            duration: 0.92,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: "#about", start: "top 72%", once: true },
          });

          gsap.from(".journey-intro > *", {
            autoAlpha: 0,
            y: 70,
            duration: 1.05,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: ".journey-intro", start: "top 80%", once: true },
          });

          gsap.utils.toArray<HTMLElement>(".journey-section").forEach((section, index) => {
            const mediaElement = section.querySelector(".journey-media");
            const copyElement = section.querySelector(".journey-copy");
            const direction = index % 2 === 0 ? -1 : 1;

            if (mediaElement) {
              gsap.from(mediaElement, {
                autoAlpha: 0,
                x: isDesktop ? 90 * direction : 0,
                y: isDesktop ? 0 : 46,
                duration: 1.05,
                ease: "power4.out",
                scrollTrigger: { trigger: section, start: "top 76%", once: true },
              });
            }
            if (copyElement) {
              gsap.from(copyElement, {
                autoAlpha: 0,
                x: isDesktop ? -70 * direction : 0,
                y: isDesktop ? 0 : 38,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: { trigger: section, start: "top 71%", once: true },
              });
            }

            gsap.from(section.querySelectorAll(".journey-items li"), {
              autoAlpha: 0,
              y: 28,
              duration: 0.62,
              stagger: 0.065,
              ease: "power3.out",
              scrollTrigger: { trigger: section.querySelector(".journey-items"), start: "top 86%", once: true },
            });
          });

          gsap.from(".portfolio-contact-heading > *", {
            autoAlpha: 0,
            y: 72,
            duration: 1.05,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: "#contact", start: "top 78%", once: true },
          });
          gsap.from(".portfolio-contact-action", {
            autoAlpha: 0,
            x: (index) => (isDesktop ? (index === 0 ? -86 : 86) : 0),
            y: isDesktop ? 0 : 42,
            duration: 1.05,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".portfolio-contact-actions", start: "top 82%", once: true },
          });
          gsap.from(".portfolio-contact-direct, .portfolio-footer", {
            autoAlpha: 0,
            y: 24,
            duration: 0.72,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".portfolio-contact-direct", start: "top 92%", once: true },
          });

          return () => window.removeEventListener(INTRO_COMPLETE_EVENT, playHero);
        },
      );
    }, root);

    ScrollTrigger.refresh();
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return null;
}
