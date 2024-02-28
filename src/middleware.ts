import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
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
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
