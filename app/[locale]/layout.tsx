// ייבוא סגנונות ורכיבים נדרשים
import "@styles/globals.css";
import "antd/dist/reset.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@ui/Providers";
import { cn } from "@lib/utils";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "i18n/routing";

const inter = Inter({
  weight: ["100", "300", "400", "500"],
  subsets: ["latin"],
});

// מטא-נתונים לאפליקציה, מתורגמים לעברית עם מידע נוסף על התכונות
export const metadata: Metadata = {
  title:
    "Quickline - אפליקציה לניהול תורים לעסקים עם סינכרון ליומן גוגל ותשלומים בביט",
  description:
    "שפרו את פעילות העסק שלכם עם Quickline - מערכת לניהול תורים שמסתנכרנת עם יומן גוגל ומאפשרת תשלומים באמצעות אפליקציית ביט. יצירת דף פרופיל עסקי לקביעת תורים כולל גלריה ותמונות, ייעול השירות ללקוחות, קיצור זמני ההמתנה ושיפור היעילות.",
  keywords: [
    "ניהול תורים",
    "סינכרון יומן גוגל",
    "תשלומים בביט",
    "נקודת מכירה",
    "ניהול זמן",
    "יעילות עסקית",
    "שירות לקוחות",
    "אפליקציה לתורים",
    "Quickline",
    "אתר פרופיל",
    "גלריה",
    "תמונות",
    "ניהול עסק",
    "תיאום פגישות",
    "מערכת לניהול תורים",
    "שירותי תשלום",
    "אפליקציה לעסקים",
  ],
  // הוספת תגיות מטא עבור שיתוף ברשתות חברתיות
  openGraph: {
    type: "website",
    url: "https://www.quickline.co.il",
    title: "Quickline - אפליקציה לניהול תורים לעסקים",
    description:
      "Quickline - אפליקציה לניהול תורים לעסקים, סינכרון ליומן גוגל ותשלומים בביט. יצירת אתר פרופיל עם גלריה ותמונות.",
    images: [
      {
        url: "https://www.quickline.co.il/images/quickline-banner.jpg",
        width: 800,
        height: 600,
        alt: "Quickline - אפליקציה לניהול תורים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@quickline",
    title: "Quickline - אפליקציה לניהול תורים לעסקים",
    description:
      "Quickline - אפליקציה לניהול תורים לעסקים, סינכרון ליומן גוגל ותשלומים בביט. יצירת אתר פרופיל עם גלריה ותמונות.",
  },
};

// רכיב RootLayout שמבנה את פריסת האפליקציה
export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log("routing", routing);
  console.log("locale", locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <head>
        {/* תגי מטא נוספים עבור מנועי חיפוש */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Quickline Team" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Quickline - אפליקציה לניהול תורים לעסקים"
        />
        <meta
          name="google-site-verification"
          content="UwBjA4x4fOqKSdObmZpp5tFVPlYYnruq6UyauUptye0"
        />
        <meta
          property="og:description"
          content="Quickline - אפליקציה לניהול תורים לעסקים, סינכרון ליומן גוגל ותשלומים בביט. יצירת אתר פרופיל עם גלריה ותמונות."
        />
        <meta property="og:url" content="https://www.quickline.co.il" />
        <meta
          property="og:image"
          content="https://www.quickline.co.il/images/quickline-banner.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@quickline" />
        <meta
          property="twitter:title"
          content="Quickline - אפליקציה לניהול תורים לעסקים"
        />
        <meta
          property="twitter:description"
          content="Quickline - אפליקציה לניהול תורים לעסקים, סינכרון ליומן גוגל ותשלומים בביט. יצירת אתר פרופיל עם גלריה ותמונות."
        />
        <meta
          property="twitter:image"
          content="https://www.quickline.co.il/images/quickline-banner.jpg"
        />
        {/* קישור לאתר */}
        <link rel="canonical" href="https://www.quickline.co.il" />
      </head>
      <body
        className={cn("h-full font-sans bg-slate-900 antialiased relative")}
      >
        {" "}
        {/* עטיפת תוכן ראשי עם Providers לניהול מצב גלובלי ותמיכת תמה */}
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <main className="relative flex flex-col min-h-screen">
              {/* אזור התוכן המרכזי */}
              <div className="flex-grow flex-1">{children}</div>
            </main>
          </Providers>
        </NextIntlClientProvider>
        {/* ריווח עבור תפריט נייד */}
        <div className="max-md:h-10" />
      </body>
    </html>
  );
}
