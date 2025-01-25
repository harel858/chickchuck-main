import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { differenceInMonths } from "date-fns";
import createMiddleware from "next-intl/middleware";
import { routing } from "src/i18n/routing";

// Apply i18n and authentication middleware together
const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

const middleware = withAuth(
  async function (req) {
    const pathName = req.nextUrl.pathname;

    // Apply rate limiting for API routes
    if (pathName.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await rateLimit.limit(ip);
        if (!success) return NextResponse.json({ error: "Too many requests" });
      } catch (error) {
        console.error("Rate limiting error", error);
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathName.startsWith("/login");
    const sensitiveRoutes = [
      "/(en|he)/profile",
      "/(en|he)/schedule",
      "/(en|he)/treatments",
      "/(en|he)/team",
      "/(en|he)/activityTime",
    ];

    if (isAuth) {
      if (isAuthPage) {
        if (!token.businessId) {
          return NextResponse.redirect(
            new URL("/createbusinessdetails", req.url)
          );
        }
        return NextResponse.redirect(new URL("/schedule", req.url));
      }

      const userCreatedDate = new Date(token.createdAt || "");
      const currentDate = new Date();
      const monthsDifference = differenceInMonths(currentDate, userCreatedDate);

      if (monthsDifference >= 1 && token.PremiumKits === "FreeTier") {
        if (pathName !== "/pricing") {
          return NextResponse.redirect(new URL("/pricing", req.url));
        }
      } else if (pathName === "/pricing") {
        return NextResponse.redirect(new URL("/schedule", req.url));
      }
    } /* else {
      if (sensitiveRoutes.some((route) => pathName.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } */

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

export default createMiddleware({
  locales: ["en", "he"], // Supported locales
  defaultLocale: "en", // Default fallback
  localeDetection: true, // Automatically detect locale from the URL
}); // Export i18n separately

export const config = {
  matcher: [
    "/(en|he)/:path*",
    "/(en|he)/api/:path*",
    "/(en|he)/profile",
    "/(en|he)/schedule",
    "/(en|he)/treatments",
    "/(en|he)/team",
    "/(en|he)/activityTime",
    "/(en|he)/login",
    "/(en|he)/signup",
    "/(en|he)/createbusinessdetails",
    "/(en|he)/pricing",
  ],
};
