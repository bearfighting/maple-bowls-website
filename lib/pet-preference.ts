import type { PetPreference, Product, Species } from "@/lib/types";

export const PET_PREFERENCE_COOKIE = "maple_paws_pet";
export const PET_PREFERENCE_CHANGE_EVENT = "maple-pet-preference-change";

export function sortProductsByPreference<T extends { product: Pick<Product, "species"> }>(
  items: ReadonlyArray<T>,
  preference: PetPreference,
): T[] {
  if (preference === "unset" || preference === "both") return [...items];
  const preferredSpecies: Species = preference;
  return [...items].sort((a, b) => {
    const aMatches = a.product.species.includes(preferredSpecies) ? 1 : 0;
    const bMatches = b.product.species.includes(preferredSpecies) ? 1 : 0;
    return bMatches - aMatches;
  });
}
