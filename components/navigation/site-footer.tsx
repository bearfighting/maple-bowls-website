import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import type { Locale } from "@/lib/types";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <Link
            href="/"
            className="rounded-sm font-display text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          >
            Maple Bowl
          </Link>
          <p className="mt-2 max-w-sm text-sm text-primary-foreground/75">{t("tagline")}</p>
        </div>
        <div className="flex gap-4 text-sm text-primary-foreground/80">
          <Link
            href="/about"
            className="rounded-sm hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          >
            {t("about")}
          </Link>
          <Link
            href="/methodology"
            className="rounded-sm hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          >
            {t("methodology")}
          </Link>
          <Link
            href="/privacy"
            className="rounded-sm hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          >
            {t("privacy")}
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <LanguageSwitcher currentLocale={locale} ariaLabel={t("language")} />
          <p className="text-xs text-primary-foreground/60">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
