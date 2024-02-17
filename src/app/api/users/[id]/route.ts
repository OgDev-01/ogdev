import { createEdgeRouter } from "next-connect";

import { NextRequest, NextResponse } from "next/server";

import { getUserById, updateUserPartial } from "@/backend/model/users";
import AuthGuard from "@/backend/middlesware/auth-guard";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use((req, res, next) => AuthGuard(req, next));

// Get user by id
router.get(async (request, { params }) => {
  return getUserById({ params });
});

// Update user by id
router.patch(async (request, { params }) => {
  return updateUserPartial(request, { params });
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function PATCH(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<NextResponse>;
}
