import { About, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Ramesh",
  lastName: "Tiwari",
  name: "Ramesh Tiwari",
  role: "Freelance UI/UX Designer & Frontend Developer",
  avatar: "/images/avatar-01.jpg",
  email: "eswobtik.tiwari@gmail.com",
  location: "Asia/Kathmandu",
  locationLabel: "Kathmandu, Nepal",
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

/** Contact is a home-page anchor, shown in the main navigation. */
const contact = {
  path: "/#contact",
  label: "Contact",
};

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} | UI/UX & Frontend Developer in Kathmandu, Nepal`,
  description: `Freelance UI/UX design, web design, frontend development, and brand identity from Kathmandu, Nepal. Available for remote projects in Nepal and internationally.`,
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
  description: `Meet ${person.name}, a Kathmandu-based freelance UI/UX designer and frontend developer working across web design and brand identity for clients in Nepal and internationally.`,
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
        I’m {person.firstName}, a BIM student and multidisciplinary designer interested in graphic design, UI/UX, and development. I enjoy turning ideas into clear visual identities and practical digital experiences.
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
        name: "Bachelor in Information Technology — Tribhuvan University",
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
  description: `Explore UI/UX design, web design, and frontend development case studies by ${person.name}, a freelance designer based in Kathmandu, Nepal.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Design gallery – ${person.name}`,
  description: `Explore selected visual and brand identity work by ${person.name}, a freelance designer based in Kathmandu, Nepal.`,
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "YatraFirst mobile bus booking screens for route search, trips, and offers",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Snow-covered mountain peak under a clear sky",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "KrishiMitra mobile app interface for Nepali farmers",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Cinematic Studio mobile app screens for recording and exporting video",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Mountain peaks lit by warm sunset light",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "KrishiMitra app screens for crop advice, weather, and farmer support",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "KrishiMitra agriculture app screens for crop advice and market information",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Snowy forest and mountain landscape at dusk",
      orientation: "vertical",
    },
  ],
};

export { person, social, contact, newsletter, home, about, work, gallery };
