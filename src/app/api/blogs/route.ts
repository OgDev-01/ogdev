import { NextRequest, NextResponse } from "next/server";

const devToApi = process.env.DEV_TO_API_URL ?? "";
const devToApiKey = process.env.DEV_TO_API_KEY ?? "";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") ?? "10";
  const page = searchParams.get("page") ?? "1";

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

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return new Response("No blog found", {
      status: 404,
    });
  }
}
