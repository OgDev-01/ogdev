import { defineEventHandler, setHeader } from "h3";

const SITE_URL = "https://www.ogbonna.dev";
const SITE_TITLE = "Sunday Ogbonna - Blog";
const SITE_DESCRIPTION =
  "Articles about web development, React, TypeScript, and software engineering by Sunday Ogbonna.";
const DEV_TO_API_URL = "https://dev.to/api";

interface DevToBlog {
  id: number;
  title: string;
  description: string;
  slug: string;
  published_at: string;
  tags: string[];
}

async function fetchAllBlogs(): Promise<DevToBlog[]> {
  const apiKey = process.env.DEV_TO_API_KEY ?? "";

  try {
    const response = await fetch(
      `${DEV_TO_API_URL}/articles/me/published?per_page=50`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as DevToBlog[];
  } catch {
    return [];
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRssXml(blogs: DevToBlog[]): string {
  const now = new Date().toUTCString();

  const items = blogs
    .map((blog) => {
      const link = `${SITE_URL}/blog/${blog.slug}_${blog.id}`;
      const categories = blog.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(blog.description)}</description>
      <pubDate>${formatRFC822Date(blog.published_at)}</pubDate>
      <author>contact@ogbonna.dev (Sunday Ogbonna)</author>
${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;
}

export default defineEventHandler(async (event) => {
  const blogs = await fetchAllBlogs();
  const rss = generateRssXml(blogs);

  setHeader(event, "Content-Type", "application/rss+xml; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=3600");

  return rss;
});
