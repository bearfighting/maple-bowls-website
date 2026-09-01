import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl">🐾</p>
      <h1 className="mt-6 font-display text-4xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
