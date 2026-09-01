import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const nav = await getTranslations("Navigation");
  const features = t.raw("features") as Array<{ title: string; description: string }>;

  return (
    <div>
      <section className="overflow-hidden bg-background">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.9fr] md:py-20 lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("eyebrow")}</p>
            <h1 className="whitespace-pre-line font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">{t("description")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/nutrition-guide" className={buttonVariants()}>
                {t("primaryCta")}
              </Link>
              <Link href="/reviews" className={buttonVariants({ variant: "outline" })}>
                {t("secondaryCta")}
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t("languageLabel")}</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full bg-secondary/50 blur-3xl" />
            <Image
              src="/brand/home-logo.png"
              alt="Maple Bowl dog and cat sharing a food bowl"
              width={1536}
              height={1024}
              className="relative h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["🥣", features[0].title, features[0].description],
            ["🍁", features[1].title, features[1].description],
            ["🐾", features[2].title, features[2].description],
          ].map(([icon, title, description]) => (
            <Card
              key={title as string}
              className="flex items-start gap-4 border-transparent bg-background p-5 shadow-none"
            >
              <span aria-hidden className="text-2xl">
                {icon}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Maple Bowl</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t("explore")}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">{t("exploreDescription")}</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/nutrition-guide", title: nav("nutritionGuide"), color: "bg-primary text-primary-foreground" },
            { href: "/brands", title: nav("brands"), color: "bg-secondary text-secondary-foreground" },
            { href: "/reviews", title: nav("reviews"), color: "bg-accent text-accent-foreground" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl p-6 font-display text-2xl font-bold transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${item.color}`}
            >
              {item.title}
              <span className="mt-10 block font-sans text-sm font-semibold opacity-80">{t("exploreLink")}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
