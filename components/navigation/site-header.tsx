import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { PetPreference } from "@/components/navigation/pet-preference";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations("Navigation");
  const links = [
    { href: "/search", label: t("search") },
    { href: "/nutrition-guide", label: t("nutritionGuide") },
    { href: "/reviews", label: t("reviews") },
    { href: "/brands", label: t("brands") },
    { href: "/recipes", label: t("recipes") },
    { href: "/videos", label: t("videos") },
    { href: "/tools", label: t("tools") },
  ] as const;

  return (
    <header className="border-b border-border/70 bg-background/95">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo homeLabel={t("home")} />
        <nav aria-label={t("primary")} className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm font-semibold text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <PetPreference />
          <MobileMenu menuLabel={t("menu")} title={t("menuTitle")} closeLabel={t("closeMenu")} links={links} />
          <LanguageSwitcher currentLocale={locale} ariaLabel={t("language")} />
        </div>
      </div>
    </header>
  );
}
