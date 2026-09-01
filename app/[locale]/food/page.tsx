import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FoodDirectory } from "@/components/product/food-directory";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getLocalizedText, getProductsWithBrands } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import type { FoodType, LifeStage, Species } from "@/lib/types";
import { getLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Content" });
  return getLocaleMetadata({ locale, path: "/food", title: t("foodTitle"), description: t("foodDescription") });
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function isFoodType(value: string): value is FoodType {
  return ["dry", "wet", "raw", "freeze-dried", "air-dried", "dehydrated", "fresh", "treat", "topper", "other"].includes(
    value,
  );
}

function isLifeStage(value: string): value is LifeStage {
  return ["all-life-stages", "puppy", "adult", "senior"].includes(value);
}

export default async function FoodPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations("Content");
  const navigation = await getTranslations("Navigation");
  const product = await getTranslations("Product");
  const species = product.raw("species") as Record<Species, string>;
  const foodType = product.raw("foodType") as Record<FoodType, string>;
  const statusLabels = t.raw("status") as Record<"draft" | "verified", string>;
  const search = (await searchParams) ?? {};
  const initialSpecies = search.species === "dog" || search.species === "cat" ? search.species : "all";
  const initialFoodType = typeof search.foodType === "string" && isFoodType(search.foodType) ? search.foodType : "all";
  const initialLifeStage =
    typeof search.lifeStage === "string" && isLifeStage(search.lifeStage) ? search.lifeStage : "all";
  const products = getProductsWithBrands().map(({ product: item, brand }) => ({
    product: item,
    brandName: getLocalizedText(brand.name, locale),
  }));

  return (
    <SectionContainer>
      <Breadcrumb
        label={navigation("primary")}
        items={[{ label: navigation("home"), href: "/" }, { label: t("foodTitle") }]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("product")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("foodTitle")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("foodDescription")}</p>
      <FoodDirectory
        products={products}
        locale={locale}
        emptyLabel={t("empty")}
        labels={{
          species,
          foodType,
          lifeStages: product.raw("lifeStages") as Record<string, string>,
          status: statusLabels,
        }}
        initialSpecies={initialSpecies}
        initialFoodType={initialFoodType}
        initialLifeStage={initialLifeStage}
      />
    </SectionContainer>
  );
}
