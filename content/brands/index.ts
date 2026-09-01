import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  {
    id: "open-farm",
    slug: "open-farm",
    name: { zh: "Open Farm", en: "Open Farm", fr: "Open Farm" },
    description: {
      zh: "一家以透明溯源和宠物食品配方为重点的加拿大品牌。",
      en: "A Canadian pet food brand focused on traceability and thoughtfully made recipes.",
      fr: "Une marque canadienne axée sur la traçabilité et des recettes réfléchies.",
    },
    country: "Canada",
    status: "draft",
    sources: [{ name: "Open Farm", url: "https://openfarmpet.com/", kind: "manufacturer", accessedAt: "2026-09-01" }],
  },
  {
    id: "firstmate",
    slug: "firstmate",
    name: { zh: "FirstMate", en: "FirstMate", fr: "FirstMate" },
    description: {
      zh: "一家总部位于加拿大、提供狗粮和猫粮的宠物食品品牌。",
      en: "A Canadian pet food brand offering food for dogs and cats.",
      fr: "Une marque canadienne d’aliments pour chiens et chats.",
    },
    country: "Canada",
    status: "draft",
    sources: [{ name: "FirstMate Pet Foods", url: "https://firstmate.com/", kind: "manufacturer", accessedAt: "2026-09-01" }],
  },
  {
    id: "go-solutions",
    slug: "go-solutions",
    name: { zh: "GO! SOLUTIONS", en: "GO! SOLUTIONS", fr: "GO! SOLUTIONS" },
    description: {
      zh: "Petcurean 旗下的宠物食品系列，提供针对不同需求的配方。",
      en: "A Petcurean pet food line with recipes designed around different needs.",
      fr: "Une gamme Petcurean proposant des recettes conçues pour différents besoins.",
    },
    country: "Canada",
    status: "draft",
    sources: [{ name: "GO! SOLUTIONS", url: "https://go-solutions.com/en-us/", kind: "manufacturer", accessedAt: "2026-09-01" }],
  },
];
