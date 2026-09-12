import { Column, Meta, Schema } from "@once-ui-system/core";

import { baseURL, devProjects, home, person, social } from "@/resources";
import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components";

import { HiArrowUpRight } from "react-icons/hi2";

import { MdDesignServices, MdPalette, MdShare, MdStyle } from "react-icons/md";

import {
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPhp,
} from "react-icons/si";


/* =====================================================
   SELECTED WORK (case studies from /work/projects)
===================================================== */

const featuredPosts = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
  return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
});


/* =====================================================
   SKILLS
===================================================== */

const designSkills = [
  { name: "Brand Identity", icon: MdStyle },
  { name: "Graphic Design", icon: MdPalette },
  { name: "UI/UX Design", icon: MdDesignServices },
  { name: "Social Media Design", icon: MdShare },
];

const devSkills = [
  { name: "HTML/CSS", icon: SiHtml5 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "PHP", icon: SiPhp },
  { name: "MySQL", icon: SiMysql },
  { name: "Git", icon: SiGit },
];


/* =====================================================
   SERVICES
===================================================== */

const services = [
  "Development",
  "Website Design",
  "Mobile App Design",
  "Brand Identity",
  "Graphic Design",
  "UI/UX Design",
];


/* =====================================================
   DESIGN HIGHLIGHTS (Behance)
===================================================== */

const designHighlights = [
  {
    title: "MAYUR — Brand Identity & Visual System",
    category: "Branding",
  },
  {
    title: "Gadget Gallery — Online Store",
    category: "UI",
  },
  {
    title: "Kilowatt — Logo Rebranding",
    category: "Logo",
  },
];


/* =====================================================
   METADATA
===================================================== */

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}


/* =====================================================
   HOME
===================================================== */

export default function Home() {
  return (
    <Column
      fillWidth
      horizontal="center"
      gap="0"
      className="portfolio-home"
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          image: `${baseURL}${person.avatar}`,
        }}
      />


      {/* =================================================
          HERO
      ================================================= */}

      <section className="reference-hero">
        <div className="reference-hero-inner">

          {/* LEFT CONTENT */}
          <div className="reference-hero-content">

            <div className="reference-eyebrow">
              <span className="reference-dot" />
              Available for freelance
            </div>

            <h1 className="reference-title">
              Ramesh Tiwari
              <br />
              <span className="reference-accent">
                Graphic Designer &amp; UI/UX Designer
              </span>
            </h1>

            <div className="reference-role">
              BIM Student · Aspiring Developer
            </div>

            <p className="reference-description">
              I combine visual design, UI/UX, and branding with technology to
              turn ideas into clear, premium digital experiences.
            </p>

            <div className="reference-cta">
              <a href="/#projects" className="reference-button">
                View My Work
                <span aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="reference-button reference-button-ghost">
                Let's Work Together
              </a>
            </div>

            <div className="reference-services">
              <span>UI/UX Design</span>
              <span>Brand Identity</span>
              <span>Graphic Design</span>
              <span>Web Design</span>
              <span>Development</span>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="reference-hero-image">

            <div className="reference-decoration decoration-1" />
            <div className="reference-decoration decoration-2" />
            <div className="reference-decoration decoration-3" />
            <div className="reference-decoration decoration-4" />
            <div className="reference-decoration decoration-5" />
            <div className="reference-decoration decoration-6" />

            <div className="reference-image-glow" />

            <img
              src={person.avatar}
              alt={`${person.name} — portrait`}
              className="reference-person"
            />

          </div>

        </div>
      </section>


      {/* =================================================
          SELECTED WORK
      ================================================= */}

      <section id="projects" className="reference-section">
        <div className="reference-section-label">Selected Work</div>
        <h2>Designing and building from idea to launch.</h2>
        <p>
          Brand identities, product interfaces, and the frontend work behind
          them — a closer look at the process for each project.
        </p>

        <div className="reference-featured-grid">
          {featuredPosts.map((post, index) => (
            <ProjectCard
              priority={index < 2}
              key={post.slug}
              href={`/work/${post.slug}`}
              image={post.metadata.image}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              category={post.metadata.category}
              tags={post.metadata.tags}
              publishedAt={post.metadata.publishedAt}
            />
          ))}
        </div>

        <a href="/work" className="reference-text-link">
          View all work <span aria-hidden="true">→</span>
        </a>
      </section>


      {/* =================================================
          DESIGN HIGHLIGHTS
      ================================================= */}

      <section id="design" className="reference-section">
        <div className="reference-section-label">Graphic Design</div>
        <h2>Brand systems and visual storytelling.</h2>

        <div className="reference-project-grid">
          {designHighlights.map(
            (item) => (
              <div
                key={item.title}
                className="reference-project"
              >
                <span>{item.category}</span>
                <h3>{item.title}</h3>

                <a
                  href="https://www.behance.net/Rameshtiwari_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-text-link"
                >
                  View Behance <HiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            )
          )}
        </div>
      </section>


      {/* =================================================
          DEVELOPMENT
      ================================================= */}

      <section id="development" className="reference-section">
        <div className="reference-section-label">Development</div>
        <h2>Practical products, built end to end.</h2>
        <p>
          Side projects where I handle both the design and the engineering —
          from storefronts to management systems.
        </p>

        <div className="reference-dev-rows">
          {devProjects.map((project) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="reference-dev-row"
            >
              <div className="reference-dev-main">
                <span className="reference-dev-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="reference-project-tags">
                  {project.tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </div>

              <span className="reference-dev-link">
                GitHub <HiArrowUpRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section id="about" className="reference-section">
        <div className="reference-section-label">About</div>
        <h2>I build work that feels considered, elegant, and clear.</h2>
        <p>
          I'm Ramesh, a multidisciplinary designer working across graphic
          design, brand identity, UI/UX, and frontend development. I enjoy
          turning ideas into clear visual identities and practical digital
          experiences.
        </p>
      </section>


      {/* =================================================
          SKILLS
      ================================================= */}

      <section id="skills" className="reference-section skills-section">
        <div className="reference-section-label">Skills</div>
        <h2>Design, development, and everything in between.</h2>

        <div className="skills-groups">

          <div className="skills-group">
            <div className="skills-group-head">
              <span className="skills-group-title">Design</span>
              <p>Identity, layout, and interface craft.</p>
            </div>
            <div className="skills-list">
              {designSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span className="skill-chip" key={skill.name}>
                    <Icon aria-hidden="true" />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="skills-group">
            <div className="skills-group-head">
              <span className="skills-group-title">Development</span>
              <p>Clean, responsive frontend and web systems.</p>
            </div>
            <div className="skills-list">
              {devSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span className="skill-chip" key={skill.name}>
                    <Icon aria-hidden="true" />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* =================================================
          SERVICES
      ================================================= */}

      <section id="services" className="reference-section">
        <div className="reference-section-label">Services</div>
        <h2>What I can help you build.</h2>

        <div className="reference-service-grid">
          {services.map((service) => (
            <div key={service} className="reference-service">
              <h3>{service}</h3>
              <p>
                Thoughtful, practical, and conversion-focused execution.
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* =================================================
          CONTACT
      ================================================= */}

      <section id="contact" className="reference-contact">
        <div className="reference-section-label">Contact</div>

        <h2>
          Have a project in mind?
          <br />
          Let's create something meaningful.
        </h2>

        <p>
          Open to freelance collaborations, product design conversations,
          and frontend-led design partnerships.
        </p>

        <div className="reference-contact-cta">
          <a href={`mailto:${person.email}`} className="reference-button">
            Let's Talk <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="reference-contact-links">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </section>

    </Column>
  );
}