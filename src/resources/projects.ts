/* =====================================================
   SHARED PROJECTS
   Single source of truth for non-case-study projects
   (personal / development work from GitHub) and the
   category list used by the Work filters.
===================================================== */

export type DevProject = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
};

/** Categories that actually have projects, in display order. */
export const PROJECT_CATEGORIES = ["Brand Identity", "UI/UX Design", "Development"] as const;

/** Personal / development projects linked from GitHub. */
export const devProjects: DevProject[] = [
  {
    title: "Ecommerce Website",
    category: "Development",
    description:
      "A polished clothing storefront experience with a conversion-oriented flow and a practical admin layer.",
    tags: ["UI", "Frontend", "JavaScript"],
    github: "https://github.com/Designer-bat/ecommerce-website",
  },
  {
    title: "Parking Management System",
    category: "Development",
    description:
      "A smart parking management system focused on clarity, usability, and operational flow.",
    tags: ["UX", "PHP", "Dashboard"],
    github: "https://github.com/Designer-bat/ProjectHamroEasyParking",
  },
  {
    title: "Artsphere",
    category: "Development",
    description:
      "A digital space for artists and audiences designed around discovery, storytelling, and community.",
    tags: ["Brand", "UI", "React"],
    github: "https://github.com/Designer-bat/ProjectArtsphere",
  },
];