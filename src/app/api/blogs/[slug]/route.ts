import { NextRequest } from "next/server";

const devToApi = process.env.DEV_TO_API_URL ?? "";
const devToApiKey = process.env.DEV_TO_API_KEY ?? "";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const response = await fetch(`${devToApi}/articles/${slug}`, {
      headers: {
        "api-key": devToApiKey,
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (e) {
    return new Response("No blogs found", {
      status: 404,
    });
  }
}
