import { Link } from "@/i18n/navigation";
import { getLocalizedText } from "@/lib/content";
import type { Locale, ProductIngredient } from "@/lib/types";

export function IngredientList({ ingredients, locale, unknownLabel }: { ingredients: ProductIngredient[]; locale: Locale; unknownLabel: string }) {
  if (ingredients.length === 0) return <p className="text-sm text-muted-foreground">{unknownLabel}</p>;

  return (
    <ul className="space-y-2">
      {ingredients.map((ingredient, index) => (
        <li key={getLocalizedText(ingredient.name, locale) + "-" + index} className="rounded-xl bg-muted px-4 py-3">
          {ingredient.ingredientId ? (
            <Link href={"/ingredients/" + ingredient.ingredientId} className="font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {getLocalizedText(ingredient.name, locale)}
            </Link>
          ) : (
            <span>{getLocalizedText(ingredient.name, locale)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
