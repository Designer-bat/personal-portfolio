"use client";

import { useMemo, useState } from "react";

import { HiArrowUpRight } from "react-icons/hi2";

import { ProjectCard } from "@/components/ProjectCard";
import { PROJECT_CATEGORIES } from "@/resources/projects";

import styles from "./WorkGallery.module.scss";

export type WorkItem = {
  id: string;
  kind: "case" | "github";
  category: string;
  title: string;
  description: string;
  tags: string[];
  /** Case-study route */
  href?: string;
  /** Case-study cover image */
  image?: string;
  publishedAt?: string;
  /** GitHub repository URL for development items */
  github?: string;
};

const FILTERS = ["All", ...PROJECT_CATEGORIES];

/**
 * Filterable project grid for the Work page. Case-study items render as
 * image-first cards; development items render as compact GitHub link cards.
 */
export const WorkGallery = ({
  items,
  priorityCount = 3,
}: {
  items: WorkItem[];
  priorityCount?: number;
}) => {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((item) => item.category === active)),
    [items, active]
  );

  return (
    <div className={styles.root}>
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filter} ${active === filter ? styles.filterActive : ""}`}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((item, index) =>
          item.kind === "case" ? (
            <ProjectCard
              key={item.id}
              priority={index < priorityCount}
              href={item.href ?? "#"}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              tags={item.tags}
              publishedAt={item.publishedAt}
            />
          ) : (
            <a
              key={item.id}
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubCard}
            >
              <div className={styles.githubBody}>
                <span className={styles.githubCategory}>{item.category}</span>
                <h3 className={styles.githubTitle}>{item.title}</h3>
                <p className={styles.githubDesc}>{item.description}</p>
                {item.tags.length > 0 && (
                  <div className={styles.githubTags}>
                    {item.tags.map((tag) => (
                      <span className={styles.githubTag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className={styles.githubLink}>
                GitHub <HiArrowUpRight aria-hidden="true" />
              </span>
            </a>
          )
        )}
      </div>
    </div>
  );
};