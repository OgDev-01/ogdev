import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import { uploadImage } from "@/backend/utils/cloudinary";
import { db } from "../config/db";
import { InsertProject, projects } from "../config/schema";
import { slugifyText } from "../utils/slugify";
import { validateProject } from "../utils/validateProject";

export async function getAllProjects(limit: string) {
  const projectsArray = await db
    .select()
    .from(projects)
    .where(sql`${projects.deleted_at} IS NULL`)
    .limit(parseInt(limit))
    .orderBy(sql`created_at DESC`);

  return projectsArray;
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
  const remoteImageObj = (await uploadImage(buffer, filename)) as any;

  const { title, subtitle, tags, content } = data;

  const payload = {
    title,
    subtitle,
    tags,
    content,
    cover_image: remoteImageObj.url,
    project_link: data.project_link,
    start_date: new Date(data.start_date as string),
    end_date: new Date(data.end_date as string),
    user_id: 1,
    slug,
  } as InsertProject;

  const project = await db.insert(projects).values(payload).returning();

  return NextResponse.json(
    { message: "Project created", data: project },
    { status: 201 }
  );
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

  return NextResponse.json(
    {
      data: project[0],
    },
    { status: 200 }
  );
}

export async function getProjectBySlug(slug: string) {
  const project = await db
    .select()
    .from(projects)
    .where(sql`${projects.slug} = ${slug} AND ${projects.deleted_at} IS NULL`);

  return project[0];
}

export async function updateProject(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  const slug = params.slug;

  const file = data.cover_image as File;

  let remoteImageObj = null;

  if (file.name !== "undefined") {
    const filename = `${Date.now().toString(36)}-${file.name.replace(/\..+$/, "")}-${Math.random().toString(36).substr(2, 9)}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    remoteImageObj = (await uploadImage(buffer, filename)) as any;
  }
  const { title, subtitle, tags, content } = data;

  const payload = {
    title,
    subtitle,
    tags,
    content,
    project_link: data.project_link,
    start_date: new Date(data.start_date as string),
    end_date: new Date(data.end_date as string),
  } as InsertProject;
  if (remoteImageObj) {
    payload.cover_image = remoteImageObj.url;
  }

  const project = await db
    .update(projects)
    .set(payload)
    .where(sql`${projects.slug} = ${slug}`)
    .returning();

  return NextResponse.json(
    { message: "Project updated", data: project },
    { status: 200 }
  );
}

export async function deleteProject(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const project = await db
    .update(projects)
    .set({ deleted_at: new Date() })
    .where(sql`${projects.slug} = ${slug}`)
    .returning();

  return NextResponse.json(
    { message: "Project deleted", data: project },
    { status: 200 }
  );
}
