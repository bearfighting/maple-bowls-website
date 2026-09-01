import type { MetadataRoute } from "next";
import { getBrands, getGuides, getIngredients, getNutritionTopics, getProducts } from "@/lib/content";
import { getSiteUrl } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const indexablePaths = ["", "/about", "/methodology", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...indexablePaths,
    ...getBrands()
      .filter((brand) => brand.status === "verified")
      .map((brand) => `/brands/${brand.slug}`),
    ...getProducts()
      .filter((product) => product.status === "verified")
      .map((product) => `/food/${product.slug}`),
    ...getIngredients()
      .filter((ingredient) => ingredient.status === "verified")
      .map((ingredient) => `/ingredients/${ingredient.slug}`),
    ...getNutritionTopics()
      .filter((topic) => topic.status === "verified")
      .map((topic) => `/nutrition-guide/${topic.slug}`),
    ...getGuides()
      .filter((guide) => guide.status === "verified")
      .map((guide) => `/nutrition-guide/${guide.slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(`/${locale}${path}`, getSiteUrl()).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
