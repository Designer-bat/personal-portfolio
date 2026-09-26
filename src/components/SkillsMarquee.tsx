import type { CSSProperties } from "react";

import { RevealSection } from "@/components/Motion";
import type { SimpleIcon } from "simple-icons";

import {
  siAdobeaftereffects,
  siAdobeillustrator,
  siAdobeindesign,
  siAdobephotoshop,
  siAdobepremierepro,
  siAdobexd,
  siCanva,
  siCss3,
  siDocker,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPhp,
  siReact,
  siVisualstudiocode,
} from "simple-icons";



type Skill = {
  name: string;
  icon: SimpleIcon;
  color: string;
  /** Optional CSS modifier class, e.g. "github" to flip its color per theme. */
  modifier?: string;
};

type MarqueeRow = {
  label: string;
  /** "left" flows toward the left edge; "right" the opposite. */
  direction: "left" | "right";
  /** Duration of one full loop — a higher value is slower. */
  duration: string;
  skills: Skill[];
};

const graphicDesignSkills: Skill[] = [
  { name: "Adobe Photoshop", icon: siAdobephotoshop, color: siAdobephotoshop.hex },
  { name: "Adobe Illustrator", icon: siAdobeillustrator, color: siAdobeillustrator.hex },
  { name: "Adobe InDesign", icon: siAdobeindesign, color: siAdobeindesign.hex },
  { name: "Adobe After Effects", icon: siAdobeaftereffects, color: siAdobeaftereffects.hex },
  { name: "Adobe Premiere Pro", icon: siAdobepremierepro, color: siAdobepremierepro.hex },
  { name: "Figma", icon: siFigma, color: siFigma.hex },
  { name: "Canva", icon: siCanva, color: siCanva.hex },
];

const uiuxSkills: Skill[] = [
  { name: "Figma", icon: siFigma, color: siFigma.hex },
  { name: "Adobe XD", icon: siAdobexd, color: siAdobexd.hex },
  { name: "Framer", icon: siFramer, color: siFramer.hex },
];

const devSkills: Skill[] = [
  { name: "HTML5", icon: siHtml5, color: siHtml5.hex },
  { name: "CSS3", icon: siCss3, color: siCss3.hex },
  { name: "JavaScript", icon: siJavascript, color: siJavascript.hex },
  { name: "React", icon: siReact, color: siReact.hex },
  { name: "Node.js", icon: siNodedotjs, color: siNodedotjs.hex },
  { name: "PHP", icon: siPhp, color: siPhp.hex },
  { name: "MySQL", icon: siMysql, color: siMysql.hex },
  { name: "Git", icon: siGit, color: siGit.hex },
  { name: "GitHub", icon: siGithub, color: siGithub.hex, modifier: "github" },
  { name: "Docker", icon: siDocker, color: siDocker.hex },
  { name: "Visual Studio Code", icon: siVisualstudiocode, color: siVisualstudiocode.hex },
];

const marqueeRows: MarqueeRow[] = [
  { label: "Graphic Design", direction: "left", duration: "55s", skills: graphicDesignSkills },
  { label: "UI/UX Design", direction: "right", duration: "55s", skills: uiuxSkills },
  { label: "Development", direction: "left", duration: "55s", skills: devSkills },
];

/** Number of duplicated groups; keeps the loop seamless at any viewport width. */
const COPIES = ["c1", "c2", "c3", "c4", "c5", "c6","c1", "c2", "c3", "c4", "c5", "c6"] as const;

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" role="img" aria-hidden="true">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function MarqueeRow({ row }: { row: MarqueeRow }) {
  return (
    <div className="skills-marquee">
      <div
        className="skills-marquee-row"
        data-direction={row.direction}
        style={{ "--marquee-duration": row.duration } as CSSProperties}
      >
        <div className="skills-marquee-track">
          {COPIES.map((copyId, copyIndex) => (
            <div
              key={`${copyId}-${copyIndex}`}
              className={
                copyIndex === 0
                  ? "skills-marquee-group"
                  : "skills-marquee-group skills-marquee-group--copy"
              }
              aria-hidden={copyIndex !== 0}
            >
              {row.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={
                    skill.modifier
                      ? `skills-marquee-icon skills-marquee-icon--${skill.modifier}`
                      : "skills-marquee-icon"
                  }
                  title={skill.name}
                  role="img"
                  aria-label={skill.name}
                  style={{ "--brand": skill.color } as CSSProperties}
                >
                  <BrandIcon icon={skill.icon} />
                </span>
              ))}
            </div>
          ))}
        </div>

        <span className="skills-marquee-fade skills-marquee-fade--left" aria-hidden="true" />
        <span className="skills-marquee-fade skills-marquee-fade--right" aria-hidden="true" />
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <RevealSection id="skills" className="skills-marquee-section">
      <div className="skills-marquee-head">
        <div className="reference-section-label">Tools &amp; Tech</div>
        <h2>Design, development, and everything in between.</h2>
      </div>

      <div className="skills-marquee-stack">
        {marqueeRows.map((row) => (
          <MarqueeRow key={row.label} row={row} />
        ))}
      </div>
    </RevealSection>
  );
}
