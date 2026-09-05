import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";

import { baseURL, home, person, social } from "@/resources";
import { Projects } from "@/components/work/Projects";

import {
  SiFigma,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPhp,
  SiMysql,
  SiGit,
  SiGithub,
} from "react-icons/si";

import {
  MdDesignServices,
  MdSearch,
  MdAccessibility,
} from "react-icons/md";


/* =====================================================
   PROJECTS
===================================================== */

const projectGallery = [
  {
    name: "ecommerce-website",
    category: "Product UI • Frontend",
    description:
      "A polished clothing storefront experience with a conversion-oriented flow and a practical admin layer.",
    tags: ["UI", "Frontend", "JavaScript"],
    github:
      "https://github.com/Designer-bat/ecommerce-website",
    caseStudy: "/work",
  },

  {
    name: "ProjectHamroEasyParking",
    category: "UX • Dashboard",
    description:
      "A smart parking management system focused on clarity, usability, and operational flow.",
    tags: ["UX", "PHP", "Dashboard"],
    github:
      "https://github.com/Designer-bat/ProjectHamroEasyParking",
    caseStudy: "/work",
  },

  {
    name: "ProjectArtsphere",
    category: "Brand • Experience",
    description:
      "A digital space for artists and audiences designed around discovery, storytelling, and community.",
    tags: ["Brand", "UI", "React"],
    github:
      "https://github.com/Designer-bat/ProjectArtsphere",
    caseStudy: "/work",
  },
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
   SKILLS
===================================================== */

const skillGroups = [
  [
    {
      name: "UI Design",
      icon: MdDesignServices,
    },

    {
      name: "UX Design",
      icon: MdDesignServices,
    },

    {
      name: "Graphic Design",
      icon: MdDesignServices,
    },

    {
      name: "Figma",
      icon: SiFigma,
    },

    {
      name: "Photoshop",
      icon: MdDesignServices,
    },

    {
      name: "Illustrator",
      icon: MdDesignServices,
    },
  ],

  [
    {
      name: "React",
      icon: SiReact,
    },

    {
      name: "Next.js",
      icon: SiNextdotjs,
    },

    {
      name: "Tailwind",
      icon: SiTailwindcss,
    },

    {
      name: "JavaScript",
      icon: SiJavascript,
    },

    {
      name: "HTML",
      icon: SiHtml5,
    },

    {
      name: "CSS",
      icon: SiCss,
    },
  ],

  [
    {
      name: "PHP",
      icon: SiPhp,
    },

    {
      name: "MySQL",
      icon: SiMysql,
    },

    {
      name: "Git",
      icon: SiGit,
    },

    {
      name: "GitHub",
      icon: SiGithub,
    },

    {
      name: "SEO",
      icon: MdSearch,
    },

    {
      name: "Accessibility",
      icon: MdAccessibility,
    },
  ],
];


/* =====================================================
   DESIGN HIGHLIGHTS
===================================================== */

const designHighlights = [
  {
    title: "MAYUR Brand Identity & Visual System",
    category: "Branding",
  },

  {
    title: "Novagrow Brand Identity",
    category: "Branding",
  },

  {
    title: "GADGET GALLERY ONLINE STORE",
    category: "UI",
  },

  {
    title: "Rebranding Kilowatt logo",
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
        image={`/api/og/generate?title=${encodeURIComponent(
          home.title
        )}`}
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

              Hi im Ramesh Tiwari

              <br />

              <span className="reference-accent">

                Designer & Developer.

              </span>

            </h1>


            <p className="reference-description">

              I’m an BIM student with a passion for
              development. As a developer and Designer,
              I enjoy turning ideas into creative and
              meaningful digital experiences.

            </p>


            <div className="reference-cta">

              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              />

              <a
                href="#contact"
                className="reference-button"
              >
                Connect With Me
              </a>

            </div>


            <div className="reference-services">

              <span>UI/UX Design</span>

              <span>Brand Identity</span>

              <span>Web Design</span>

              <span>Development</span>

            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="reference-hero-image">

            <div
              className="reference-decoration decoration-1"
            />

            <div
              className="reference-decoration decoration-2"
            />

            <div
              className="reference-decoration decoration-3"
            />

            <div
              className="reference-decoration decoration-4"
            />

            <div
              className="reference-decoration decoration-5"
            />

            <div
              className="reference-decoration decoration-6"
            />


            <div className="reference-image-glow" />


            <img
              src={person.avatar}
              alt={person.name}
              className="reference-person"
            />

          </div>

        </div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section
        id="about"
        className="reference-section"
      >

        <div className="reference-section-label">
          About
        </div>


        <h2>

          I build products that feel considered,
          elegant, and clear.

        </h2>


        <p>

          I’m a multidisciplinary creative who enjoys
          shaping both the product experience and the
          visual language around it. My work blends
          interface design, branding, and frontend craft.

        </p>

      </section>


      {/* =================================================
          SKILLS
      ================================================= */}

      <section
        id="skills"
        className="reference-section skills-section"
      >

        <div className="reference-section-label">
          Skills
        </div>


        <h2>

          Design, development and everything
          in between.

        </h2>


        {/* SKILLS MARQUEE */}

        <div className="skills-marquee">

          {skillGroups.map(
            (group, groupIndex) => (

              <div
                className={`skills-marquee-row ${
                  groupIndex % 2 === 1
                    ? "skills-marquee-reverse"
                    : ""
                }`}
                key={groupIndex}
              >

                <div className="skills-marquee-track">

                  {[...group, ...group].map(
                    (skill, index) => {

                      const Icon = skill.icon;

                      return (

                        <div
                          className="skill-logo"
                          key={`${skill.name}-${index}`}
                        >

                          <Icon
                            className="skill-logo-icon"
                          />

                          <span>
                            {skill.name}
                          </span>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          SERVICES
      ================================================= */}

      <section
        id="services"
        className="reference-section"
      >

        <div className="reference-section-label">
          Services
        </div>


        <h2>
          What I can help you build.
        </h2>


        <div className="reference-service-grid">

          {services.map((service) => (

            <div
              key={service}
              className="reference-service"
            >

              <h3>
                {service}
              </h3>


              <p>

                Thoughtful, practical and
                conversion-focused execution.

              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =================================================
          PROJECTS
      ================================================= */}

      <section
        id="projects"
        className="reference-section"
      >

        <div className="reference-section-label">
          Projects
        </div>


        <h2>

          A selection of things I’ve designed
          and built.

        </h2>


        <div className="reference-project-grid">

          {projectGallery.map(
            (project) => (

              <div
                key={project.name}
                className="reference-project"
              >

                <span>
                  {project.category}
                </span>


                <h3>
                  {project.name}
                </h3>


                <p>
                  {project.description}
                </p>


                <div className="reference-project-tags">

                  {project.tags.map(
                    (tag) => (

                      <small key={tag}>
                        {tag}
                      </small>

                    )
                  )}

                </div>


                <div className="reference-project-links">

                  <a href={project.github}>
                    GitHub
                  </a>


                  <a href={project.caseStudy}>
                    Case Study
                  </a>

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          GRAPHIC DESIGN
      ================================================= */}

      <section
        id="design"
        className="reference-section"
      >

        <div className="reference-section-label">
          Graphic Design
        </div>


        <h2>
          Brand systems and visual storytelling.
        </h2>


        <div className="reference-project-grid">

          {designHighlights.map(
            (item) => (

              <div
                key={item.title}
                className="reference-project"
              >

                <span>
                  {item.category}
                </span>


                <h3>
                  {item.title}
                </h3>


                <a
                  href="https://www.behance.net/Rameshtiwari_"
                  className="reference-text-link"
                >
                  View Behance →
                </a>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          CONTACT
      ================================================= */}

      <section
        id="contact"
        className="reference-contact"
      >

        <div className="reference-section-label">
          Contact
        </div>


        <h2>

          Let’s build something
          <br />
          great together.

        </h2>


        <p>

          Open to freelance collaborations,
          product design conversations and
          frontend-led design partnerships.

        </p>


        <div className="reference-contact-links">

          <a href="https://www.linkedin.com/in/rameshtiwari-gd/">
            LinkedIn
          </a>


          <a href="https://github.com/Designer-bat">
            GitHub
          </a>


          <a href="https://www.behance.net/Rameshtiwari_">
            Behance
          </a>

        </div>

      </section>

    </Column>
  );
}