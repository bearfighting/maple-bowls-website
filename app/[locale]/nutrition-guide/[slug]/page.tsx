import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { RelatedContent } from "@/components/content/related-content";
import { SourceList } from "@/components/content/source-list";
import { SectionContainer } from "@/components/ui/section-container";
import { getBrands, getGuideBySlug, getGuides, getIngredientsByIds, getLocalizedText, getNutritionTopicBySlug, getNutritionTopics, getProducts } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const slugs = [...getNutritionTopics().map((topic) => topic.slug), ...getGuides().map((guide) => guide.slug)];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const guide = getGuideBySlug(slug);
  const topic = getNutritionTopicBySlug(slug);
  if (!guide && !topic) notFound();
  return { title: getLocalizedText(guide?.title ?? topic!.title, locale), description: getLocalizedText(guide?.summary ?? topic!.summary, locale) };
}

export default async function GuideDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const guide = getGuideBySlug(slug);
  const topic = getNutritionTopicBySlug(slug);
  if (!guide && !topic) notFound();
  const t = await getTranslations("Content");
  const guideLabels = await getTranslations("Guide");
  const productLabels = await getTranslations("Product");
  const brands = getBrands();
  const products = guide ? getProducts().filter((product) => guide.relatedProductIds.includes(product.id)) : [];
  const ingredients = guide ? getIngredientsByIds(guide.relatedIngredientIds) : [];
  const relatedGuides = topic ? getGuides().filter((item) => item.topicId === topic.id) : [];
  const title = getLocalizedText(guide?.title ?? topic!.title, locale);

  return (
    <SectionContainer>
      <Breadcrumb label={t("guide")} items={[{ label: "Maple Bowl", href: "/" }, { label: t("nutritionTitle"), href: "/nutrition-guide" }, { label: title }]} />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("guide")}</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{getLocalizedText(guide?.summary ?? topic!.summary, locale)}</p>
      <article className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">{guide ? guideLabels("bodyLabel") : t("topic")}</h2>
        <p className="mt-4 whitespace-pre-line text-lg leading-9">{guide ? getLocalizedText(guide.body, locale) : getLocalizedText(topic!.summary, locale)}</p>
      </article>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <RelatedContent
          title={t("related")}
          links={[
            ...products.map((product) => {
              const brand = brands.find((item) => item.id === product.brandId);
              return { href: "/food/" + product.slug, label: getLocalizedText(product.name, locale) + (brand ? " · " + getLocalizedText(brand.name, locale) : "") };
            }),
            ...ingredients.map((ingredient) => ({ href: "/ingredients/" + ingredient.slug, label: getLocalizedText(ingredient.name, locale) })),
            ...relatedGuides.map((item) => ({ href: "/nutrition-guide/" + item.slug, label: getLocalizedText(item.title, locale) })),
          ]}
        />
        <SourceList
          sources={guide?.sources ?? topic!.sources}
          labels={{ title: guideLabels("sourcesTitle"), manufacturer: productLabels("manufacturer"), official: productLabels("official"), editorial: productLabels("editorial"), accessed: productLabels("accessed"), lastVerified: productLabels("lastVerified") }}
        />
      </div>
    </SectionContainer>
  );
}
