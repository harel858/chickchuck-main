export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home/:path*", "/schedule/:path*", "/settings/:path*"],
};
