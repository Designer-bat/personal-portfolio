import { CustomMDX, ScrollToHash } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, gallery, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { generatePageMetadata } from "@/utils/seo";
import { getPosts } from "@/utils/utils";
import {
  Avatar,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Line,
  Media,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return generatePageMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image:
      post.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    path: `${work.path}/${post.slug}`,
    type: "article",
    publishedTime: post.metadata.publishedAt,
  });
}

export default async function Project({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string | string[] }>;
  searchParams: Promise<{ image?: string | string[] }>;
}) {
  const routeParams = await params;
  const queryParams = await searchParams;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const requestedImage = typeof queryParams.image === "string" ? queryParams.image : undefined;
  const galleryImage = gallery.images.find(
    (image) => image.src === requestedImage && image.projectSlug === post.slug,
  );
  const projectImage = galleryImage?.src ?? post.metadata.images[0];
  const projectImageAlt = galleryImage?.alt || post.metadata.imageAlt || post.metadata.title;
  const projectTransitionName = galleryImage?.transitionName ?? `project-${post.slug}-primary`;

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <Row gap="m" vertical="center">
          <Link href="/work" transitionTypes={["nav-back"]}>
            <Text variant="label-strong-m">← Projects</Text>
          </Link>
          <Link href={gallery.path} transitionTypes={["nav-back"]}>
            <Text variant="label-strong-m">Gallery</Text>
          </Link>
        </Row>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {(post.metadata.category || post.metadata.tags?.length) && (
          <Row gap="s" wrap vertical="center">
            {post.metadata.category && (
              <Tag size="l">{post.metadata.category}</Tag>
            )}
            {post.metadata.tags?.map((tag) => (
              <Tag key={tag} size="s">
                {tag}
              </Tag>
            ))}
          </Row>
        )}
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                {member.linkedIn ? (
                  <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                ) : (
                  member.name
                )}
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {projectImage && (
        <ViewTransition name={projectTransitionName} share="morph" default="none">
          <Media
            priority
            aspectRatio="original"
            radius="m"
            alt={projectImageAlt}
            src={projectImage}
          />
        </ViewTransition>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
