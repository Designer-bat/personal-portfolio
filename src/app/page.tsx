import { Column, Meta, Schema } from "@once-ui-system/core";

import { baseURL, devProjects, home, person, social } from "@/resources";
import { getPosts } from "@/utils/utils";
import {
  ProjectCard,
  AsciiScene,
  Reveal,
  RevealSection,
  SkillsMarquee,
  Stagger,
  StaggerItem,
} from "@/components";

import { HiArrowUpRight } from "react-icons/hi2";


/* =====================================================
   SELECTED WORK (case studies from /work/projects)
===================================================== */

const featuredPosts = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
  return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
});


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

            <Reveal className="reference-eyebrow">
              <span className="reference-dot" />
              Available for freelance
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="reference-title">
                Hi, I'm Ramesh Tiwari

                <br />
                <span className="reference-accent">
                  Designer &amp; Developer
                </span>
              </h1>
            </Reveal>

           <br />
            <br />
            <Reveal className="reference-cta" delay={0.16}>
              <a href="/#projects" className="reference-button">
                View My Work
                <span aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="reference-button reference-button-ghost">
                Let's Work Together
              </a>
            </Reveal>

          </div>

          {/* RIGHT IMAGE */}
          <Reveal className="reference-hero-image" delay={0.18}>

            <div className="reference-decoration decoration-1" />
            <div className="reference-decoration decoration-2" />
            <div className="reference-decoration decoration-3" />
            <div className="reference-decoration decoration-4" />
            <div className="reference-decoration decoration-5" />
            <div className="reference-decoration decoration-6" />

            <div className="reference-image-glow" />

            <AsciiScene />

          </Reveal>

        </div>
      </section>


      {/* =================================================
          SELECTED WORK
      ================================================= */}

      <RevealSection id="projects" className="reference-section">
        <div className="reference-section-label">Selected Work</div>
        <h2>Designing and building from idea to launch.</h2>
        
        <Stagger className="reference-featured-grid">
          {featuredPosts.map((post, index) => (
            <StaggerItem key={post.slug}>
              <ProjectCard
                priority={index < 2}
                href={`/work/${post.slug}`}
                image={post.metadata.image}
                images={post.metadata.images}
                title={post.metadata.title}
                publishedAt={post.metadata.publishedAt}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <a href="/work" className="reference-text-link">
          View all work <span aria-hidden="true">→</span>
        </a>
      </RevealSection>


      {/* =================================================
          DESIGN HIGHLIGHTS
      ================================================= */}

      <RevealSection id="design" className="reference-section">
        <div className="reference-section-label">Graphic Design</div>
        <h2>Brand systems and visual storytelling.</h2>

        <Stagger className="reference-project-grid">
          {designHighlights.map(
            (item) => (
              <StaggerItem key={item.title} className="reference-project">
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
              </StaggerItem>
            )
          )}
        </Stagger>
      </RevealSection>


      {/* =================================================
          DEVELOPMENT
      ================================================= */}

      <RevealSection id="development" className="reference-section">
        <div className="reference-section-label">Development</div>
        <h2>Practical products, built end to end.</h2>
        <p>
          Side projects where I handle both the design and the engineering —
          from storefronts to management systems.
        </p>

        <Stagger className="reference-dev-rows">
          {devProjects.map((project) => (
            <StaggerItem key={project.title}>
              <a
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
            </StaggerItem>
          ))}
        </Stagger>
      </RevealSection>


      {/* =================================================
          ABOUT
      ================================================= */}

      <RevealSection id="about" className="reference-section">
        <div className="reference-section-label">About</div>
        <h2>I build work that feels considered, elegant, and clear.</h2>
        <p>
          I'm Ramesh, a multidisciplinary designer working across graphic
          design, brand identity, UI/UX, and frontend development. I enjoy
          turning ideas into clear visual identities and practical digital
          experiences.
        </p>
      </RevealSection>


      {/* =================================================
          SKILLS — tool marquee (Graphic Design / UI/UX / Dev)
      ================================================= */}

      <SkillsMarquee />


      {/* =================================================
          SERVICES
      ================================================= */}

      <RevealSection id="services" className="reference-section">
        <div className="reference-section-label">Services</div>
        <h2>What I can help you build.</h2>

        <Stagger className="reference-service-grid">
          {services.map((service) => (
            <StaggerItem key={service} className="reference-service">
                <h3>{service}</h3>
                <p>
                  Thoughtful, practical, and conversion-focused execution.
                </p>
            </StaggerItem>
          ))}
        </Stagger>
      </RevealSection>


      {/* =================================================
          CONTACT
      ================================================= */}

      <RevealSection id="contact" className="reference-contact">
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
      </RevealSection>

    </Column>
  );
}