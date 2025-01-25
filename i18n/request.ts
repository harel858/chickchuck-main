import { getRequestConfig, setRequestLocale } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  console.log("Received requestLocale:", await requestLocale); // Add this for debugging

  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  console.log("locale", locale);
  if (locale) setRequestLocale(locale);

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
