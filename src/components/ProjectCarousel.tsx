"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import styles from "./ProjectCarousel.module.scss";

export interface ProjectCarouselPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    category?: string;
    summary?: string;
    image?: string;
    images?: string[];
  };
}

interface ProjectCarouselProps {
  posts: ProjectCarouselPost[];
  eyebrow?: string;
  title?: string;
}

export function ProjectCarousel({
  posts,
  eyebrow = "Selected Work",
  title = "Designing and Development from idea to launch.",
}: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < maxScroll - 8);

      const progress = maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>(`.${styles.card}`);
    const cardWidth = firstCard?.offsetWidth || 380;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.controls} aria-label="Project carousel controls">
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
          >
            <HiChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.controlButtonActive}`}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next projects"
          >
            <HiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.carousel} ref={carouselRef} aria-label="Selected Projects Carousel">
        {posts.map((post, index) => {
          const cover = post.metadata.image || post.metadata.images?.[0];
          const year = post.metadata.publishedAt
            ? new Date(post.metadata.publishedAt).getFullYear()
            : undefined;
          const category = post.metadata.category || "Case Study";

          return (
            <Link
              key={post.slug}
              href={`/work/${post.slug}`}
              className={styles.card}
              aria-label={`View project: ${post.metadata.title}`}
            >
              <div className={styles.imageWrap}>
                {cover && (
                  <Image
                    src={cover}
                    alt={post.metadata.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 900px) 360px, 420px"
                    priority={index < 2}
                    unoptimized
                    className={styles.thumb}
                  />
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.metaRow}>
                  <span>{category}</span>
                  {year && <span>• {year}</span>}
                </div>

                <h3 className={styles.cardTitle}>{post.metadata.title}</h3>

                {post.metadata.summary && (
                  <p className={styles.cardSummary}>{post.metadata.summary}</p>
                )}

                <div className={styles.exploreLink}>
                  Explore Project <HiArrowUpRight aria-hidden="true" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.progressContainer} aria-hidden="true">
        <div className={styles.progressBar}>
          <div
            className={styles.progressThumb}
            style={{
              width: "35%",
              left: `${scrollProgress * 65}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
