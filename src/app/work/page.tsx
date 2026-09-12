import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work, devProjects } from "@/resources";
import { getPosts } from "@/utils/utils";
import { WorkGallery, type WorkItem } from "@/components/work/WorkGallery";

/* =====================================================
   META
===================================================== */

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

/* =====================================================
   WORK
===================================================== */

export default async function Work() {
  const posts = getPosts(["src", "app", "work", "projects"]);

  const caseItems = posts.map((post) => ({
    id: post.slug,
    kind: "case" as const,
    category: post.metadata.category || "General",
    title: post.metadata.title,
    description: post.metadata.summary,
    tags: post.metadata.tags || [],
    href: `/work/${post.slug}`,
    image: post.metadata.images[0] || post.metadata.image,
    publishedAt: post.metadata.publishedAt,
  }));

  const devItems = devProjects.map((p) => ({
    id: p.title,
    kind: "github" as const,
    category: p.category,
    title: p.title,
    description: p.description,
    tags: p.tags,
    github: p.github,
  }));

  const allItems = [...caseItems, ...devItems].sort((a, b) => {
    const dateA = "publishedAt" in a && a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = "publishedAt" in b && b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <WorkGallery items={allItems} priorityCount={2} />
    </Column>
  );
}