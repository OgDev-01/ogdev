import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

import { createProject } from "@/backend/model/projects";
import AuthGuard from "@/backend/middlesware/auth-guard";

const router = createEdgeRouter<NextRequest, NextResponse>();

router.use((req, res, next) => AuthGuard(req, next));

router.post((req, res, next) => {
  return createProject(req);
});

export async function POST(req: NextRequest, res: NextResponse) {
  return router.run(req, res);
}
