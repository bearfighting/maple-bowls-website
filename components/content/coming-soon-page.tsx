import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Link } from "@/i18n/navigation";

export type ComingSoonSection =
  | "nutritionGuide"
  | "reviews"
  | "brands"
  | "recipes"
  | "videos"
  | "tools"
  | "search"
  | "about"
  | "methodology"
  | "privacy";

export async function ComingSoonPage({ section }: { section: ComingSoonSection }) {
  const t = await getTranslations("ComingSoon");
  const labels = t.raw("sections") as Record<ComingSoonSection, string>;
  const label = labels[section];

  return (
    <SectionContainer className="flex min-h-[60vh] flex-col justify-center">
      <Breadcrumb label={t("breadcrumb")} items={[{ label: t("home"), href: "/" }, { label }]} />
      <div className="max-w-2xl">
        <Badge variant="secondary">{t("badge")}</Badge>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title", { section: label })}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          {t("backHome")}
        </Link>
      </div>
    </SectionContainer>
  );
}
