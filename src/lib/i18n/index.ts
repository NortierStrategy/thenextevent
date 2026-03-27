export type Locale = "fr" | "en";
export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export type Dictionary = typeof import("./fr").default;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "en":
      return (await import("./en")).default;
    case "fr":
    default:
      return (await import("./fr")).default;
  }
}
