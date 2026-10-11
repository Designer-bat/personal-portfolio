export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  idealFor: string;
  deliverables: string[];
  approach: string;
  relatedWork: { label: string; href: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX Design in Kathmandu, Nepal | Ramesh Tiwari",
    description:
      "Freelance UI/UX design for digital products, from user flows and wireframes to clear, responsive interfaces. Based in Kathmandu and available remotely.",
    heading: "UI/UX design for clear, useful digital products",
    introduction:
      "I help shape product experiences so people can understand what to do, find what they need, and move through each screen with confidence.",
    idealFor:
      "Founders, product teams, and businesses planning a new digital product or improving an existing experience.",
    deliverables: [
      "Information architecture and user flows",
      "Wireframes and interface design",
      "Responsive screens and interactive prototypes",
      "A consistent visual system for product interfaces",
    ],
    approach:
      "We start with your goals, audience, and project scope, then map the important tasks before refining the interface and documenting the design direction.",
    relatedWork: [
      { label: "KrishiMitra agriculture app concept", href: "/work/krishimitra" },
      { label: "YatraFirst bus booking app concept", href: "/work/yatrafirst-bus-booking-app" },
    ],
  },
  {
    slug: "web-design",
    title: "Web Design in Kathmandu, Nepal | Ramesh Tiwari",
    description:
      "Freelance web design for businesses and digital products: clear page structure, responsive layouts, and thoughtful visual direction from Kathmandu, Nepal.",
    heading: "Web design that makes your offer easy to understand",
    introduction:
      "I design websites that bring your message, visual identity, and next steps together in a focused experience across screen sizes.",
    idealFor:
      "Small businesses, independent teams, and founders who need a new website or a clearer direction for an existing one.",
    deliverables: [
      "Page structure and content hierarchy",
      "Visual direction and responsive page designs",
      "Reusable interface patterns for key sections",
      "A handoff-ready design for frontend implementation",
    ],
    approach:
      "We clarify what the site needs to communicate, organize the essential content, and shape a responsive design around your audience and goals.",
    relatedWork: [
      { label: "GemiTech e-commerce website concept", href: "/work/gemitech-ecommerce-design" },
      { label: "Solas Health landing page concept", href: "/work/solas-health-website-design" },
    ],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design in Nepal | Ramesh Tiwari",
    description:
      "Freelance brand identity design for new and evolving businesses, including visual direction and practical identity elements. Based in Kathmandu, Nepal.",
    heading: "Brand identity with a clear visual point of view",
    introduction:
      "I help turn a brand's purpose and personality into a coherent visual direction that can be used consistently across digital touchpoints.",
    idealFor:
      "New businesses and existing teams looking to establish or refine how their brand looks and communicates.",
    deliverables: [
      "Visual direction aligned to your brief",
      "Typography and color recommendations",
      "Core brand identity assets scoped to the project",
      "Practical guidance for applying the identity across digital touchpoints",
    ],
    approach:
      "The identity takes shape from your goals, audience, and references. The scope and final assets are agreed together before design work begins.",
    relatedWork: [{ label: "Browse selected visual work", href: "/gallery" }],
  },
  {
    slug: "frontend-development",
    title: "Frontend Developer in Nepal | Ramesh Tiwari",
    description:
      "Freelance frontend development with React and Next.js, building responsive interfaces from thoughtful designs. Based in Kathmandu, available remotely.",
    heading: "Frontend development that brings design to life",
    introduction:
      "I build responsive web interfaces that carry a design through to the browser with care for layout, interaction, and consistency.",
    idealFor:
      "Founders, designers, and businesses who need a frontend partner to build or refine a website or product interface.",
    deliverables: [
      "Responsive page and component implementation",
      "React and Next.js frontend work",
      "Design-system-aware interface styling",
      "Collaboration with your existing product or design workflow",
    ],
    approach:
      "I review the design and technical scope, break the interface into reusable pieces, and build toward a responsive result that stays faithful to the intended experience.",
    relatedWork: [{ label: "Explore selected projects", href: "/work" }],
  },
];
