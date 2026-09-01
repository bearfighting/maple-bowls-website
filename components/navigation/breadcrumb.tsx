import { ChevronRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteUrl } from "@/lib/metadata";

export type BreadcrumbItem = { label: string; href?: string };

export async function Breadcrumb({ items, label }: { items: ReadonlyArray<BreadcrumbItem>; label: string }) {
  const locale = await getLocale();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: new URL(`/${locale}${item.href === "/" ? "" : item.href}`, getSiteUrl()).toString() }
        : {}),
    })),
  };

  return (
    <>
      <nav aria-label={label} className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="size-4" aria-hidden="true" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
