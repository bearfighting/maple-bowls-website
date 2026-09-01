import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArticleCard } from "@/components/content/article-card";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getGuides, getLocalizedText, getNutritionTopics } from "@/lib/content";
import { getLocaleOrNotFound } from "@/lib/locale";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Content" });
  return { title: t("nutritionTitle"), description: t("nutritionDescription") };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NutritionGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations("Content");
  const navigation = await getTranslations("Navigation");
  const topics = getNutritionTopics();
  const guides = getGuides();

  return (
    <SectionContainer>
      <Breadcrumb label={navigation("primary")} items={[{ label: navigation("home"), href: "/" }, { label: t("nutritionTitle") }]} />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("guide")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("nutritionTitle")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("nutritionDescription")}</p>
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold">{t("topic")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {topics.map((topic) => <ArticleCard key={topic.id} href={"/nutrition-guide/" + topic.slug} title={getLocalizedText(topic.title, locale)} summary={getLocalizedText(topic.summary, locale)} label={t("topic")} />)}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold">{t("guide")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {guides.map((guide) => <ArticleCard key={guide.id} href={"/nutrition-guide/" + guide.slug} title={getLocalizedText(guide.title, locale)} summary={getLocalizedText(guide.summary, locale)} label={t("guide")} />)}
        </div>
      </section>
    </SectionContainer>
  );
}
