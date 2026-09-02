"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Dialog } from "@/components/ui/dialog";
import type { Locale } from "@/lib/types";

const locales: Array<{ value: Locale; shortLabel: string; label: string }> = [
  { value: "zh", shortLabel: "简中", label: "简体中文" },
  { value: "en", shortLabel: "EN", label: "English" },
  { value: "fr", shortLabel: "FR", label: "Français" },
];

export function LanguageSwitcher({
  currentLocale,
  ariaLabel,
  title,
  closeLabel,
}: {
  currentLocale: Locale;
  ariaLabel: string;
  title: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label={ariaLabel} className="hidden items-center gap-1 rounded-full border bg-card p-1 xl:flex">
        <LanguageLinks currentLocale={currentLocale} pathname={pathname} compact />
      </nav>
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Languages className="size-5" aria-hidden="true" />
        </button>
        <Dialog open={open} onOpenChange={setOpen} title={title} closeLabel={closeLabel}>
          <nav aria-label={ariaLabel} className="flex flex-col gap-2">
            <LanguageLinks currentLocale={currentLocale} pathname={pathname} />
          </nav>
        </Dialog>
      </div>
    </>
  );
}

function LanguageLinks({
  currentLocale,
  pathname,
  compact = false,
}: {
  currentLocale: Locale;
  pathname: string;
  compact?: boolean;
}) {
  return (
    <>
      {locales.map((locale) => (
        <Link
          key={locale.value}
          href={pathname}
          locale={locale.value}
          aria-current={currentLocale === locale.value ? "page" : undefined}
          className={`font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            compact ? "px-2.5 py-1.5 text-xs" : "min-h-11 px-4 py-3 text-base"
          } ${
            compact
              ? currentLocale === locale.value
                ? "rounded-full bg-primary text-primary-foreground"
                : "rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              : currentLocale === locale.value
                ? "rounded-2xl border border-primary bg-primary text-primary-foreground"
                : "rounded-2xl border border-border bg-background text-foreground hover:border-primary hover:bg-muted"
          }`}
        >
          {compact ? locale.shortLabel : locale.label}
        </Link>
      ))}
    </>
  );
}
