import { createServerFn } from "@tanstack/react-start";

const DEV_TO_API_URL = "https://dev.to/api";
const DEV_TO_API_KEY = process.env.DEV_TO_API_KEY ?? "";

// Cache configuration
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes - data considered fresh
const CACHE_STALE_TTL_MS = 60 * 60 * 1000; // 1 hour - max stale age before forced refresh

// In-memory cache for blog data
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  isRevalidating?: boolean;
}

const blogsCache: Map<string, CacheEntry<DevToBlog[]>> = new Map();
const blogByIdCache: Map<string, CacheEntry<DevToBlog>> = new Map();

// Track if initial warm-up has been triggered
let cacheWarmupTriggered = false;

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

/**
 * Fetch blogs from DEV.to API (internal helper)
 */
async function fetchBlogsFromAPI(
  limit: number,
  page: number
): Promise<DevToBlog[]> {
  const query = new URLSearchParams();
  query.set("per_page", String(limit));
  query.set("page", String(page));

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

  return response.json() as Promise<DevToBlog[]>;
}

/**
 * Fetch single blog from DEV.to API (internal helper)
 */
async function fetchBlogByIdFromAPI(id: string): Promise<DevToBlog> {
  const response = await fetch(`${DEV_TO_API_URL}/articles/${id}`, {
    headers: {
      "api-key": DEV_TO_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog: ${response.statusText}`);
  }

  return response.json() as Promise<DevToBlog>;
}

/**
 * Warm up cache on module load (fire and forget)
 * This pre-fetches the default blog list to eliminate cold start latency
 */
function warmupCache(): void {
  if (cacheWarmupTriggered || !DEV_TO_API_KEY) return;
  cacheWarmupTriggered = true;

  // Pre-fetch default blogs (limit 20, page 1) - matches the blog index page
  const limit = 20;
  const page = 1;
  const cacheKey = `blogs:${limit}:${page}`;

  fetchBlogsFromAPI(limit, page)
    .then((blogs) => {
      blogsCache.set(cacheKey, {
        data: blogs,
        timestamp: Date.now(),
        isRevalidating: false,
      });
    })
    .catch(() => {
      // Silent fail on warmup - will fetch on demand
    });
}

// Trigger cache warmup on module load
warmupCache();

/**
 * Background revalidation for blogs list
 */
function revalidateBlogsInBackground(
  cacheKey: string,
  limit: number,
  page: number
): void {
  const entry = blogsCache.get(cacheKey);
  if (entry?.isRevalidating) return; // Already revalidating

  // Mark as revalidating
  if (entry) {
    entry.isRevalidating = true;
  }

  // Revalidate in background (fire and forget)
  fetchBlogsFromAPI(limit, page)
    .then((blogs) => {
      blogsCache.set(cacheKey, {
        data: blogs,
        timestamp: Date.now(),
        isRevalidating: false,
      });
    })
    .catch(() => {
      // On error, just clear the revalidating flag
      const existingEntry = blogsCache.get(cacheKey);
      if (existingEntry) {
        existingEntry.isRevalidating = false;
      }
    });
}

/**
 * Background revalidation for single blog
 */
function revalidateBlogByIdInBackground(id: string): void {
  const entry = blogByIdCache.get(id);
  if (entry?.isRevalidating) return;

  if (entry) {
    entry.isRevalidating = true;
  }

  fetchBlogByIdFromAPI(id)
    .then((blog) => {
      blogByIdCache.set(id, {
        data: blog,
        timestamp: Date.now(),
        isRevalidating: false,
      });
    })
    .catch(() => {
      const existingEntry = blogByIdCache.get(id);
      if (existingEntry) {
        existingEntry.isRevalidating = false;
      }
    });
}

export const getBlogs = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number; page?: number }) => data)
  .handler(async ({ data }) => {
    const limit = data?.limit ?? 10;
    const page = data?.page ?? 1;
    const cacheKey = `blogs:${limit}:${page}`;
    const now = Date.now();

    try {
      const cached = blogsCache.get(cacheKey);

      if (cached) {
        const age = now - cached.timestamp;

        // Fresh cache - return immediately
        if (age < CACHE_TTL_MS) {
          return { data: cached.data, error: null };
        }

        // Stale but within max age - return stale, revalidate in background
        if (age < CACHE_STALE_TTL_MS) {
          revalidateBlogsInBackground(cacheKey, limit, page);
          return { data: cached.data, error: null };
        }
      }

      // No cache or too stale - fetch fresh data
      const blogs = await fetchBlogsFromAPI(limit, page);

      // Update cache
      blogsCache.set(cacheKey, {
        data: blogs,
        timestamp: now,
        isRevalidating: false,
      });

      return { data: blogs, error: null };
    } catch (error) {
      // On error, return stale cache if available (any age)
      const cached = blogsCache.get(cacheKey);
      if (cached) {
        return { data: cached.data, error: null };
      }
      return { data: null, error: String(error) };
    }
  });

export const getBlogById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { id } = data;
    const now = Date.now();

    try {
      const cached = blogByIdCache.get(id);

      if (cached) {
        const age = now - cached.timestamp;

        // Fresh cache
        if (age < CACHE_TTL_MS) {
          return { data: cached.data, error: null };
        }

        // Stale but acceptable - return and revalidate
        if (age < CACHE_STALE_TTL_MS) {
          revalidateBlogByIdInBackground(id);
          return { data: cached.data, error: null };
        }
      }

      // Fetch fresh
      const blog = await fetchBlogByIdFromAPI(id);

      blogByIdCache.set(id, {
        data: blog,
        timestamp: now,
        isRevalidating: false,
      });

      return { data: blog, error: null };
    } catch (error) {
      // Return stale on error
      const cached = blogByIdCache.get(id);
      if (cached) {
        return { data: cached.data, error: null };
      }
      return { data: null, error: String(error) };
    }
  });
