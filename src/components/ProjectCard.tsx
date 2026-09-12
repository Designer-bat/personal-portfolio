import Image from "next/image";

import { HiOutlineEye, HiOutlineHeart, HiArrowUpRight } from "react-icons/hi2";

import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  /** Route to the project case study, e.g. `/work/my-project` */
  href: string;
  /** Cover image path. Falls back to `images[0]` when omitted */
  image?: string;
  /** Full set of project images; used as a fallback for the cover */
  images?: string[];
  /** Project title */
  title: string;
  /** Short description shown under the title */
  description: string;
  /** Project discipline, e.g. "Brand Identity" */
  category?: string;
  /** Technology / design tags rendered as pills */
  tags?: string[];
  /** Optional number of views, shown in the image overlay */
  views?: number;
  /** Optional number of likes, shown in the image overlay */
  likes?: number;
  /** Publication date used to derive the project year */
  publishedAt?: string;
  /** Gives the cover image fetch priority (use for the first cards) */
  priority?: boolean;
}

/**
 * Behance-inspired project card for the work grid.
 *
 * The whole card is a single link; hovering scales the cover slightly,
 * lifts the card, and reveals a "View Project" pill plus the views/likes
 * overlay on the image. All optional metadata fields are safe to omit.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  image,
  images = [],
  title,
  description,
  category,
  tags = [],
  views,
  likes,
  publishedAt,
  priority = false,
}) => {
  const cover = image || images[0];
  const year = publishedAt ? new Date(publishedAt).getFullYear() : undefined;

  return (
    <a href={href} className={styles.card} aria-label={`View project: ${title}`}>
      <div className={styles.mediaWrap}>
        {cover && (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            unoptimized
            className={styles.thumb}
          />
        )}

        {(views ?? likes) ? (
          <div className={styles.stats} aria-label="Project stats">
            {views ? (
              <span className={styles.stat}>
                <HiOutlineEye aria-hidden="true" />
                {views.toLocaleString()}
              </span>
            ) : null}
            {likes ? (
              <span className={styles.stat}>
                <HiOutlineHeart aria-hidden="true" />
                {likes.toLocaleString()}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className={styles.viewPill}>
          View Project
          <HiArrowUpRight aria-hidden="true" />
        </div>
      </div>

      <div className={styles.body}>
        {(category || year) && (
          <div className={styles.metaRow}>
            {category && <span className={styles.category}>{category}</span>}
            {year && <span className={styles.year}>{year}</span>}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.desc}>{description}</p>}

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};