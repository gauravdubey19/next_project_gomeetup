import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isIgnoredRoutes = createRouteMatcher(["/sign-in", "/sign-up"]);
const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recodings",
  "/personal-room",
  "/meeting(.*)",
]);
export default clerkMiddleware((auth, req) => {
  // if (!isIgnoredRoutes(req)) auth().protect();
  if (protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
