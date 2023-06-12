import "@styles/globals.css";
import React from "react";
import { Roboto } from "@next/font/google";
import Providers from "@ui/Providers";
import { cn } from "@lib/utils";
import Navbar from "@ui/(navbar)/Navbar";
import { ServerThemeProvider } from "next-themes";

const inter = Roboto({
  weight: ["100", "500", "300", "400"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html
        lang="en"
        className={cn(" text-slate-900 antialiased", inter.className)}
      >
        <body className="min-h-screen bg-sky-400/70 dark:bg-slate-900 antialiased relative">
          <Providers>
            <Navbar />
            <main>{children}</main>
          </Providers>

          {/* Add the inset box shadow */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="h-1/2 bg-gradient-to-t from-transparent to-sky-600 -z-10" />
          </div>

          {/* Allow more height for mobile menu on mobile */}
          <div className="max-md:h-10 hidden" />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
