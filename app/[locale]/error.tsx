"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("Error");
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">
        🥣
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold">{t("title")}</h1>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t("retry")}
      </button>
    </section>
  );
}
