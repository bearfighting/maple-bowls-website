import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/content/product-card";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getBrands, getLocalizedText, getProducts } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import type { FoodType, Species } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Content" });
  return { title: t("foodTitle"), description: t("foodDescription") };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FoodPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations("Content");
  const navigation = await getTranslations("Navigation");
  const product = await getTranslations("Product");
  const species = product.raw("species") as Record<Species, string>;
  const foodType = product.raw("foodType") as Record<FoodType, string>;
  const brands = getBrands();
  const products = getProducts();

  return (
    <SectionContainer>
      <Breadcrumb label={navigation("primary")} items={[{ label: navigation("home"), href: "/" }, { label: t("foodTitle") }]} />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("product")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("foodTitle")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("foodDescription")}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          const brand = brands.find((candidate) => candidate.id === item.brandId);
          return brand ? <ProductCard key={item.id} product={item} brandName={getLocalizedText(brand.name, locale)} locale={locale} labels={{ species, foodType }} /> : null;
        })}
      </div>
    </SectionContainer>
  );
}
