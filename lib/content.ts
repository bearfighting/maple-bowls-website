import { brands } from "@/content/brands";
import { guides } from "@/content/guides";
import { ingredients } from "@/content/ingredients";
import { nutritionTopics } from "@/content/nutrition-topics";
import { products } from "@/content/products";
import type {
  Brand,
  Guide,
  Ingredient,
  LocalizedText,
  Locale,
  NutritionTopic,
  Product,
  ProductIngredient,
} from "@/lib/types";

const byEnglishName = (
  a: { name?: LocalizedText; title?: LocalizedText },
  b: { name?: LocalizedText; title?: LocalizedText },
) => (a.name?.en ?? a.title?.en ?? "").localeCompare(b.name?.en ?? b.title?.en ?? "", "en");

export class ContentReferenceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentReferenceError";
  }
}

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale] || value.zh || value.en || value.fr || "";
}

export function getBrands(): ReadonlyArray<Brand> {
  return [...brands].sort(byEnglishName);
}
export function getBrandBySlug(slug: string) {
  return getBrands().find((brand) => brand.slug === slug);
}
export function getBrandById(id: string) {
  return getBrands().find((brand) => brand.id === id);
}
export function getBrandWithProducts(slug: string) {
  const brand = getBrandBySlug(slug);
  return brand
    ? { brand, products: getProductsWithBrands().filter(({ product }) => product.brandId === brand.id) }
    : undefined;
}
export function getProducts(): ReadonlyArray<Product> {
  return [...products].sort(byEnglishName);
}
export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}
export function getProductById(id: string) {
  return getProducts().find((product) => product.id === id);
}
export function getProductWithBrand(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  const brand = getBrandById(product.brandId);
  if (!brand)
    throw new ContentReferenceError("Missing brand reference: " + product.brandId + " for product " + product.id);
  return { product, brand, ingredients: getProductIngredients(product) };
}
export function getProductsByBrand(brandId: string) {
  return getProducts().filter((product) => product.brandId === brandId);
}
export function getProductsWithBrands() {
  return getProducts().map((product) => {
    const brand = getBrandById(product.brandId);
    if (!brand)
      throw new ContentReferenceError("Missing brand reference: " + product.brandId + " for product " + product.id);
    return { product, brand };
  });
}
export function getIngredients(): ReadonlyArray<Ingredient> {
  return [...ingredients].sort(byEnglishName);
}
export function getIngredientBySlug(slug: string) {
  return getIngredients().find((ingredient) => ingredient.slug === slug);
}
export function getIngredientById(id: string) {
  return getIngredients().find((ingredient) => ingredient.id === id);
}
export function getIngredientsByIds(ids: ReadonlyArray<string>): ReadonlyArray<Ingredient> {
  const missingIds = ids.filter((id) => !getIngredientById(id));
  if (missingIds.length > 0) {
    throw new ContentReferenceError("Missing ingredient references: " + missingIds.join(", "));
  }
  return ids.map((id) => getIngredientById(id)).filter((ingredient): ingredient is Ingredient => Boolean(ingredient));
}

export type ResolvedProductIngredient = {
  readonly item: ProductIngredient;
  readonly ingredient?: Ingredient;
};

export function getProductIngredients(product: Product): ReadonlyArray<ResolvedProductIngredient> {
  return product.ingredients.map((item) => {
    if (!item.ingredientId) return { item };
    const ingredient = getIngredientById(item.ingredientId);
    if (!ingredient)
      throw new ContentReferenceError(
        "Missing ingredient reference: " + item.ingredientId + " for product " + product.id,
      );
    return { item, ingredient };
  });
}
export function getIngredientWithProducts(slug: string) {
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) return undefined;
  return {
    ingredient,
    products: getProductsWithBrands().filter(({ product }) =>
      product.ingredients.some((item) => item.ingredientId === ingredient.id),
    ),
  };
}
export function getNutritionTopics(): ReadonlyArray<NutritionTopic> {
  return [...nutritionTopics].sort(byEnglishName);
}
export function getNutritionTopicBySlug(slug: string) {
  return getNutritionTopics().find((topic) => topic.slug === slug);
}
export function getGuides(): ReadonlyArray<Guide> {
  return [...guides].sort(byEnglishName);
}
export function getGuideBySlug(slug: string) {
  return getGuides().find((guide) => guide.slug === slug);
}
export type NutritionEntry = { kind: "topic"; topic: NutritionTopic } | { kind: "guide"; guide: Guide };

export function getNutritionEntryBySlug(slug: string): NutritionEntry | undefined {
  const topic = getNutritionTopicBySlug(slug);
  if (topic) return { kind: "topic", topic };
  const guide = getGuideBySlug(slug);
  return guide ? { kind: "guide", guide } : undefined;
}
export function getGuideWithRelatedContent(slug: string) {
  const guide = getGuideBySlug(slug);
  if (!guide) return undefined;
  const productsById = new Map(getProductsWithBrands().map((item) => [item.product.id, item]));
  const missingProductIds = guide.relatedProductIds.filter((id) => !productsById.has(id));
  if (missingProductIds.length > 0)
    throw new ContentReferenceError(
      "Missing product references: " + missingProductIds.join(", ") + " for guide " + guide.id,
    );
  return {
    guide,
    products: guide.relatedProductIds.map((id) => productsById.get(id)!),
    ingredients: getIngredientsByIds(guide.relatedIngredientIds),
  };
}

export function getTopicWithRelatedGuides(slug: string) {
  const topic = getNutritionTopicBySlug(slug);
  if (!topic) return undefined;
  return {
    topic,
    guides: getGuides().filter((guide) => guide.topicId === topic.id),
  };
}
