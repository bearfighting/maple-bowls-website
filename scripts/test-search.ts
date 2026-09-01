import assert from "node:assert/strict";
import { getSearchDocuments } from "../lib/search-repository";
import { normalizeSearchText, searchDocuments, validateSearchDocuments, type SearchDocument } from "../lib/search";

assert.equal(normalizeSearchText("  Bœuf   À l’herbe  "), "bœuf a l’herbe");
assert.equal(normalizeSearchText("RIZ BRUN"), "riz brun");

async function main() {
  const documents = await getSearchDocuments();
  assert.ok(documents.every((document) => document.href.startsWith("/")));
  assert.throws(() => validateSearchDocuments([{ id: "", type: "brand", href: "invalid", title: { zh: "" } }]));
  assert.throws(() =>
    validateSearchDocuments([{ id: "external", type: "brand", href: "//example.com", title: { zh: "外部" } }]),
  );
  const chicken = searchDocuments(documents, "  CHICKEN ", "en", "unset");
  assert.ok(chicken.matches.some(({ document }) => document.id === "chicken"));

  const brownRice = searchDocuments(documents, "riz brun", "fr", "unset");
  assert.equal(brownRice.matches[0]?.document.id, "brown-rice");

  const preferenceDocuments: SearchDocument[] = [
    {
      id: "cat-food",
      type: "product",
      href: "/food/cat-food",
      title: { zh: "宠物食品猫咪配方", en: "Pet food cat recipe", fr: "Nourriture pour chats" },
      species: ["cat"],
    },
    {
      id: "dog-food",
      type: "product",
      href: "/food/dog-food",
      title: { zh: "宠物食品狗狗配方", en: "Pet food dog recipe", fr: "Nourriture pour chiens" },
      species: ["dog"],
    },
  ];
  const dogResults = searchDocuments(preferenceDocuments, "pet food", "en", "dog");
  assert.equal(dogResults.matches[0]?.document.id, "dog-food");
  assert.equal(dogResults.matches.length, 2);

  assert.deepEqual(searchDocuments(documents, "   ", "zh", "unset"), {
    query: "",
    matches: [],
    total: 0,
    truncated: false,
  });

  const manyDocuments: SearchDocument[] = Array.from({ length: 51 }, (_, index) => ({
    id: `food-${index}`,
    type: "product",
    href: `/food/food-${index}`,
    title: { zh: `食品 ${index}`, en: `Food ${index}`, fr: `Aliment ${index}` },
  }));
  const manyResults = searchDocuments(manyDocuments, "food", "en", "unset");
  assert.equal(manyResults.matches.length, 50);
  assert.equal(manyResults.total, 51);
  assert.equal(manyResults.truncated, true);

  console.log("Search query tests passed.");
}

void main();
