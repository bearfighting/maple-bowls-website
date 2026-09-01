import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocalizedText } from "@/lib/content";
import type { FoodType, Locale, Product, Species } from "@/lib/types";
import { Card } from "@/components/ui/card";

type ProductCardLabels = {
  species: Record<Species, string>;
  foodType: Record<FoodType, string>;
};

export function ProductCard({ product, brandName, locale, labels }: { product: Product; brandName: string; locale: Locale; labels: ProductCardLabels }) {
  return (
    <Link href={"/food/" + product.slug} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <Card className="h-full overflow-hidden transition-transform group-hover:-translate-y-1">
        <div className="flex aspect-[4/3] items-center justify-center bg-muted p-6">
          {product.image ? (
            <Image src={product.image} alt={getLocalizedText(product.name, locale)} width={640} height={480} className="h-full w-full object-contain" />
          ) : (
            <span className="text-6xl" aria-hidden="true">🥣</span>
          )}
        </div>
        <div className="p-5">
          <p className="text-sm font-semibold text-muted-foreground">{brandName}</p>
          <h2 className="mt-2 font-display text-xl font-bold">{getLocalizedText(product.name, locale)}</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
            {product.species.map((species) => <span key={species} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{labels.species[species]}</span>)}
            <span className="rounded-full border border-border px-3 py-1">{labels.foodType[product.foodType]}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
