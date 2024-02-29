import { NextRequest, NextResponse } from "next/server";

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
      cache: "no-cache",
    });

    const data = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return new Response("No blogs found", {
      status: 404,
    });
  }
}
