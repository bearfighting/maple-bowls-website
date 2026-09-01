import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, label }: { items: ReadonlyArray<BreadcrumbItem>; label: string }) {
  return (
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
  );
}
