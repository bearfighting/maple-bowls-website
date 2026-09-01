import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { EditorialCallout } from "@/components/content/editorial-callout";
import { IngredientList } from "@/components/product/ingredient-list";
import { NutritionTable } from "@/components/product/nutrition-table";
import { RelatedContent } from "@/components/content/related-content";
import { SourceList } from "@/components/content/source-list";
import { FoodDirectory } from "@/components/product/food-directory";
import { SectionContainer } from "@/components/ui/section-container";
import {
  getLocalizedText,
  getProductBySlug,
  getProductWithBrand,
  getProducts,
  getProductsWithBrands,
} from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import type { FoodType, Locale, Species } from "@/lib/types";
import { getLocaleMetadata } from "@/lib/metadata";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, slug: "dog" },
    { locale, slug: "cat" },
    ...getProducts().map((product) => ({ locale, slug: product.slug })),
  ]);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  if (slug === "dog" || slug === "cat") {
    const t = await getTranslations({ locale, namespace: "Content" });
    const labels = await getTranslations({ locale, namespace: "Product" });
    const speciesLabels = labels.raw("species") as Record<Species, string>;
    return getLocaleMetadata({
      locale,
      path: `/food/${slug}`,
      title: `${speciesLabels[slug]} · ${t("foodTitle")}`,
      description: t("foodDescription"),
    });
  }
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return getLocaleMetadata({
    locale,
    path: `/food/${slug}`,
    title: getLocalizedText(product.name, locale),
    description: getLocalizedText(product.description, locale),
  });
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  if (slug === "dog" || slug === "cat") return <SpeciesFoodPage locale={locale} species={slug} />;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const result = getProductWithBrand(slug);
  if (!result) notFound();
  const { brand, ingredients } = result;
  const t = await getTranslations("Content");
  const labels = await getTranslations("Product");
  const species = labels.raw("species") as Record<Species, string>;
  const foodType = labels.raw("foodType") as Record<FoodType, string>;
  const lifeStages = labels.raw("lifeStages") as Record<string, string>;
  const sourceLabels = {
    title: labels("sourcesTitle"),
    manufacturer: labels("manufacturer"),
    official: labels("official"),
    editorial: labels("editorial"),
    accessed: labels("accessed"),
    lastVerified: labels("lastVerified"),
  };
  const related = [
    ...ingredients
      .filter((item) => item.ingredient)
      .map((item) => ({
        href: "/ingredients/" + item.ingredient!.slug,
        label: getLocalizedText(item.item.name, locale),
      })),
    { href: "/nutrition-guide", label: t("nutritionTitle") },
  ];

  return (
    <SectionContainer>
      <Breadcrumb
        label={t("product")}
        items={[
          { label: "Maple Bowl", href: "/" },
          { label: t("foodTitle"), href: "/food" },
          { label: getLocalizedText(product.name, locale) },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
        {getLocalizedText(brand.name, locale)}
      </p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {getLocalizedText(product.name, locale)}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        {getLocalizedText(product.description, locale)}
      </p>
      <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
        {product.species.map((item) => (
          <span key={item} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
            {species[item]}
          </span>
        ))}
        <span className="rounded-full border border-border px-3 py-1">
          {foodType[product.foodType] ?? product.foodType}
        </span>
        {product.lifeStages.map((stage) => (
          <span key={stage} className="rounded-full border border-border px-3 py-1">
            {lifeStages[stage] ?? stage}
          </span>
        ))}
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold">{labels("factsTitle")}</h2>
            <div className="mt-4">
              <NutritionTable
                facts={product.nutritionFacts}
                locale={locale}
                labels={{
                  nutrient: labels("nutrient"),
                  value: labels("value"),
                  qualifier: { minimum: labels("minimum"), maximum: labels("maximum"), typical: labels("typical") },
                  valueMissing: labels("valueMissing"),
                }}
              />
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">{labels("ingredientsTitle")}</h2>
            <div className="mt-4">
              <IngredientList ingredients={ingredients} locale={locale} unknownLabel={labels("noIngredients")} />
            </div>
          </section>
          <RelatedContent title={t("related")} links={related} />
        </div>
        <div className="space-y-8">
          <EditorialCallout
            title={labels("notesTitle")}
            body={product.mapleBowlNotes}
            locale={locale}
            draftLabel={product.status === "draft" ? labels("draft") : undefined}
          />
          <SourceList sources={product.sources} labels={sourceLabels} lastVerifiedAt={product.lastVerifiedAt} />
        </div>
      </div>
    </SectionContainer>
  );
}

async function SpeciesFoodPage({ locale, species: selectedSpecies }: { locale: Locale; species: Species }) {
  const t = await getTranslations({ locale, namespace: "Content" });
  const labels = await getTranslations({ locale, namespace: "Product" });
  const products = getProductsWithBrands().map(({ product, brand }) => ({
    product,
    brandName: getLocalizedText(brand.name, locale),
  }));
  return (
    <SectionContainer>
      <Breadcrumb
        label={t("product")}
        items={[
          { label: (labels.raw("species") as Record<Species, string>)[selectedSpecies] },
          { label: t("foodTitle") },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("product")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {(labels.raw("species") as Record<Species, string>)[selectedSpecies]} · {t("foodTitle")}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("foodDescription")}</p>
      <FoodDirectory
        products={products}
        locale={locale}
        emptyLabel={t("empty")}
        labels={{
          species: labels.raw("species") as Record<Species, string>,
          foodType: labels.raw("foodType") as Record<FoodType, string>,
          lifeStages: labels.raw("lifeStages") as Record<string, string>,
          status: t.raw("status") as Record<"draft" | "verified", string>,
        }}
        initialSpecies={selectedSpecies}
      />
    </SectionContainer>
  );
}
