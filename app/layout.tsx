import "@styles/globals.css";
import React from "react";
import { Inter, Roboto } from "@next/font/google";
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
        <body className="min-h-screen bg-sky-300 dark:bg-slate-900 antialiased">
          <Providers>
            {/* @ts-expect-error Server Component */}
            <Navbar />

            <main>{children}</main>
          </Providers>

          {/*Allow more height for mobile menu on mobile*/}
          <div className="h-40 md:hidden" />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
