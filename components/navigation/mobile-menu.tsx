"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Dialog } from "@/components/ui/dialog";

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
  const pathname = usePathname();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-full border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      <Dialog open={open} onOpenChange={setOpen} title={title} closeLabel={closeLabel}>
        <nav aria-label={menuLabel} className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`min-h-11 rounded-2xl border p-4 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </Dialog>
    </div>
  );
}
