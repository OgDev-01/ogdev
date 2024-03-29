import { NextResponse } from "next/server";

export const validateProject = (project: any) => {
  if (!project.title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  if (!project.cover_image) {
    return NextResponse.json(
      { message: "Cover image is required" },
      { status: 400 }
    );
  }

  if (!project.project_link) {
    return NextResponse.json(
      { message: "Project link is required" },
      { status: 400 }
    );
  }

  if (!project.start_date) {
    return NextResponse.json(
      { message: "Start date is required" },
      { status: 400 }
    );
  }

  if (!project.end_date) {
    return NextResponse.json(
      { message: "End date is required" },
      { status: 400 }
    );
  }

  if (!project.content) {
    return NextResponse.json(
      { message: "Content is required" },
      { status: 400 }
    );
  }

  return true;
};
