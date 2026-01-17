import { createServerFn } from "@tanstack/react-start";

const DEV_TO_API_URL = "https://dev.to/api";
const DEV_TO_API_KEY = process.env.DEV_TO_API_KEY ?? "";

export interface DevToUser {
  name: string;
  username: string;
  profile_image: string;
}

export interface DevToBlog {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover_image: string;
  published_at: string;
  published_timestamp: string;
  reading_time_minutes: number;
  page_views_count: number;
  tags: string[];
  body_markdown: string;
  user: DevToUser;
}

export const getBlogs = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number; page?: number }) => data)
  .handler(async ({ data }) => {
    const limit = data?.limit ?? 10;
    const page = data?.page ?? 1;

    const query = new URLSearchParams();
    query.set("per_page", String(limit));
    query.set("page", String(page));

    try {
      const response = await fetch(
        `${DEV_TO_API_URL}/articles/me/published?${query}`,
        {
          headers: {
            "api-key": DEV_TO_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      const blogs = (await response.json()) as DevToBlog[];
      return { data: blogs, error: null };
    } catch (error) {
      return { data: null, error: String(error) };
    }
  });

export const getBlogById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      const response = await fetch(`${DEV_TO_API_URL}/articles/${data.id}`, {
        headers: {
          "api-key": DEV_TO_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.statusText}`);
      }

      const blog = (await response.json()) as DevToBlog;
      return { data: blog, error: null };
    } catch (error) {
      return { data: null, error: String(error) };
    }
  });
