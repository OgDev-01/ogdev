import { NextHandler } from "next-connect";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function AuthGuard(req: NextRequest, next: NextHandler) {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY ?? "";
  const cookieStore = cookies();
  const token = req.headers.get("Authorization")?.split(" ")[1] ?? "";
  const sessionToken = cookieStore.get("__session")?.value ?? "";

  if (!token && !sessionToken) {
    return NextResponse.json(
      { error: "Unauthorized", message: "No token is provided" },
      { status: 401 }
    );
  }

  try {
    if (token) {
      jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    } else {
      jwt.verify(sessionToken, publicKey);
    }

    await next();
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export default AuthGuard;
