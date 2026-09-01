import { brands } from "../content/brands";
import { guides } from "../content/guides";
import { ingredients } from "../content/ingredients";
import { nutritionTopics } from "../content/nutrition-topics";
import { products } from "../content/products";

type Identified = { id: string; slug: string };

export class ContentValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super("Content validation failed:\n" + issues.map((issue) => "- " + issue).join("\n"));
    this.name = "ContentValidationError";
    this.issues = issues;
  }
}

function checkUnique(values: Identified[], label: string, issues: string[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const value of values) {
    if (ids.has(value.id)) issues.push(label + " has duplicate id: " + value.id);
    if (slugs.has(value.slug)) issues.push(label + " has duplicate slug: " + value.slug);
    ids.add(value.id);
    slugs.add(value.slug);
  }
}

function hasLocalizedValue(value: { zh?: string; en?: string; fr?: string }) {
  return Boolean(value.zh?.trim() || value.en?.trim() || value.fr?.trim());
}

export function validateContent() {
  const issues: string[] = [];
  checkUnique(brands, "Brand", issues);
  checkUnique(products, "Product", issues);
  checkUnique(ingredients, "Ingredient", issues);
  checkUnique(nutritionTopics, "Nutrition topic", issues);
  checkUnique(guides, "Guide", issues);

  const brandIds = new Set(brands.map((brand) => brand.id));
  const ingredientIds = new Set(ingredients.map((ingredient) => ingredient.id));
  const productIds = new Set(products.map((product) => product.id));
  const topicIds = new Set(nutritionTopics.map((topic) => topic.id));
  const nutritionSlugs = new Set(nutritionTopics.map((topic) => topic.slug));

  for (const brand of brands) {
    if (!hasLocalizedValue(brand.name) || !hasLocalizedValue(brand.description))
      issues.push("Brand " + brand.id + " is missing localized text");
    if (brand.sources.length === 0) issues.push("Brand " + brand.id + " has no sources");
  }
  for (const product of products) {
    if (!brandIds.has(product.brandId))
      issues.push("Product " + product.id + " references missing brand: " + product.brandId);
    if (!hasLocalizedValue(product.name) || !hasLocalizedValue(product.description))
      issues.push("Product " + product.id + " is missing localized text");
    if (product.sources.length === 0) issues.push("Product " + product.id + " has no sources");
    for (const ingredient of product.ingredients) {
      if (ingredient.ingredientId && !ingredientIds.has(ingredient.ingredientId))
        issues.push("Product " + product.id + " references missing ingredient: " + ingredient.ingredientId);
    }
  }
  for (const ingredient of ingredients) {
    if (!hasLocalizedValue(ingredient.name) || !hasLocalizedValue(ingredient.description))
      issues.push("Ingredient " + ingredient.id + " is missing localized text");
    if (ingredient.sources.length === 0) issues.push("Ingredient " + ingredient.id + " has no sources");
  }
  for (const topic of nutritionTopics) {
    if (!hasLocalizedValue(topic.title) || !hasLocalizedValue(topic.summary) || !hasLocalizedValue(topic.body))
      issues.push("Nutrition topic " + topic.id + " is missing localized text");
    if (topic.sources.length === 0) issues.push("Nutrition topic " + topic.id + " has no sources");
  }
  for (const guide of guides) {
    if (nutritionSlugs.has(guide.slug)) issues.push("Nutrition topic and guide share slug: " + guide.slug);
    if (guide.topicId && !topicIds.has(guide.topicId))
      issues.push("Guide " + guide.id + " references missing topic: " + guide.topicId);
    if (!hasLocalizedValue(guide.title) || !hasLocalizedValue(guide.summary) || !hasLocalizedValue(guide.body))
      issues.push("Guide " + guide.id + " is missing localized text");
    if (guide.sources.length === 0) issues.push("Guide " + guide.id + " has no sources");
    for (const productId of guide.relatedProductIds)
      if (!productIds.has(productId)) issues.push("Guide " + guide.id + " references missing product: " + productId);
    for (const ingredientId of guide.relatedIngredientIds)
      if (!ingredientIds.has(ingredientId))
        issues.push("Guide " + guide.id + " references missing ingredient: " + ingredientId);
  }

  if (issues.length > 0) throw new ContentValidationError(issues);
  return {
    brands: brands.length,
    products: products.length,
    ingredients: ingredients.length,
    topics: nutritionTopics.length,
    guides: guides.length,
  };
}
