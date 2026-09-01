import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ContentStatusBadge } from "@/components/content/content-status-badge";
import { ArticleJsonLd } from "@/components/content/article-json-ld";
import { RelatedContent } from "@/components/content/related-content";
import { SourceList } from "@/components/content/source-list";
import { SectionContainer } from "@/components/ui/section-container";
import {
  getGuideWithRelatedContent,
  getGuides,
  getLocalizedText,
  getNutritionEntryBySlug,
  getNutritionTopics,
  getTopicWithRelatedGuides,
} from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = [...getNutritionTopics().map((topic) => topic.slug), ...getGuides().map((guide) => guide.slug)];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const entry = getNutritionEntryBySlug(slug);
  if (!entry) notFound();
  const title = entry.kind === "guide" ? entry.guide.title : entry.topic.title;
  const summary = entry.kind === "guide" ? entry.guide.summary : entry.topic.summary;
  return getLocaleMetadata({
    locale,
    path: `/nutrition-guide/${slug}`,
    title: getLocalizedText(title, locale),
    description: getLocalizedText(summary, locale),
    type: "article",
    noIndex: entry.kind === "guide" ? entry.guide.status === "draft" : entry.topic.status === "draft",
  });
}

export default async function GuideDetailPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const entry = getNutritionEntryBySlug(slug);
  if (!entry) notFound();
  const t = await getTranslations("Content");
  const guideLabels = await getTranslations("Guide");
  const productLabels = await getTranslations("Product");
  const guide = entry.kind === "guide" ? entry.guide : undefined;
  const topic = entry.kind === "topic" ? entry.topic : undefined;
  const result = guide ? getGuideWithRelatedContent(slug) : undefined;
  const products = result?.products ?? [];
  const ingredients = result?.ingredients ?? [];
  const topicResult = topic ? getTopicWithRelatedGuides(slug) : undefined;
  const relatedGuides = topicResult?.guides ?? [];
  const title = getLocalizedText(guide?.title ?? topic!.title, locale);
  const status = guide?.status ?? topic!.status;
  const statusLabels = t.raw("status") as Record<"draft" | "verified", string>;

  return (
    <SectionContainer>
      {guide && (
        <ArticleJsonLd
          locale={locale}
          slug={slug}
          title={title}
          description={getLocalizedText(guide.summary, locale)}
        />
      )}
      <Breadcrumb
        label={t("guide")}
        items={[
          { label: "Maple Bowl", href: "/" },
          { label: t("nutritionTitle"), href: "/nutrition-guide" },
          { label: title },
        ]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("guide")}</p>
      <div className="mt-3">
        <ContentStatusBadge status={status} labels={statusLabels} />
      </div>
      <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        {getLocalizedText(guide?.summary ?? topic!.summary, locale)}
      </p>
      <article className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold">{guide ? guideLabels("bodyLabel") : t("topic")}</h2>
        <p className="mt-4 whitespace-pre-line text-lg leading-9">
          {guide ? getLocalizedText(guide.body, locale) : getLocalizedText(topic!.body, locale)}
        </p>
      </article>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <RelatedContent
          title={t("related")}
          links={[
            ...products.map(({ product, brand }) => {
              return {
                href: "/food/" + product.slug,
                label:
                  getLocalizedText(product.name, locale) + (brand ? " · " + getLocalizedText(brand.name, locale) : ""),
              };
            }),
            ...ingredients.map((ingredient) => ({
              href: "/ingredients/" + ingredient.slug,
              label: getLocalizedText(ingredient.name, locale),
            })),
            ...relatedGuides.map((item) => ({
              href: "/nutrition-guide/" + item.slug,
              label: getLocalizedText(item.title, locale),
            })),
          ]}
        />
        <SourceList
          sources={guide?.sources ?? topic!.sources}
          labels={{
            title: guideLabels("sourcesTitle"),
            manufacturer: productLabels("manufacturer"),
            official: productLabels("official"),
            editorial: productLabels("editorial"),
            accessed: productLabels("accessed"),
            lastVerified: productLabels("lastVerified"),
          }}
        />
      </div>
    </SectionContainer>
  );
}
