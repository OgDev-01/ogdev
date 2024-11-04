import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/api/webhooks(.*)",
  "/api/users(.*)",
  "/api/blogs(.*)",
  "/api/projects(.*)",
  "/projects(.*)",
  "/blog(.*)",
  "blogs(.*)",
  "/about",
  "/contact",
  "/snippets",
  "/__nextjs_original-stack-frame",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  if (publicRoutes(req)) userId;
  if (!userId && !publicRoutes(req)) redirectToSignIn();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
