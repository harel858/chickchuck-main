import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, `1 h`),
});

export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname; //relative path

    //manage rate limit
    if (pathName.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";

      try {
        const { success } = await rateLimit.limit(ip);
        if (!success) return NextResponse.json({ error: "Too many request" });
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    } //Manage route protection

    const token = await getToken({ req });
    const isAuth = token?.UserRole === "RECIPIENT";

    const isAuthPage = pathName.startsWith("/signin");
    const sensetiveRoutes = [
      "/profile",
      "/schedule",
      "/treatments",
      "/activityTime",
    ];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
      return null;
    }
    if (!isAuth && sensetiveRoutes.some((route) => pathName.startsWith(route)))
      return NextResponse.redirect(new URL("/signin", req.url));
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);
export const config = {
  matcher: [
    "/:path*",
    "/profile",
    "/schedule",
    "/treatments",
    "/activityTime",
    "/signin",
    "/signup",
    "/api/:path*",
  ],
};
