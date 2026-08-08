import { About, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Ramesh",
  lastName: "Tiwari",
  name: "Ramesh Tiwari",
  role: "UI/UX Designer • Graphic Designer • Frontend Developer",
  avatar: "/images/avatar.jpg",
  email: "hello@ramesh.dev",
  location: "Asia/Kathmandu",
  languages: ["English", "Nepali"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Stay in the loop</>,
  description: <>Design notes, product ideas, and build updates.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Designer-bat",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/rameshtiwari-gd/",
    essential: true,
  },
  {
    name: "Behance",
    icon: "behance",
    link: "https://www.behance.net/Rameshtiwari_",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} • Portfolio`,
  description: `Portfolio website showcasing the work of ${person.name}, a UI/UX designer, graphic designer, and frontend developer based in Kathmandu.`,
  headline: <>Designing premium digital experiences from idea to launch.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Available now</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Open for select collaborations
        </Text>
      </Row>
    ),
    href: "/#projects",
  },
  subline: (
    <>
      I create clean interfaces, memorable identities, and fast frontend experiences for startups,
      agencies, and founders who want premium digital work.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a multidisciplinary designer and frontend developer building thoughtful digital products in Kathmandu.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I’m {person.firstName}, a multidisciplinary designer and frontend developer focused on making digital products feel effortless, refined, and useful. My work spans brand systems, interface design, and modern web development, with a strong preference for clarity, pacing, and premium interactions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Selected experience",
    experiences: [
      {
        company: "Independent Studio",
        timeframe: "Present",
        role: "UI/UX Designer • Graphic Designer • Frontend Developer",
        achievements: [
          <>Designing polished user experiences for web products, e-commerce platforms, and experimental interfaces.</>,
          <>Building frontend experiences with React and Next.js while keeping visual systems consistent and performant.</>,
          <>Creating brand identities and marketing visuals that feel premium and conversion-focused.</>,
        ],
        images: [],
      },
      {
        company: "Open Product Builder",
        timeframe: "Recent work",
        role: "Side projects and case studies",
        achievements: [
          <>Shipping practical products such as smart parking systems, AI assistants, ad blockers, and online storefronts.</>,
          <>Balancing design thinking with engineering discipline to turn product ideas into usable experiences.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "BIM Student",
        description: <>Building a strong foundation in technology, systems thinking, and product development.</>,
      },
      {
        name: "Self-directed learning",
        description: <>Continuously sharpening skills in UI/UX, branding, front-end development, and modern product design.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Core strengths",
    skills: [
      {
        title: "Design systems",
        description: <>Crafting clear interfaces, thoughtful layouts, and polished visual systems for digital products.</>,
        tags: [{ name: "UI Design" }, { name: "UX Design" }, { name: "Brand Identity" }],
        images: [],
      },
      {
        title: "Frontend development",
        description: <>Turning design into responsive, performant experiences with React, Next.js, and modern tooling.</>,
        tags: [{ name: "React" }, { name: "Next.js" }, { name: "Tailwind" }, { name: "PHP" }, { name: "MySQL" }],
        images: [],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and development work by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Design gallery – ${person.name}`,
  description: `A collection of branding and visual work by ${person.name}`,
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, work, gallery };
