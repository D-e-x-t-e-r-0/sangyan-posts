"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconPause, IconPlay } from "./icons";

const SLIDE_MS = 7000;

export type HeroSlide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  cover: string;
  coverAlt: string;
  readTime: number;
};

type HeroSliderProps = {
  slides: HeroSlide[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const count = slides.length;
  const current = slides[active];

  useEffect(() => {
    const strip = filmstripRef.current;
    const tab = tabRefs.current[active];
    if (!strip || !tab) return;
    if (strip.scrollWidth <= strip.clientWidth + 1) return;

    const stripRect = strip.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const tabLeft = tabRect.left - stripRect.left + strip.scrollLeft;
    const target = tabLeft - (strip.clientWidth - tabRect.width) / 2;
    const max = strip.scrollWidth - strip.clientWidth;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    strip.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active]);

  function goTo(index: number) {
    setActive((index + count) % count);
  }

  function next() {
    goTo(active + 1);
  }

  function previous() {
    goTo(active - 1);
  }

  function onTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const delta =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else previous();
  }

  function onProgressEnd() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    next();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  }

  if (!current) return null;

  return (
    <section
      className={`spotlight ${paused ? "is-paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Featured SANGYAN posts"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      <div className="spotlight-frame">
        {slides.map((slide, index) => (
          <article
            key={slide.slug}
            className={`spotlight-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            <div
              className="spotlight-art"
              role="img"
              aria-label={slide.coverAlt}
              style={{ backgroundImage: `url("${slide.cover}")` }}
            />
            <div className="spotlight-shade" aria-hidden="true" />

            <div className="spotlight-copy">
              <div className="spotlight-kicker">
                <span className="spotlight-cat">{slide.category}</span>
                <span className="spotlight-kicker-sep">/</span>
                <span>Dispatch {String(index + 1).padStart(2, "0")}</span>
                <span className="spotlight-kicker-sep">/</span>
                <span>{slide.date}</span>
                <span className="spotlight-kicker-sep">/</span>
                <span>{slide.readTime} min</span>
              </div>

              <h2 className="spotlight-title">
                <Link
                  href={`/posts/${slide.slug}`}
                  tabIndex={index === active ? undefined : -1}
                >
                  {slide.title}
                </Link>
              </h2>

              <p className="spotlight-excerpt">{slide.excerpt}</p>

              <Link
                href={`/posts/${slide.slug}`}
                className="btn btn-paper"
                tabIndex={index === active ? undefined : -1}
              >
                <span>Read the dispatch</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}

        <div className="spotlight-controls">
          <span className="spotlight-count" aria-live="polite">
            <strong>{String(active + 1).padStart(2, "0")}</strong>
            <span>/ {String(count).padStart(2, "0")}</span>
          </span>
          <button
            type="button"
            className="spotlight-btn"
            onClick={previous}
            aria-label="Previous featured post"
          >
            <IconArrowLeft size={15} />
          </button>
          <button
            type="button"
            className="spotlight-btn"
            onClick={next}
            aria-label="Next featured post"
          >
            <IconArrowRight size={15} />
          </button>
          <button
            type="button"
            className="spotlight-btn spotlight-btn-pause"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={paused}
          >
            {paused ? <IconPlay size={10} /> : <IconPause size={10} />}
          </button>
        </div>

        <div className="spotlight-progress" aria-hidden="true">
          <div
            key={active}
            className="spotlight-progress-fill"
            style={{ animationDuration: `${SLIDE_MS}ms` }}
            onAnimationEnd={onProgressEnd}
          />
        </div>
      </div>

      <div className="filmstrip" aria-label="Featured posts" ref={filmstripRef}>
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            className={`filmstrip-tab ${index === active ? "is-active" : ""}`}
            onClick={() => goTo(index)}
            aria-pressed={index === active}
            aria-label={`Show ${slide.title}`}
          >
            <span className="filmstrip-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="filmstrip-art"
              aria-hidden="true"
              style={{ backgroundImage: `url("${slide.cover}")` }}
            />
            <span className="filmstrip-text">
              <span className="filmstrip-cat">{slide.category}</span>
              <span className="filmstrip-title">{slide.title}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
