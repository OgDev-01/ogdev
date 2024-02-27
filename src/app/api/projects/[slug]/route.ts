import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { getProjectBySlug } from "@/backend/model/projects";

interface RequestContext {
  params: {
    slug: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(async (req, { params }) => {
  return getProjectBySlug({ params });
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
