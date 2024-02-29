import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";
import { db } from "../config/db";
import { users, InsertUser } from "../config/schema";

export async function getUserById({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function updateUserPartial(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Please provide a user id" },
      { status: 404 }
    );
  }

  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  const clerkUser = await clerkClient.users.updateUser(id, data);

  return NextResponse.json(clerkUser, { status: 200 });
}

// Sync Clerk user to neon
export const SyncUser = async (userInfo: InsertUser) => {
  if (!userInfo) {
    throw new Error("No user info provided");
  }

  const result = await db
    .insert(users)
    .values(userInfo)
    .onConflictDoUpdate({
      target: users.external_id,
      set: {
        name: userInfo.name,
        email: userInfo.email,
        avatar_url: userInfo.avatar_url,
        updated_at: new Date(),
      },
    });

  // eslint-disable-next-line no-console
  console.log("SyncUser result:", result);
};
