import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ContentStatusBadge } from "@/components/content/content-status-badge";
import { ProductCard } from "@/components/product/product-card";
import { SectionContainer } from "@/components/ui/section-container";
import { getBrandBySlug, getBrandWithProducts, getBrands, getLocalizedText } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import { getLocaleMetadata } from "@/lib/metadata";
import type { FoodType, Species } from "@/lib/types";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => getBrands().map((brand) => ({ locale, slug: brand.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  return getLocaleMetadata({
    locale,
    path: `/brands/${slug}`,
    title: getLocalizedText(brand.name, locale),
    description: getLocalizedText(brand.description, locale),
    noIndex: brand.status === "draft",
  });
}

export default async function BrandDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const result = getBrandWithProducts(slug);
  if (!result) notFound();
  const { brand, products } = result;
  const t = await getTranslations("Content");
  const product = await getTranslations("Product");
  const statusLabels = t.raw("status") as Record<"draft" | "verified", string>;
  const species = product.raw("species") as Record<Species, string>;
  const foodType = product.raw("foodType") as Record<FoodType, string>;

  return (
    <SectionContainer>
      <Breadcrumb
        label={t("brand")}
        items={[
          { label: "Maple Bowl", href: "/" },
          { label: t("brandsTitle"), href: "/brands" },
          { label: getLocalizedText(brand.name, locale) },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("brand")}</p>
      <div className="mt-3">
        <ContentStatusBadge status={brand.status} labels={statusLabels} />
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {getLocalizedText(brand.name, locale)}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        {getLocalizedText(brand.description, locale)}
      </p>
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold">{t("productsTitle")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {products.map(({ product: item }) => (
            <ProductCard
              key={item.id}
              product={item}
              brandName={getLocalizedText(brand.name, locale)}
              locale={locale}
              labels={{ species, foodType, status: statusLabels }}
            />
          ))}
        </div>
      </section>
    </SectionContainer>
  );
}
