import { notFound } from "next/navigation";
import { Button, Column, Heading, Row, Schema, Text } from "@once-ui-system/core";
import { about, baseURL, person } from "@/resources";
import { servicePages } from "@/resources/services";
import { generatePageMetadata } from "@/utils/seo";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) return {};

  const path = `/services/${service.slug}`;
  return generatePageMetadata({
    title: service.title,
    description: service.description,
    baseURL,
    path,
    image: `/api/og/generate?title=${encodeURIComponent(service.title)}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heading,
    description: service.description,
    serviceType: service.heading,
    url: `${baseURL}${path}`,
    areaServed: ["Nepal", "International"],
    provider: {
      "@type": "Person",
      name: person.name,
      url: `${baseURL}${about.path}`,
    },
  };

  return (
    <Column maxWidth="m" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={path}
        title={service.title}
        description={service.description}
        image={`/api/og/generate?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="portfolio-section">
        <Text variant="label-default-s" onBackground="brand-weak">
          {person.locationLabel} · Available for remote projects in Nepal and internationally
        </Text>
        <Heading as="h1" variant="display-strong-l">
          {service.heading}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {service.introduction}
        </Text>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {service.idealFor}
        </Text>
      </section>

      <section className="portfolio-section">
        <Column className="portfolio-card" padding="24" gap="12">
          <Heading as="h2" variant="heading-strong-l">
            What the work can include
          </Heading>
          <Column as="ul" gap="8">
            {service.deliverables.map((deliverable) => (
              <Text as="li" key={deliverable} variant="body-default-m" onBackground="neutral-weak">
                {deliverable}
              </Text>
            ))}
          </Column>
        </Column>
      </section>

      <section className="portfolio-section">
        <Column className="portfolio-card" padding="24" gap="12">
          <Heading as="h2" variant="heading-strong-l">
            A collaborative process
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {service.approach}
          </Text>
          <Row wrap gap="8">
            {service.relatedWork.map((work) => (
              <Button key={work.href} href={work.href} size="s" variant="secondary">
                {work.label}
              </Button>
            ))}
          </Row>
        </Column>
      </section>

      <section className="portfolio-section">
        <Column gap="12" align="center">
          <Heading as="h2" variant="heading-strong-l">
            Have a project in mind?
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Tell me what you are working on and we can discuss the right scope.
          </Text>
          <Button href={`mailto:${person.email}`} variant="primary">
            Contact Ramesh
          </Button>
          <Button href="/#services" variant="secondary">
            Explore all services
          </Button>
        </Column>
      </section>
    </Column>
  );
}
