import { getLocalizedText } from "@/lib/content";
import type { LocalizedText, Locale } from "@/lib/types";

export function EditorialCallout({ title, body, locale, draftLabel }: { title: string; body?: LocalizedText; locale: Locale; draftLabel?: string }) {
  if (!body) return null;
  return (
    <aside className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {draftLabel && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{draftLabel}</span>}
      </div>
      <p className="mt-3 leading-7">{getLocalizedText(body, locale)}</p>
    </aside>
  );
}
