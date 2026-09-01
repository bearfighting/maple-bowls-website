import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/types";

const localeOpenGraph: Record<Locale, string> = { zh: "zh_CN", en: "en_CA", fr: "fr_CA" };

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getLocaleMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  noIndex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localizedPath = `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  const siteUrl = getSiteUrl();
  const canonical = new URL(localizedPath, siteUrl).toString();
  const alternates = Object.fromEntries(
    (Object.keys(localeOpenGraph) as Locale[]).map((alternateLocale) => [
      alternateLocale,
      new URL(`/${alternateLocale}${normalizedPath === "/" ? "" : normalizedPath}`, siteUrl).toString(),
    ]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...alternates,
        "x-default": new URL(`/zh${normalizedPath === "/" ? "" : normalizedPath}`, siteUrl).toString(),
      },
    },
    openGraph: { title, description, url: canonical, locale: localeOpenGraph[locale], type },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export async function getComingSoonMetadata(locale: Locale, section: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ComingSoon" });
  const sections = t.raw("sections") as Record<string, string>;
  const title = sections[section] ?? t("title", { section });
  return getLocaleMetadata({
    locale,
    path: `/${section}`,
    title,
    description: t("description", { section: title }),
    noIndex: true,
  });
}
