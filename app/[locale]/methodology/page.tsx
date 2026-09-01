import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Methodology" });
  return getLocaleMetadata({ locale, path: "/methodology", title: t("title"), description: t("description") });
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Methodology" });

  return (
    <SectionContainer>
      <Breadcrumb label={t("title")} items={[{ label: "Maple Bowl", href: "/" }, { label: t("title") }]} />
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("description")}</p>
        <div className="mt-12 space-y-8">
          {(["sources", "layers", "status"] as const).map((section) => (
            <section key={section} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold">{t(`${section}Title`)}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{t(`${section}Body`)}</p>
            </section>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
