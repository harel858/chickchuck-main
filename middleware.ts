export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home/:path*",
    "/schedule/:path*",
    "/treatments/:path*",
    "/activityTime/:path*",
  ],
};
