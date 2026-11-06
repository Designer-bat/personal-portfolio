"use client";

import { gallery } from "@/resources";
import { gsap } from "gsap";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./GalleryView.module.scss";

const tabs = ["All", "App designs", "Brand identity"] as const;
type GalleryTab = (typeof tabs)[number];
type GalleryImage = (typeof gallery.images)[number];

function getColumnCount(width: number) {
  if (width < 520) return 2;
  if (width < 860) return 3;
  if (width < 1200) return 4;
  return 5;
}

function getEstimatedAspectRatio(image: GalleryImage) {
  return image.orientation === "horizontal" ? 1.3 : 0.72;
}

function isPhotography(image: GalleryImage) {
  return /mountain|forest|snow|landscape|sunset/i.test(image.alt);
}

function getCategory(image: GalleryImage): Exclude<GalleryTab, "All"> {
  return isPhotography(image) ? "Brand identity" : "App designs";
}

export default function GalleryView() {
  const rootRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTab, setActiveTab] = useState<GalleryTab>("All");
  const [columnsCount, setColumnsCount] = useState(4);
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const [actionError, setActionError] = useState<string | null>(null);
  const activeTabIndex = tabs.indexOf(activeTab);

  useEffect(() => {
    const updateColumns = () => setColumnsCount(getColumnCount(window.innerWidth));
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const filteredImages = useMemo(
    () => gallery.images.filter((image) => activeTab === "All" || getCategory(image) === activeTab),
    [activeTab],
  );
  const columns = Array.from({ length: columnsCount }, (_, index) => ({
    key: `gallery-column-${index}`,
    height: 0,
    images: [] as GalleryImage[],
  }));

  for (const image of filteredImages) {
    const shortestColumn = columns.reduce((shortest, column) =>
      column.height < shortest.height ? column : shortest,
    );
    shortestColumn.images.push(image);
    const aspectRatio = imageAspectRatios[image.src] ?? getEstimatedAspectRatio(image);
    shortestColumn.height += 1 / aspectRatio + 0.15;
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(`.${styles.card}`),
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: {
            amount: Math.min(0.9, Math.max(0.35, (filteredImages.length / columnsCount) * 0.2)),
            from: "start",
          },
        },
      );
      gsap.fromTo(
        root.querySelectorAll(`.${styles.tab}`),
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.05 },
      );
    }, root);

    return () => context.revert();
  }, [columnsCount, filteredImages]);

  useEffect(() => {
    const tab = tabRefs.current[activeTabIndex];
    if (!tab || !underlineRef.current) return;

    gsap.to(underlineRef.current, {
      x: tab.offsetLeft,
      width: tab.offsetWidth,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [activeTabIndex]);

  const handleCardEnter = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    gsap.to(card.querySelector(`.${styles.media}`), {
      scale: 1.035,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(`.${styles.overlay}`), { opacity: 1, duration: 0.25 });
    gsap.to(card.querySelectorAll(`.${styles.chip}`), {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: "back.out(2)",
    });
  };

  const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    gsap.to(card.querySelector(`.${styles.media}`), {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(`.${styles.overlay}`), { opacity: 0, duration: 0.2 });
    gsap.to(card.querySelectorAll(`.${styles.chip}`), {
      y: -8,
      opacity: 0,
      duration: 0.2,
    });
  };

  const shareGallery = async (image: GalleryImage) => {
    setActionError(null);
    try {
      if (navigator.share) {
        await navigator.share({ title: image.alt, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Failed to share this gallery image:", error);
      setActionError("Could not share this image. Please try again.");
    }
  };

  return (
    <section ref={rootRef} className={styles.gallery} aria-label="Gallery">
      <nav className={styles.tabs} aria-label="Gallery categories">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            className={`${styles.tab} ${tab === activeTab ? styles.activeTab : ""}`}
            type="button"
            aria-pressed={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <span ref={underlineRef} className={styles.underline} aria-hidden="true" />
      </nav>

      <div
        className={styles.masonry}
        style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}
      >
        {columns.map((column) => (
          <div className={styles.column} key={column.key}>
            {column.images.map((image) => (
              <article
                key={image.src}
                className={styles.card}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <div className={styles.mediaWrap}>
                  <img
                    className={styles.media}
                    src={image.src}
                    alt={image.alt}
                    onLoad={(event) => {
                      const { naturalWidth, naturalHeight } = event.currentTarget;
                      if (naturalWidth === 0 || naturalHeight === 0) return;
                      const aspectRatio = naturalWidth / naturalHeight;
                      setImageAspectRatios((current) =>
                        current[image.src] === aspectRatio
                          ? current
                          : { ...current, [image.src]: aspectRatio },
                      );
                    }}
                  />
                  <div className={styles.overlay}>
                    <button
                      className={`${styles.chip} ${styles.share}`}
                      type="button"
                      aria-label={`Share ${image.alt}`}
                      onClick={() => void shareGallery(image)}
                    >
                      ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {actionError && (
        <p className={styles.error} role="alert">
          {actionError}
        </p>
      )}
    </section>
  );
}
