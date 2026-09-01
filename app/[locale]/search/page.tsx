import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SectionContainer } from "@/components/ui/section-container";
import { Link } from "@/i18n/navigation";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getLocaleMetadata } from "@/lib/metadata";
import { parsePetPreference, PET_PREFERENCE_COOKIE } from "@/lib/pet-preference";
import type { SearchEntityType, SearchResult } from "@/lib/search";
import { searchDocuments } from "@/lib/search";
import { getSearchDocuments } from "@/lib/search-repository";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations({ locale, namespace: "Search" });
  return getLocaleMetadata({
    locale,
    path: "/search",
    title: t("title"),
    description: t("description"),
    noIndex: true,
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = getLocaleOrNotFound((await params).locale);
  const t = await getTranslations("Search");
  const navigation = await getTranslations("Navigation");
  const queryValue = (await searchParams)?.q;
  const query = typeof queryValue === "string" ? queryValue : "";
  const preference = parsePetPreference((await cookies()).get(PET_PREFERENCE_COOKIE)?.value);
  const typeLabels = t.raw("types") as Record<SearchEntityType, string>;
  let result: SearchResult | undefined;
  let failed = false;

  try {
    result = searchDocuments(await getSearchDocuments(), query, locale, preference);
  } catch {
    failed = true;
  }

  return (
    <SectionContainer>
      <Breadcrumb
        label={navigation("primary")}
        items={[{ label: navigation("home"), href: "/" }, { label: t("title") }]}
      />
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{navigation("search")}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{t("description")}</p>
      <form method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="search-query" className="sr-only">
          {t("placeholder")}
        </label>
        <input
          id="search-query"
          name="q"
          defaultValue={query.slice(0, 100)}
          maxLength={100}
          placeholder={t("placeholder")}
          className="min-h-12 flex-1 rounded-xl border border-border bg-card px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="min-h-12 rounded-xl bg-primary px-6 font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("submit")}
        </button>
      </form>
      {failed ? (
        <p className="mt-8 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("error")}</p>
      ) : !result?.query ? (
        <p className="mt-8 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("noInput")}</p>
      ) : result.matches.length === 0 ? (
        <p className="mt-8 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("noResults")}</p>
      ) : (
        <section aria-live="polite" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">{t("resultsCount", { count: result.total })}</h2>
            {result.truncated && (
              <p className="text-sm text-muted-foreground">{t("tooMany", { count: result.matches.length })}</p>
            )}
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {result.matches.map(({ document }) => (
              <li key={`${document.type}-${document.id}`}>
                <Link
                  href={document.href}
                  className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent">
                    {typeLabels[document.type]}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    {document.title[locale] || document.title.zh || document.title.en || document.title.fr}
                  </h3>
                  {document.summary && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {document.summary[locale] || document.summary.zh || document.summary.en || document.summary.fr}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SectionContainer>
  );
}
