import {
  Avatar,
  Button,
  Column,
  Heading,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import { about, baseURL, person, social } from "@/resources";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className="portfolio-section" style={{ padding: "2rem" }}>
        <Row gap="24" s={{ direction: "column" }} vertical="start">
          <Column flex={1} gap="12">
            <Avatar src={person.avatar} size="xl" />
            <Text variant="label-default-s" onBackground="brand-weak">About</Text>
            <Heading variant="display-strong-l">{person.name}</Heading>
            <Text variant="heading-default-xl" onBackground="neutral-weak">{person.role}</Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              I’m a multidisciplinary designer and frontend developer building thoughtful digital products for founders, teams, and brands that care about details.
            </Text>
            <Row wrap gap="8">
              {person.languages?.map((language) => (
                <Tag key={language} size="l">{language}</Tag>
              ))}
            </Row>
          </Column>
          <Column flex={1} className="portfolio-card" padding="24" gap="12">
            <Text variant="heading-strong-m">At a glance</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Based in Kathmandu, Nepal. Focused on UI/UX, branding, and performant frontend work.
            </Text>
            <Row wrap gap="8">
              <Tag size="l">Product design</Tag>
              <Tag size="l">Brand systems</Tag>
              <Tag size="l">React & Next.js</Tag>
            </Row>
            <Row wrap gap="8" paddingTop="8">
              {social.map((item) => (
                item.link ? (
                  <Button key={item.name} href={item.link} size="s" variant="secondary" data-border="rounded">
                    {item.name}
                  </Button>
                ) : null
              ))}
            </Row>
          </Column>
        </Row>
      </section>

      <section className="portfolio-section" style={{ padding: "2rem" }}>
        <Column gap="16">
          <Text variant="label-default-s" onBackground="brand-weak">Selected experience</Text>
          <Column gap="12">
            {about.work.experiences.map((experience, index) => (
              <Column key={`${experience.company}-${index}`} className="portfolio-card" padding="20" gap="8">
                <Row horizontal="between" vertical="center" s={{ direction: "column", horizontal: "start" }}>
                  <Text variant="heading-strong-m">{experience.company}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">{experience.timeframe}</Text>
                </Row>
                <Text variant="body-default-s" onBackground="brand-weak">{experience.role}</Text>
                <Column as="ul" gap="8">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <Text as="li" key={`${experience.company}-${achievementIndex}`} variant="body-default-s" onBackground="neutral-weak">
                      {achievement}
                    </Text>
                  ))}
                </Column>
              </Column>
            ))}
          </Column>
        </Column>
      </section>

      <section className="portfolio-section" style={{ padding: "2rem" }}>
        <Column gap="16">
          <Text variant="label-default-s" onBackground="brand-weak">Core strengths</Text>
          <Column gap="12">
            {about.technical.skills.map((skill, index) => (
              <Column key={`${skill.title}-${index}`} className="portfolio-card" padding="20" gap="8">
                <Text variant="heading-strong-m">{skill.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">{skill.description}</Text>
                <Row wrap gap="8">
                  {skill.tags?.map((tag) => (
                    <Tag key={`${skill.title}-${tag.name}`} size="s">{tag.name}</Tag>
                  ))}
                </Row>
              </Column>
            ))}
          </Column>
        </Column>
      </section>

      <section className="portfolio-section" style={{ padding: "2rem" }}>
        <Column gap="16">
          <Text variant="label-default-s" onBackground="brand-weak">Education</Text>
          <Column gap="12">
            {about.studies.institutions.map((institution, index) => (
              <Column key={`${institution.name}-${index}`} className="portfolio-card" padding="20" gap="4">
                <Text variant="heading-strong-m">{institution.name}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">{institution.description}</Text>
              </Column>
            ))}
          </Column>
        </Column>
      </section>
    </Column>
  );
}