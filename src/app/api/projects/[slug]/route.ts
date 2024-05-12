import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteProject,
  getProjectBySlug,
  updateProject,
} from "@/backend/model/projects";
import AuthGuard from "@/backend/middlesware/auth-guard";

interface RequestContext {
  params: {
    slug: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
  .get(async (req, { params }) => {
    return getProjectBySlug({ params });
  })
  .use((req, res, next) => {
    return AuthGuard(req, next);
  })
  .patch(async (req, { params }) => {
    return updateProject(req, { params });
  })
  .delete(async (req, { params }) => {
    return deleteProject(req, { params });
  });

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function PATCH(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<NextResponse>;
}
