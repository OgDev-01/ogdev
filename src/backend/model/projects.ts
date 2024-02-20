import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

import { uploadImage } from "@/backend/utils/cloudinary";
import { db } from "../config/db";
import { projects } from "../config/schema";
import { slugifyText } from "../utils/slugify";
import { validateProject } from "../utils/validateProject";

export async function getAllProjects() {
  const blogArray = await db
    .select()
    .from(projects)
    .where(sql`${projects.deleted_at} IS NULL`)
    .orderBy(sql`created_at DESC`);

  return NextResponse.json(blogArray, { status: 200 });
}

export async function createProject(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  validateProject(data);

  const slug = slugifyText(data.title as string);
  const file = data.cover_image as File;

  const filename = `${Date.now().toString(36)}-${file.name.replace(/\..+$/, "")}-${Math.random().toString(36).substr(2, 9)}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const remoteImageObj = await uploadImage(buffer, filename);

  const { title, subtitle, tags, content } = data;

  const user = await currentUser();

  // eslint-disable-next-line no-console

  return NextResponse.json({ message: "Project created" }, { status: 201 });
}

export async function getProjectById({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  const project = await db
    .select()
    .from(projects)
    .where(sql`${projects.id} = ${id} AND ${projects.deleted_at} IS NULL`);

  if (!project) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

export async function getProjectBySlug({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  const project = await db
    .select()
    .from(projects)
    .where(sql`${projects.slug} = ${slug} AND ${projects.deleted_at} IS NULL`);

  if (!project) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

export async function updateProject(req: NextRequest) {}

export async function deleteProject(req: NextRequest) {}
