import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function MobileMenu({
  menuLabel,
  links,
}: {
  menuLabel: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <details className="relative lg:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden" aria-label={menuLabel}>
        <Menu className="size-5" aria-hidden="true" />
      </summary>
      <nav aria-label={menuLabel} className="absolute right-0 top-14 z-20 min-w-56 rounded-2xl border bg-card p-2 shadow-lg">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted">
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
