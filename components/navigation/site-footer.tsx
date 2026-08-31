import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="font-display text-2xl font-bold">Maple Bowl</Link>
          <p className="mt-2 max-w-sm text-sm text-primary-foreground/75">{t("tagline")}</p>
        </div>
        <div className="flex gap-4 text-sm text-primary-foreground/80">
          <Link href="/about" className="hover:text-primary-foreground">{t("about")}</Link>
          <Link href="/methodology" className="hover:text-primary-foreground">{t("methodology")}</Link>
          <Link href="/privacy" className="hover:text-primary-foreground">{t("privacy")}</Link>
        </div>
        <p className="text-xs text-primary-foreground/60">{t("copyright")}</p>
      </div>
    </footer>
  );
}
