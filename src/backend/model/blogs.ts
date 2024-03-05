const devToApi = process.env.DEV_TO_API_URL ?? "";
const devToApiKey = process.env.DEV_TO_API_KEY ?? "";

interface Query {
  limit?: string;
  page?: string;
}
export async function getAllBlogs(queryParams: Query) {
  const { limit = "10", page = "1" } = queryParams;

  const query = new URLSearchParams();

  query.set("per_page", limit);
  query.set("page", page);

  const baseEndpoint = "articles/me/published";
  try {
    const response = await fetch(`${devToApi}/${baseEndpoint}?${query}`, {
      headers: {
        "api-key": devToApiKey,
      },
      cache: "no-cache",
    });
    const data = await response.json();

    return data as DEVBlogs[];
  } catch (e) {
    //eslint-disable-next-line no-console
    console.error(e);
  }
}

export async function getBlogById(id: string) {
  try {
    const response = await fetch(`${devToApi}/articles/${id}`, {
      headers: {
        "api-key": devToApiKey,
      },
      cache: "no-cache",
    });

    const data = await response.json();

    return data as DEVBlogs;
  } catch (e) {
    //eslint-disable-next-line no-console
    console.error(e);
  }
}
