import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ContentStatusBadge } from "@/components/content/content-status-badge";
import { RelatedContent } from "@/components/content/related-content";
import { SourceList } from "@/components/content/source-list";
import { SectionContainer } from "@/components/ui/section-container";
import { getIngredients, getIngredientWithProducts, getLocalizedText } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => getIngredients().map((ingredient) => ({ locale, slug: ingredient.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const result = getIngredientWithProducts(slug);
  if (!result) notFound();
  const { ingredient } = result;
  return getLocaleMetadata({
    locale,
    path: `/ingredients/${slug}`,
    title: getLocalizedText(ingredient.name, locale),
    description: getLocalizedText(ingredient.description, locale),
    noIndex: ingredient.status === "draft",
  });
}

export default async function IngredientDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const result = getIngredientWithProducts(slug);
  if (!result) notFound();
  const { ingredient, products: relatedProducts } = result;
  const t = await getTranslations("Content");
  const labels = await getTranslations("Product");
  const ingredientLabels = await getTranslations("Ingredient");
  const statusLabels = t.raw("status") as Record<"draft" | "verified", string>;

  return (
    <SectionContainer>
      <Breadcrumb
        label={t("ingredient")}
        items={[
          { label: "Maple Bowl", href: "/" },
          { label: t("ingredientsTitle"), href: "/food" },
          { label: getLocalizedText(ingredient.name, locale) },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("ingredient")}</p>
      <div className="mt-3">
        <ContentStatusBadge status={ingredient.status} labels={statusLabels} />
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {getLocalizedText(ingredient.name, locale)}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        {getLocalizedText(ingredient.description, locale)}
      </p>
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {ingredient.aliases.map((alias) => (
          <span key={alias} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
            {alias}
          </span>
        ))}
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <RelatedContent
          title={ingredientLabels("usedIn")}
          links={relatedProducts.map(({ product, brand }) => {
            return {
              href: "/food/" + product.slug,
              label:
                getLocalizedText(product.name, locale) + (brand ? " · " + getLocalizedText(brand.name, locale) : ""),
            };
          })}
        />
        <SourceList
          sources={ingredient.sources}
          labels={{
            title: labels("sourcesTitle"),
            manufacturer: labels("manufacturer"),
            official: labels("official"),
            editorial: labels("editorial"),
            accessed: labels("accessed"),
            lastVerified: labels("lastVerified"),
          }}
        />
      </div>
    </SectionContainer>
  );
}
