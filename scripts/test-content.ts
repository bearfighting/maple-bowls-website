import assert from "node:assert/strict";
import {
  ContentReferenceError,
  getGuideWithRelatedContent,
  getIngredientsByIds,
  getProductWithBrand,
  getProductIngredients,
  getTopicWithRelatedGuides,
} from "../lib/content";
import { getLocalizedText } from "../lib/content";
import { getProductBySlug } from "../lib/content";
import { validateContent } from "../lib/content-validation";

const product = getProductBySlug("open-farm-goodbowl-beef");
assert.ok(product);
const productResult = getProductWithBrand(product.slug);
assert.ok(productResult);
assert.equal(productResult.brand.id, "open-farm");
assert.equal(productResult.ingredients[0]?.ingredient?.slug, "brown-rice");
assert.equal(getLocalizedText(productResult.ingredients[0]!.item.name, "fr"), "Riz brun");

assert.throws(
  () => getProductIngredients({ ...product, ingredients: [{ name: { zh: "missing" }, ingredientId: "missing" }] }),
  ContentReferenceError,
);
assert.equal(getGuideWithRelatedContent("missing-guide"), undefined);
assert.throws(() => getIngredientsByIds(["missing-ingredient"]), ContentReferenceError);
assert.equal(getTopicWithRelatedGuides("reading-pet-food-labels")?.guides.length, 1);
assert.deepEqual(validateContent(), { brands: 3, products: 4, ingredients: 5, topics: 3, guides: 2 });

console.log("Content query tests passed.");
