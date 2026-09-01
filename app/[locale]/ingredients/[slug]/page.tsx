import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { RelatedContent } from "@/components/content/related-content";
import { SourceList } from "@/components/content/source-list";
import { SectionContainer } from "@/components/ui/section-container";
import { getIngredientBySlug, getIngredients, getLocalizedText, getProducts, getBrands } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => getIngredients().map((ingredient) => ({ locale, slug: ingredient.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();
  return { title: getLocalizedText(ingredient.name, locale), description: getLocalizedText(ingredient.description, locale) };
}

export default async function IngredientDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();
  const t = await getTranslations("Content");
  const labels = await getTranslations("Product");
  const ingredientLabels = await getTranslations("Ingredient");
  const brands = getBrands();
  const relatedProducts = getProducts().filter((product) => product.ingredients.some((item) => item.ingredientId === ingredient.id));

  return (
    <SectionContainer>
      <Breadcrumb label={t("ingredient")} items={[{ label: "Maple Bowl", href: "/" }, { label: t("ingredientsTitle"), href: "/food" }, { label: getLocalizedText(ingredient.name, locale) }]} />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("ingredient")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{getLocalizedText(ingredient.name, locale)}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{getLocalizedText(ingredient.description, locale)}</p>
      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {ingredient.aliases.map((alias) => <span key={alias} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{alias}</span>)}
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <RelatedContent
          title={ingredientLabels("usedIn")}
          links={relatedProducts.map((product) => {
            const brand = brands.find((item) => item.id === product.brandId);
            return { href: "/food/" + product.slug, label: getLocalizedText(product.name, locale) + (brand ? " · " + getLocalizedText(brand.name, locale) : "") };
          })}
        />
        <SourceList
          sources={ingredient.sources}
          labels={{ title: labels("sourcesTitle"), manufacturer: labels("manufacturer"), official: labels("official"), editorial: labels("editorial"), accessed: labels("accessed"), lastVerified: labels("lastVerified") }}
        />
      </div>
    </SectionContainer>
  );
}
