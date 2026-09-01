import { getBrands, getGuides, getIngredients, getNutritionTopics, getProducts } from "@/lib/content";
import {
  validateSearchDocuments,
  type SearchDocument,
  type SearchEntityType,
  type SearchRepository,
} from "@/lib/search";
import type { LocalizedText, Species } from "@/lib/types";

const staticSearchRepository: SearchRepository = {
  async listDocuments() {
    const brands = getBrands().map((brand) =>
      document("brand", brand.id, `/brands/${brand.slug}`, brand.name, brand.description),
    );
    const products = getProducts().map((product) =>
      document(
        "product",
        product.id,
        `/food/${product.slug}`,
        product.name,
        product.description,
        undefined,
        product.species,
      ),
    );
    const ingredients = getIngredients().map((ingredient) =>
      document(
        "ingredient",
        ingredient.id,
        `/ingredients/${ingredient.slug}`,
        ingredient.name,
        ingredient.description,
        ingredient.aliases,
      ),
    );
    const topics = getNutritionTopics().map((topic) =>
      document(
        "topic",
        topic.id,
        `/nutrition-guide/${topic.slug}`,
        topic.title,
        topic.summary,
        undefined,
        topic.speciesScope,
      ),
    );
    const guides = getGuides().map((guide) =>
      document("guide", guide.id, `/nutrition-guide/${guide.slug}`, guide.title, guide.summary),
    );
    return [...brands, ...products, ...ingredients, ...topics, ...guides];
  },
};

export function getSearchRepository(): SearchRepository {
  return staticSearchRepository;
}

export async function getSearchDocuments(): Promise<ReadonlyArray<SearchDocument>> {
  const documents = await getSearchRepository().listDocuments();
  validateSearchDocuments(documents);
  return documents;
}

function document(
  type: SearchEntityType,
  id: string,
  href: string,
  title: LocalizedText,
  summary?: LocalizedText,
  aliases?: ReadonlyArray<string>,
  species?: ReadonlyArray<Species> | "both",
): SearchDocument {
  return { type, id, href, title, summary, aliases, species };
}
