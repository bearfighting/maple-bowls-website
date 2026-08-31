import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";

const locales: Array<{ value: Locale; label: string }> = [
  { value: "zh", label: "简中" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1 rounded-full border bg-card p-1">
      {locales.map((locale) => (
        <Link
          key={locale.value}
          href="/"
          locale={locale.value}
          aria-current={currentLocale === locale.value ? "page" : undefined}
          className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors ${
            currentLocale === locale.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {locale.label}
        </Link>
      ))}
    </nav>
  );
}
