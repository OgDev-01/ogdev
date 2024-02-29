import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/config/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const users = await db.query.users.findMany();

  if (users.length === 0) {
    return new Response("No users found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(users), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
