import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "About" });
  return getLocaleMetadata({ locale, path: "/about", title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "About" });
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <SectionContainer>
      <Breadcrumb label={t("title")} items={[{ label: "Maple Bowl", href: "/" }, { label: t("title") }]} />
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("description")}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">{t("audienceTitle")}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{t("audienceBody")}</p>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">{t("principlesTitle")}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{t("principlesBody")}</p>
          </section>
        </div>
        {email ? (
          <section className="mt-8 rounded-2xl border border-border bg-muted p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">{t("contactTitle")}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{t("contactBody")}</p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {email}
            </a>
          </section>
        ) : null}
      </div>
    </SectionContainer>
  );
}
