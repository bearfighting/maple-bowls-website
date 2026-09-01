import { getTranslations } from "next-intl/server";
import { SectionContainer } from "@/components/ui/section-container";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return getLocaleMetadata({ locale, path: "/privacy", title: t("title"), description: t("description") });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return (
    <SectionContainer>
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
      <section className="mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold">{t("petCookieTitle")}</h2>
        <p className="mt-4 leading-8 text-muted-foreground">{t("petCookieBody")}</p>
      </section>
    </SectionContainer>
  );
}
