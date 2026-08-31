import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";

export function getLocaleOrNotFound(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value as Locale;
}
