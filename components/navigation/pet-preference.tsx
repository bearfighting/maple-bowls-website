"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "@/components/ui/dialog";
import type { PetPreference } from "@/lib/types";
import { PET_PREFERENCE_CHANGE_EVENT, PET_PREFERENCE_COOKIE } from "@/lib/pet-preference";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const preferences: PetPreference[] = ["dog", "cat", "both", "unset"];

function readPreference(): PetPreference | undefined {
  const value = document.cookie
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([name]) => name === PET_PREFERENCE_COOKIE)?.[1];
  return preferences.includes(value as PetPreference) ? (value as PetPreference) : undefined;
}

function writePreference(preference: PetPreference) {
  document.cookie = `${PET_PREFERENCE_COOKIE}=${preference}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function PetPreference({ onboarding = false }: { onboarding?: boolean }) {
  const t = useTranslations("PetPreference");
  const [preference, setPreference] = useState<PetPreference | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const open = onboarding ? hydrated && preference === undefined && !dismissed : controlOpen;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPreference(readPreference() ?? "unset");
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function selectPreference(nextPreference: PetPreference) {
    writePreference(nextPreference);
    setPreference(nextPreference);
    setDismissed(true);
    setControlOpen(false);
    window.dispatchEvent(new CustomEvent(PET_PREFERENCE_CHANGE_EVENT));
  }

  const currentLabel = !preference || preference === "unset" ? t("skip") : t(`options.${preference}.short`);

  return (
    <>
      {!onboarding && (
        <button
          type="button"
          onClick={() => setControlOpen(true)}
          disabled={!hydrated}
          aria-label={t("change")}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-card px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">{preference === "cat" ? "🐱" : preference === "dog" ? "🐶" : "🐾"}</span>
          <span>{currentLabel}</span>
        </button>
      )}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && onboarding) selectPreference("unset");
          else if (!nextOpen) setControlOpen(false);
          else setControlOpen(true);
        }}
        title={onboarding ? t("welcome") : t("change")}
        closeLabel={t("close")}
      >
        <p className="text-lg leading-8 text-muted-foreground">{t("question")}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(["dog", "cat", "both"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => selectPreference(item)}
              className="rounded-2xl border border-border bg-background p-4 text-left transition-colors hover:border-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="text-2xl" aria-hidden="true">
                {item === "dog" ? "🐶" : item === "cat" ? "🐱" : "🐾"}
              </span>
              <span className="mt-2 block font-display text-lg font-bold">{t(`options.${item}.title`)}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{t(`options.${item}.description`)}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => selectPreference("unset")}
            className="rounded-sm text-sm font-bold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("skip")}
          </button>
          <p className="text-sm text-muted-foreground">{t("changeLater")}</p>
        </div>
      </Dialog>
    </>
  );
}
