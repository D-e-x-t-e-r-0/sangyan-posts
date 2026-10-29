import type { MetadataRoute } from "next";
import { getPosts } from "@/content/posts";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(posts[0]?.date ?? "2026-10-08"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
