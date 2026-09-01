import { getLocalizedText } from "@/lib/content";
import type { Locale, NutritionFact } from "@/lib/types";

export function NutritionTable({ facts, locale, labels }: { facts: NutritionFact[]; locale: Locale; labels: { nutrient: string; value: string; qualifier: Record<"minimum" | "maximum" | "typical", string>; valueMissing: string } }) {
  if (facts.length === 0) return <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">{labels.valueMissing}</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">{labels.nutrient}</th>
            <th scope="col" className="px-4 py-3 font-bold">{labels.value}</th>
          </tr>
        </thead>
        <tbody>
          {facts.map((fact, index) => (
            <tr key={getLocalizedText(fact.label, locale) + "-" + index} className="border-t border-border">
              <th scope="row" className="px-4 py-3 font-semibold">{getLocalizedText(fact.label, locale)}</th>
              <td className="px-4 py-3">
                {fact.value ? (fact.qualifier ? labels.qualifier[fact.qualifier] + " " : "") + fact.value + (fact.unit ? " " + fact.unit : "") : labels.valueMissing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
