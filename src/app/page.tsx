import { Column, Meta, Schema } from "@once-ui-system/core";

import {
  AsciiScene,
  ProjectCarousel,
  Reveal,
  RevealSection,
  SkillsMarquee,
  Stagger,
  StaggerItem,
} from "@/components";
import { baseURL, home, person, social } from "@/resources";
import { getPosts } from "@/utils/utils";

import {
  HiCodeBracket,
  HiDevicePhoneMobile,
  HiGlobeAlt,
  HiPaintBrush,
  HiSparkles,
  HiSquares2X2,
} from "react-icons/hi2";

/* =====================================================
   SELECTED WORK (case studies from /work/projects)
===================================================== */

const featuredPosts = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
  return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
});

/* =====================================================
   SERVICES
===================================================== */

const servicesList = [
  {
    title: "Development",
    icon: HiCodeBracket,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
  },
  {
    title: "Website Design",
    icon: HiGlobeAlt,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
  },
  {
    title: "Mobile App Design",
    icon: HiDevicePhoneMobile,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
  },
  {
    title: "Brand Identity",
    icon: HiSparkles,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
  },
  {
    title: "Graphic Design",
    icon: HiPaintBrush,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
  },
  {
    title: "UI/UX Design",
    icon: HiSquares2X2,
    description: "Thoughtful, practical, and conversion-focused execution for modern platforms.",
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
    <Column fillWidth horizontal="center" gap="0" className="portfolio-home">
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
          HERO (UNCHANGED)
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
                <span className="reference-accent">Designer &amp; Developer</span>
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
          SELECTED WORK (CAROUSEL)
      ================================================= */}

      <RevealSection id="projects" className="reference-section">
        <ProjectCarousel
          posts={featuredPosts}
          eyebrow="Selected Work"
          title="Designing and Development from idea to launch."
        />
      </RevealSection>

      {/* =================================================
          ABOUT
      ================================================= */}

      <RevealSection id="about" className="reference-section">
        <div className="reference-section-label">About</div>
        <h2>I build work that feels considered, elegant, and clear.</h2>
        <p>
          I'm Ramesh, a multidisciplinary designer working across graphic design, brand identity,
          UI/UX, and frontend development. I enjoy turning ideas into clear visual identities and
          practical digital experiences.
        </p>

        <hr className="reference-divider" />
      </RevealSection>

      {/* =================================================
          TOOLS & TECH
      ================================================= */}

      <SkillsMarquee />

      {/* =================================================
          SERVICES
      ================================================= */}

      <RevealSection id="services" className="reference-section">
        <div className="reference-section-label">Services</div>
        <h2>What I can help you build.</h2>

        <Stagger className="reference-service-grid">
          {servicesList.map((service) => (
            <StaggerItem key={service.title} className="reference-service">
              <div className="reference-service-icon" aria-hidden="true">
                <service.icon />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
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
          Open to freelance collaborations, product design conversations, and frontend-led design
          partnerships.
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
