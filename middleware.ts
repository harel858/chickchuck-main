import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { differenceInMonths } from "date-fns"; // A utility library for date operations

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, `1 h`),
});

export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname; //relative path
    /*     //manage rate limit
    if (pathName.startsWith("/api")) {
      const ip = req.ip ?? `127.0.0.1`;

      try {
        const { success } = await rateLimit.limit(ip);
        if (!success) return NextResponse.json({ error: "Too many request" });
        return NextResponse.next();
      } catch (error) {
        console.log("error", error);

        return NextResponse.json({ error: "Internal Server Error" });
      }
    } //Manage route protection
 */

    // Token retrieval
    const token = await getToken({ req });
    console.log("token", token);

    const isAuth = !!token;

    const isAuthPage = pathName.startsWith("/login");
    const sensetiveRoutes = [
      "/profile",
      "/schedule",
      "/treatments",
      "/team",
      "/activityTime",
    ];

    // Check if user is authenticated
    if (isAuth) {
      // Check if user is accessing the login page
      if (isAuthPage) {
        if (!token.businessId) {
          return NextResponse.redirect(
            new URL("/createbusinessdetails", req.url)
          );
        }
        return NextResponse.redirect(new URL("/schedule", req.url));
      }

      // Check if a month has passed since the user was created and if the user is on the FreeTier
      const userCreatedDate = new Date(token.createdAt || ""); // Assuming token contains createdAt
      const currentDate = new Date();
      const monthsDifference = differenceInMonths(currentDate, userCreatedDate);

      if (monthsDifference >= 1 && token.PremiumKits === "FreeTier") {
        if (pathName !== "/pricing") {
          return NextResponse.redirect(new URL("/pricing", req.url));
        }
      } else if (pathName === "/pricing") {
        return NextResponse.redirect(new URL("/schedule", req.url));
      }
    } else {
      // Handle unauthenticated users trying to access sensitive routes
      if (sensetiveRoutes.some((route) => pathName.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    return NextResponse.next();
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
    "/team",
    "/login",
    "/signup",
    "/api/:path*",
    "/createbusinessdetails",
    "/pricing",
  ],
};
