import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getLocalizedText, getProductsWithBrands } from "@/lib/content";
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
  const statusLabels = t.raw("status") as Record<"draft" | "verified", string>;
  const products = getProductsWithBrands();

  return (
    <SectionContainer>
      <Breadcrumb
        label={navigation("primary")}
        items={[{ label: navigation("home"), href: "/" }, { label: t("foodTitle") }]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("product")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("foodTitle")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("foodDescription")}</p>
      {products.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map(({ product: item, brand }) => (
            <ProductCard
              key={item.id}
              product={item}
              brandName={getLocalizedText(brand.name, locale)}
              locale={locale}
              labels={{ species, foodType, status: statusLabels }}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("empty")}</p>
      )}
    </SectionContainer>
  );
}
