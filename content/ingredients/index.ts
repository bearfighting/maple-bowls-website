import type { Ingredient } from "@/lib/types";

export const ingredients: Ingredient[] = [
  {
    id: "salmon-meal",
    slug: "salmon-meal",
    name: { zh: "三文鱼粉", en: "Salmon meal", fr: "Farine de saumon" },
    aliases: ["salmon meal", "farine de saumon"],
    category: "animal-protein",
    description: {
      zh: "经过处理、去除大部分水分的三文鱼原料。具体组成取决于原料和加工方式。",
      en: "A rendered salmon ingredient with much of its water removed. Its composition depends on the source and processing.",
      fr: "Un ingrédient de saumon transformé dont une grande partie de l’eau a été retirée.",
    },
    sources: [{ name: "GO! SOLUTIONS product page", url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "chicken",
    slug: "chicken",
    name: { zh: "鸡肉", en: "Chicken", fr: "Poulet" },
    aliases: ["boneless chicken", "chicken"],
    category: "animal-protein",
    description: {
      zh: "产品配方中常见的动物性原料，需要结合完整配料表和产品信息理解。",
      en: "An animal ingredient commonly used in pet food recipes. Read it alongside the full product information.",
      fr: "Un ingrédient d’origine animale courant dans les recettes pour animaux.",
    },
    sources: [{ name: "FirstMate product page", url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "oatmeal",
    slug: "oatmeal",
    name: { zh: "燕麦片", en: "Oatmeal", fr: "Flocons d’avoine" },
    aliases: ["oatmeal", "whole oats"],
    category: "grain",
    description: {
      zh: "一种谷物原料，具体作用和含量需要结合完整配方判断。",
      en: "A grain ingredient whose role and amount should be considered in the context of the complete recipe.",
      fr: "Un ingrédient céréalier à interpréter dans le contexte de la recette complète.",
    },
    sources: [{ name: "GO! SOLUTIONS product page", url: "https://go-solutions.com/en/dog-food/dry/digestion-gut-health-salmon-recipe-with-ancient-grains", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "brown-rice",
    slug: "brown-rice",
    name: { zh: "糙米", en: "Brown rice", fr: "Riz brun" },
    aliases: ["brown rice", "riz brun"],
    category: "grain",
    description: {
      zh: "一种谷物原料，不能仅凭单一配料判断完整饮食是否适合某只宠物。",
      en: "A grain ingredient. A single ingredient cannot determine whether a complete diet suits an individual pet.",
      fr: "Un ingrédient céréalier qui ne suffit pas à déterminer si une alimentation convient à un animal.",
    },
    sources: [{ name: "Open Farm product page", url: "https://openfarmpet.com/products/goodbowl-grass-fed-beef-brown-rice-recipe-for-dogs", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
  {
    id: "potato",
    slug: "potato",
    name: { zh: "马铃薯", en: "Potato", fr: "Pomme de terre" },
    aliases: ["potato", "pomme de terre"],
    category: "starch",
    description: {
      zh: "一种淀粉类植物原料，需要结合配方和产品整体信息理解。",
      en: "A starchy plant ingredient whose meaning depends on the full recipe and product context.",
      fr: "Un ingrédient végétal riche en amidon à considérer dans le contexte de la recette complète.",
    },
    sources: [{ name: "FirstMate product page", url: "https://firstmate.com/product/free-run-chicken-formula-for-dogs/", kind: "manufacturer", accessedAt: "2026-09-01" }],
    status: "draft",
  },
];
