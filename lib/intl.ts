export const defaultLocale = "en";
export const locales = ["en", "he"];

export function getLocaleFromRequest(req: any): string {
  const locale = req.headers["accept-language"]?.split(",")[0].split("-")[0];
  return locales.includes(locale) ? locale : defaultLocale;
}
