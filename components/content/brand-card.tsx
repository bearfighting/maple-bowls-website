import { Link } from "@/i18n/navigation";
import { getLocalizedText } from "@/lib/content";
import type { Brand, Locale } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function BrandCard({ brand, locale }: { brand: Brand; locale: Locale }) {
  return (
    <Link href={"/brands/" + brand.slug} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <Card className="h-full p-6 transition-transform group-hover:-translate-y-1">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">{brand.country}</p>
        <h2 className="mt-3 font-display text-2xl font-bold">{getLocalizedText(brand.name, locale)}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{getLocalizedText(brand.description, locale)}</p>
      </Card>
    </Link>
  );
}
