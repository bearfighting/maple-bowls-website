"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Sheet } from "@/components/ui/sheet";

export function MobileMenu({
  menuLabel,
  title,
  closeLabel,
  links,
}: {
  menuLabel: string;
  title: string;
  closeLabel: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-full border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      <Sheet open={open} onOpenChange={setOpen} title={title} closeLabel={closeLabel}>
        <nav aria-label={menuLabel} className="flex flex-col gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label}
            </Link>
          ))}
        </nav>
      </Sheet>
    </div>
  );
}
