import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BrandCard } from "@/components/content/brand-card";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getBrands } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import { getLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Content" });
  return getLocaleMetadata({ locale, path: "/brands", title: t("brandsTitle"), description: t("brandsDescription") });
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations("Content");
  const navigation = await getTranslations("Navigation");
  const labels = await getTranslations("Content");
  const items = getBrands();
  const statusLabels = labels.raw("status") as Record<"draft" | "verified", string>;

  return (
    <SectionContainer>
      <Breadcrumb
        label={navigation("primary")}
        items={[{ label: navigation("home"), href: "/" }, { label: t("brandsTitle") }]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("brand")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("brandsTitle")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("brandsDescription")}</p>
      {items.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((brand) => (
            <BrandCard key={brand.id} brand={brand} locale={locale} statusLabels={statusLabels} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("empty")}</p>
      )}
    </SectionContainer>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
