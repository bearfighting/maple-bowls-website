import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  {
    id: "label-reading-start",
    slug: "start-with-the-label",
    title: {
      zh: "从标签开始：一份温和的阅读指南",
      en: "Start with the label: a gentle reading guide",
      fr: "Commencer par l’étiquette : un guide simple",
    },
    summary: {
      zh: "先建立阅读顺序，再逐项理解配料、营养和产品声明。",
      en: "Start with a reading order before interpreting ingredients, nutrition, and product statements.",
      fr: "Adoptez un ordre de lecture avant d’interpréter les ingrédients et les informations nutritionnelles.",
    },
    body: {
      zh: "这篇草稿指南建议先确认产品适用物种和生命周期，再查看保证分析、配料表与制造商声明。任何结论都需要回到完整产品信息和宠物自身情况中理解。",
      en: "This draft guide suggests checking species and life stage first, then reading guaranteed analysis, ingredients, and manufacturer statements. Conclusions should be understood in the context of the full product and the individual pet.",
      fr: "Ce brouillon recommande de vérifier d’abord l’espèce et le stade de vie, puis l’analyse garantie, les ingrédients et les déclarations du fabricant.",
    },
    topicId: "reading-labels",
    relatedProductIds: ["open-farm-goodbowl-beef", "go-digestion-salmon"],
    relatedIngredientIds: ["salmon-meal", "brown-rice"],
    sources: [
      {
        name: "Open Farm product information",
        url: "https://openfarmpet.com/products/goodbowl-grass-fed-beef-brown-rice-recipe-for-dogs",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
      {
        name: "GO! SOLUTIONS product information",
        url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    status: "draft",
  },
  {
    id: "ingredient-context-guide",
    slug: "ingredients-need-context",
    title: { zh: "配料需要上下文", en: "Ingredients need context", fr: "Les ingrédients ont besoin de contexte" },
    summary: {
      zh: "为什么阅读配料表时，不应该只盯着一个词。",
      en: "Why one word in an ingredient list is not the whole story.",
      fr: "Pourquoi un seul mot dans une liste d’ingrédients ne raconte pas toute l’histoire.",
    },
    body: {
      zh: "配料表是完整配方的一部分。阅读时应同时考虑产品类型、营养保证、适用对象和来源信息，避免把单一配料直接等同于整款食品的结论。",
      en: "An ingredient list is one part of a complete recipe. Read it together with product type, nutritional guarantees, intended use, and source information instead of treating one ingredient as the whole conclusion.",
      fr: "La liste d’ingrédients n’est qu’une partie de la recette. Il faut aussi considérer le type de produit, les garanties nutritionnelles et l’usage prévu.",
    },
    topicId: "ingredient-context",
    relatedProductIds: ["firstmate-free-run-chicken", "go-digestion-salmon"],
    relatedIngredientIds: ["chicken", "oatmeal", "potato"],
    sources: [
      {
        name: "FirstMate product information",
        url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
      {
        name: "GO! SOLUTIONS product information",
        url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    status: "draft",
  },
];
