import type { NutritionTopic } from "@/lib/types";

export const nutritionTopics: NutritionTopic[] = [
  {
    id: "reading-labels",
    slug: "reading-pet-food-labels",
    title: { zh: "读懂宠物食品标签", en: "Reading pet food labels", fr: "Lire les étiquettes des aliments pour animaux" },
    summary: { zh: "从保证分析、配料表和产品声明开始建立阅读框架。", en: "Build a reading framework from guaranteed analysis, ingredients, and product statements.", fr: "Commencez par l’analyse garantie, les ingrédients et les déclarations du produit." },
    speciesScope: "both",
    sources: [{ name: "GO! SOLUTIONS product information", url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "ingredient-context",
    slug: "ingredient-context",
    title: { zh: "把配料放回完整配方中", en: "Ingredients in context", fr: "Comprendre les ingrédients dans leur contexte" },
    summary: { zh: "单个配料不能代表一款完整食品，先看上下文再下结论。", en: "A single ingredient does not represent a complete food; context comes first.", fr: "Un seul ingrédient ne représente pas un aliment complet; le contexte est essentiel." },
    speciesScope: "both",
    sources: [{ name: "FirstMate product information", url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "guaranteed-analysis",
    slug: "guaranteed-analysis-basics",
    title: { zh: "保证分析的基础", en: "Guaranteed analysis basics", fr: "Les bases de l’analyse garantie" },
    summary: { zh: "了解 minimum、maximum、单位和缺失值在产品页中的含义。", en: "Learn how minimums, maximums, units, and missing values appear on product pages.", fr: "Comprenez les minimums, maximums, unités et données manquantes des fiches produit." },
    speciesScope: "both",
    sources: [{ name: "Open Farm product information", url: "https://openfarmpet.com/products/goodbowl-grass-fed-beef-brown-rice-recipe-for-dogs", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
];
