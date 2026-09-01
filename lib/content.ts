import { brands } from "@/content/brands";
import { guides } from "@/content/guides";
import { ingredients } from "@/content/ingredients";
import { nutritionTopics } from "@/content/nutrition-topics";
import { products } from "@/content/products";
import type { Brand, Guide, Ingredient, LocalizedText, Locale, NutritionTopic, Product } from "@/lib/types";

const byEnglishName = (a: { name?: LocalizedText; title?: LocalizedText }, b: { name?: LocalizedText; title?: LocalizedText }) =>
  (a.name?.en ?? a.title?.en ?? "").localeCompare(b.name?.en ?? b.title?.en ?? "", "en");

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale] || value.zh || value.en || value.fr || "";
}

export function getBrands(): Brand[] { return [...brands].sort(byEnglishName); }
export function getBrandBySlug(slug: string) { return getBrands().find((brand) => brand.slug === slug); }
export function getBrandById(id: string) { return getBrands().find((brand) => brand.id === id); }
export function getProducts(): Product[] { return [...products].sort(byEnglishName); }
export function getProductBySlug(slug: string) { return getProducts().find((product) => product.slug === slug); }
export function getProductById(id: string) { return getProducts().find((product) => product.id === id); }
export function getProductsByBrand(brandId: string) { return getProducts().filter((product) => product.brandId === brandId); }
export function getIngredients(): Ingredient[] { return [...ingredients].sort(byEnglishName); }
export function getIngredientBySlug(slug: string) { return getIngredients().find((ingredient) => ingredient.slug === slug); }
export function getIngredientById(id: string) { return getIngredients().find((ingredient) => ingredient.id === id); }
export function getIngredientsByIds(ids: string[]) {
  const missingIds = ids.filter((id) => !getIngredientById(id));
  if (missingIds.length > 0) {
    throw new Error("Missing ingredient references: " + missingIds.join(", "));
  }
  return ids.map((id) => getIngredientById(id)).filter((ingredient): ingredient is Ingredient => Boolean(ingredient));
}
export function getNutritionTopics(): NutritionTopic[] { return [...nutritionTopics].sort(byEnglishName); }
export function getNutritionTopicBySlug(slug: string) { return getNutritionTopics().find((topic) => topic.slug === slug); }
export function getGuides(): Guide[] { return [...guides].sort(byEnglishName); }
export function getGuideBySlug(slug: string) { return getGuides().find((guide) => guide.slug === slug); }
