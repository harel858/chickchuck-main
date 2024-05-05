import "@styles/globals.css";
import "antd/dist/reset.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@ui/Providers";
import { cn } from "@lib/utils";
import { ServerThemeProvider } from "next-themes";

const inter = Inter({
  weight: ["100", "500", "300", "400"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "PosaPoint - Efficient Queue Management System for Your Business",
  description:
    "Optimize your business operations with PosaPoint, a powerful Queue Management System designed to enhance your time management at the point of sale. Streamline customer service, reduce wait times, and boost efficiency.",
  keywords: [
    "queue management system",
    "point of sale",
    "time management",
    "business efficiency",
    "customer service",
    "queue app",
    "PosaPoint",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*     <ServerThemeProvider attribute="class" defaultTheme="system" enableSystem>
     */ <html lang="en" className="h-full">
      <body
        className={cn(
          "h-full font-sans bg-slate-300 dark:bg-slate-900 antialiased relative"
        )}
      >
        <Providers>
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">{children}</div>
          </main>
        </Providers>

        {/* Add the inset box shadow */}
        {/*    <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="h-screen bg-gradient-to-t from-transparent dark:to-slate-700/80 to-slate-300/40 -z-10" />
          </div> */}

        {/* Allow more height for mobile menu on mobile */}
        <div className="max-md:h-10" />
      </body>
    </html>
    /* </ServerThemeProvider> */
  );
}
