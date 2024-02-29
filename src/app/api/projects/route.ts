import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

import { createProject, getAllProjects } from "@/backend/model/projects";
import AuthGuard from "@/backend/middlesware/auth-guard";

const router = createEdgeRouter<NextRequest, NextResponse>();

router
  .get((req, res) => {
    return getAllProjects(req);
  })
  .use((req, res, next) => AuthGuard(req, next))
  .post((req, res, next) => {
    return createProject(req, res);
  });

export async function POST(req: NextRequest, res: NextResponse) {
  return router.run(req, res) as Promise<NextResponse>;
}

export async function GET(req: NextRequest, res: NextResponse) {
  return router.run(req, res) as Promise<NextResponse>;
}
