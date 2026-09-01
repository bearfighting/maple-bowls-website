import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "open-farm-goodbowl-beef",
    slug: "open-farm-goodbowl-beef",
    brandId: "open-farm",
    name: {
      zh: "GoodBowl 草饲牛肉与糙米配方",
      en: "GoodBowl Grass-Fed Beef & Brown Rice Recipe",
      fr: "Recette GoodBowl au bœuf nourri à l’herbe et riz brun",
    },
    species: ["dog"],
    foodType: "dry",
    lifeStages: ["all-life-stages"],
    description: {
      zh: "Open Farm 的狗粮配方示例，产品页面提供保证分析和热量信息。",
      en: "An Open Farm dog food recipe with guaranteed analysis and calorie information on the product page.",
      fr: "Une recette Open Farm pour chiens dont la page présente l’analyse garantie et les calories.",
    },
    ingredients: [{ name: { zh: "糙米", en: "Brown rice", fr: "Riz brun" }, ingredientId: "brown-rice" }],
    nutritionFacts: [
      {
        label: { zh: "粗蛋白", en: "Crude protein", fr: "Protéines brutes" },
        value: "25",
        qualifier: "minimum",
        unit: "%",
      },
      {
        label: { zh: "粗脂肪", en: "Crude fat", fr: "Matières grasses brutes" },
        value: "12",
        qualifier: "minimum",
        unit: "%",
      },
      {
        label: { zh: "粗纤维", en: "Crude fibre", fr: "Fibres brutes" },
        value: "4.5",
        qualifier: "maximum",
        unit: "%",
      },
      { label: { zh: "水分", en: "Moisture", fr: "Humidité" }, value: "10", qualifier: "maximum", unit: "%" },
    ],
    sources: [
      {
        name: "Open Farm GoodBowl product page",
        url: "https://openfarmpet.com/products/goodbowl-grass-fed-beef-brown-rice-recipe-for-dogs",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    mapleBowlNotes: {
      zh: "这是用于验证页面结构的草稿记录；公开发布前需要重新核对包装、批次和完整配料表。",
      en: "This is a draft record for validating the page structure. Packaging, lot details, and the complete ingredient list need review before publication.",
      fr: "Cette fiche est un brouillon destiné à valider la structure. L’emballage, le lot et la liste complète des ingrédients doivent être vérifiés avant publication.",
    },
    lastVerifiedAt: "2026-09-01",
    status: "draft",
  },
  {
    id: "open-farm-rawmix-front-range",
    slug: "open-farm-rawmix-front-range",
    brandId: "open-farm",
    name: { zh: "RawMix Front Range 配方", en: "RawMix Front Range Recipe", fr: "Recette RawMix Front Range" },
    species: ["dog"],
    foodType: "dry",
    lifeStages: ["all-life-stages"],
    description: {
      zh: "Open Farm 的狗粮配方示例，包含品牌页面公开的保证分析信息。",
      en: "An Open Farm dog food recipe with guaranteed analysis published on the brand page.",
      fr: "Une recette Open Farm pour chiens avec une analyse garantie publiée par la marque.",
    },
    ingredients: [
      { name: { zh: "牛肉", en: "Beef", fr: "Bœuf" } },
      { name: { zh: "鲱鱼粉", en: "Menhaden fish meal", fr: "Farine de menhaden" } },
    ],
    nutritionFacts: [
      {
        label: { zh: "粗蛋白", en: "Crude protein", fr: "Protéines brutes" },
        value: "30",
        qualifier: "minimum",
        unit: "%",
      },
      {
        label: { zh: "粗脂肪", en: "Crude fat", fr: "Matières grasses brutes" },
        value: "15",
        qualifier: "minimum",
        unit: "%",
      },
      {
        label: { zh: "粗纤维", en: "Crude fiber", fr: "Fibres brutes" },
        value: "4.5",
        qualifier: "maximum",
        unit: "%",
      },
      { label: { zh: "水分", en: "Moisture", fr: "Humidité" }, value: "10", qualifier: "maximum", unit: "%" },
    ],
    sources: [
      {
        name: "Open Farm RawMix product page",
        url: "https://openfarmpet.com/en-us/products/front-range-recipe-for-dogs/",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    mapleBowlNotes: {
      zh: "这是用于验证页面结构的草稿记录；页面信息可能随产品批次或地区变化。",
      en: "This is a draft record for validating the page structure; product information may vary by lot or region.",
      fr: "Cette fiche est un brouillon destiné à valider la structure; les informations peuvent varier selon le lot ou la région.",
    },
    lastVerifiedAt: "2026-09-01",
    status: "draft",
  },
  {
    id: "firstmate-free-run-chicken",
    slug: "firstmate-free-run-chicken",
    brandId: "firstmate",
    name: { zh: "Free Run Chicken Formula", en: "Free Run Chicken Formula", fr: "Free Run Chicken Formula" },
    species: ["dog"],
    foodType: "wet",
    lifeStages: ["all-life-stages"],
    description: {
      zh: "FirstMate 的鸡肉配方示例，官方页面列出产品配料和适用的营养标准说明。",
      en: "A FirstMate chicken recipe whose official page lists ingredients and its nutritional adequacy statement.",
      fr: "Une recette FirstMate au poulet dont la page officielle présente les ingrédients et l’adéquation nutritionnelle.",
    },
    ingredients: [
      { name: { zh: "鸡肉", en: "Boneless chicken", fr: "Poulet désossé" }, ingredientId: "chicken" },
      { name: { zh: "马铃薯", en: "Potato", fr: "Pomme de terre" }, ingredientId: "potato" },
    ],
    nutritionFacts: [],
    sources: [
      {
        name: "FirstMate Free Run Chicken product page",
        url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    mapleBowlNotes: {
      zh: "官方页面的保证分析表需要在发布前再次核对；当前空表用于验证缺失营养数据时的页面表现。",
      en: "The guaranteed analysis should be checked again before publication; the empty table validates the missing-data state.",
      fr: "L’analyse garantie doit être revérifiée avant publication; le tableau vide sert à valider l’état de données manquantes.",
    },
    lastVerifiedAt: "2026-09-01",
    status: "draft",
  },
  {
    id: "go-digestion-salmon",
    slug: "go-digestion-salmon",
    brandId: "go-solutions",
    name: {
      zh: "Digestion + Gut Health 三文鱼与古老谷物配方",
      en: "Digestion + Gut Health Salmon Recipe with Ancient Grains",
      fr: "Recette Digestion + Gut Health au saumon et aux céréales anciennes",
    },
    species: ["dog"],
    foodType: "dry",
    lifeStages: ["puppy", "adult", "senior"],
    description: {
      zh: "GO! SOLUTIONS 的狗粮配方示例，官方页面提供配料、保证分析和热量信息。",
      en: "A GO! SOLUTIONS dog food recipe with ingredients, guaranteed analysis, and calorie information on the official page.",
      fr: "Une recette GO! SOLUTIONS pour chiens avec ingrédients, analyse garantie et calories sur la page officielle.",
    },
    ingredients: [
      { name: { zh: "三文鱼粉", en: "Salmon meal", fr: "Farine de saumon" }, ingredientId: "salmon-meal" },
      { name: { zh: "燕麦片", en: "Oatmeal", fr: "Flocons d’avoine" }, ingredientId: "oatmeal" },
    ],
    nutritionFacts: [
      {
        label: { zh: "粗蛋白", en: "Crude protein", fr: "Protéines brutes" },
        value: "24",
        qualifier: "minimum",
        unit: "%",
      },
      {
        label: { zh: "粗脂肪", en: "Crude fat", fr: "Matières grasses brutes" },
        value: "12",
        qualifier: "minimum",
        unit: "%",
      },
      { label: { zh: "粗纤维", en: "Crude fibre", fr: "Fibres brutes" }, value: "5", qualifier: "maximum", unit: "%" },
      { label: { zh: "水分", en: "Moisture", fr: "Humidité" }, value: "10", qualifier: "maximum", unit: "%" },
      { label: { zh: "钙", en: "Calcium", fr: "Calcium" }, value: "1.2", qualifier: "minimum", unit: "%" },
      { label: { zh: "磷", en: "Phosphorus", fr: "Phosphore" }, value: "1", qualifier: "minimum", unit: "%" },
    ],
    sources: [
      {
        name: "GO! SOLUTIONS product page",
        url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains",
        kind: "manufacturer",
        accessedAt: "2026-09-01",
      },
    ],
    mapleBowlNotes: {
      zh: "营养保证分析是产品标签的一部分，不等同于针对单只宠物的喂养建议。",
      en: "Guaranteed analysis is part of the product label and is not individualized feeding advice.",
      fr: "L’analyse garantie fait partie de l’étiquette du produit et ne constitue pas un conseil alimentaire personnalisé.",
    },
    lastVerifiedAt: "2026-09-01",
    status: "draft",
  },
];
