import { defineEventHandler, setHeader } from "h3";

const SITE_URL = "https://www.ogbonna.dev";
const DEV_TO_API_URL = "https://dev.to/api";

interface DevToBlog {
  id: number;
  slug: string;
  published_at: string;
}

async function fetchAllBlogs(): Promise<DevToBlog[]> {
  const apiKey = process.env.DEV_TO_API_KEY ?? "";

  try {
    const response = await fetch(
      `${DEV_TO_API_URL}/articles/me/published?per_page=100`,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch blogs: ${response.statusText}`);
      return [];
    }

    return (await response.json()) as DevToBlog[];
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
    return [];
  }
}

function formatDate(date: string): string {
  return new Date(date).toISOString().split("T")[0];
}

function generateSitemapXml(blogs: DevToBlog[]): string {
  const today = formatDate(new Date().toISOString());

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.9", changefreq: "weekly" },
    { url: "/projects", priority: "0.8", changefreq: "monthly" },
  ];

  const staticEntries = staticPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  const blogEntries = blogs
    .map(
      (blog) => `  <url>
    <loc>${SITE_URL}/blog/${blog.slug}_${blog.id}</loc>
    <lastmod>${formatDate(blog.published_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;
}

export default defineEventHandler(async (event) => {
  const blogs = await fetchAllBlogs();
  const sitemap = generateSitemapXml(blogs);

  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=3600");

  return sitemap;
});
