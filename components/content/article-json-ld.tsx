import { getSiteUrl } from "@/lib/metadata";
import type { Locale } from "@/lib/types";

export function ArticleJsonLd({
  locale,
  slug,
  title,
  description,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    mainEntityOfPage: new URL(`/${locale}/nutrition-guide/${slug}`, getSiteUrl()).toString(),
    publisher: { "@type": "Organization", name: "Maple Bowl" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
