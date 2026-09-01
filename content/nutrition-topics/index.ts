import type { NutritionTopic } from "@/lib/types";

export const nutritionTopics: NutritionTopic[] = [
  {
    id: "reading-labels",
    slug: "reading-pet-food-labels",
    title: {
      zh: "读懂宠物食品标签",
      en: "Reading pet food labels",
      fr: "Lire les étiquettes des aliments pour animaux",
    },
    summary: {
      zh: "从保证分析、配料表和产品声明开始建立阅读框架。",
      en: "Build a reading framework from guaranteed analysis, ingredients, and product statements.",
      fr: "Commencez par l’analyse garantie, les ingrédients et les déclarations du produit.",
    },
    body: {
      zh: "阅读宠物食品标签时，可以先确认适用物种和生命周期，再分别查看保证分析、配料表与制造商声明。不同字段回答不同问题，不能只用一个数字或一个配料代表整款产品。",
      en: "When reading a pet food label, start with the intended species and life stage, then consider guaranteed analysis, ingredients, and manufacturer statements together. Each field answers a different question.",
      fr: "Pour lire une étiquette, commencez par l’espèce et le stade de vie, puis examinez ensemble l’analyse garantie, les ingrédients et les déclarations du fabricant.",
    },
    speciesScope: "both",
    sources: [
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
    id: "ingredient-context",
    slug: "ingredient-context",
    title: {
      zh: "把配料放回完整配方中",
      en: "Ingredients in context",
      fr: "Comprendre les ingrédients dans leur contexte",
    },
    summary: {
      zh: "单个配料不能代表一款完整食品，先看上下文再下结论。",
      en: "A single ingredient does not represent a complete food; context comes first.",
      fr: "Un seul ingrédient ne représente pas un aliment complet; le contexte est essentiel.",
    },
    body: {
      zh: "配料表需要和产品类型、保证分析、适用对象以及来源信息一起阅读。单个原料名称不能独立说明整款食品的营养价值或是否适合某只宠物。",
      en: "Read an ingredient list with the product type, guaranteed analysis, intended use, and source information. One ingredient name cannot independently describe a food's nutritional value or suitability.",
      fr: "Lisez la liste avec le type de produit, l’analyse garantie, l’usage prévu et les sources. Un seul ingrédient ne décrit pas à lui seul la valeur nutritionnelle ou l’adéquation d’un aliment.",
    },
    speciesScope: "both",
    sources: [
      {
        name: "FirstMate product information",
        url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    status: "draft",
  },
  {
    id: "guaranteed-analysis",
    slug: "guaranteed-analysis-basics",
    title: { zh: "保证分析的基础", en: "Guaranteed analysis basics", fr: "Les bases de l’analyse garantie" },
    summary: {
      zh: "了解 minimum、maximum、单位和缺失值在产品页中的含义。",
      en: "Learn how minimums, maximums, units, and missing values appear on product pages.",
      fr: "Comprenez les minimums, maximums, unités et données manquantes des fiches produit.",
    },
    body: {
      zh: "保证分析通常以 minimum 或 maximum 表示标签要求的范围。阅读时要同时注意单位、产品类别和数据是否缺失，并避免把保证分析直接当成个体化喂养建议。",
      en: "Guaranteed analysis often uses minimums or maximums to describe label values. Pay attention to units, product category, and missing data, and do not treat it as individualized feeding advice.",
      fr: "L’analyse garantie utilise souvent des minimums ou maximums. Tenez compte des unités, de la catégorie du produit et des données manquantes; elle ne remplace pas un conseil personnalisé.",
    },
    speciesScope: "both",
    sources: [
      {
        name: "Open Farm product information",
        url: "https://openfarmpet.com/products/goodbowl-grass-fed-beef-brown-rice-recipe-for-dogs",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    status: "draft",
  },
];
