"use client";

import { useTranslations } from "next-intl";

export default function ProductError({ reset }: { reset: () => void }) {
  const t = useTranslations("Error");
  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold">{t("title")}</h1>
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t("retry")}
      </button>
    </main>
  );
}
