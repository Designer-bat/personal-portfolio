type TextMarqueeProps = {
  items?: string[];
  /** seconds for one full loop, higher = slower */
  duration?: number;
  /** "left" (default) or "right" */
  direction?: "left" | "right";
};

const DEFAULT_ITEMS = [
  "UI/UX Designer",
  "Graphic Designer",
  "Web Development",
  "BIM Student",
  "UI / UX researcher",
  "Brand Identity",
  "logo and visual identity",
];

function Star() {
  return (
    <svg className="text-marquee-star" viewBox="0 0 24 24" aria-hidden="true">
      {/* 4-point sparkle */}
      <path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z" />
    </svg>
  );
}

export function TextMarquee({
  items = DEFAULT_ITEMS,
  duration = 40,
  direction = "left",
}: TextMarqueeProps) {
  // The list is rendered twice so the loop is seamless (the track moves -50%).
  const group = (hidden: boolean) => (
    <ul className="text-marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="text-marquee-item">
          <Star />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="text-marquee"
      data-direction={direction}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-label="Services"
    >
      <div className="text-marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}