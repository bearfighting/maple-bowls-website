export type Locale = "zh" | "en" | "fr";

export type Species = "dog" | "cat";

export type PetPreference = "dog" | "cat" | "both" | "unset";

export type ContentStatus = "draft" | "verified";

export type FoodType =
  | "dry"
  | "wet"
  | "raw"
  | "freeze-dried"
  | "air-dried"
  | "dehydrated"
  | "fresh"
  | "treat"
  | "topper"
  | "other";

export type Source = {
  name: string;
  url: string;
  kind: "manufacturer" | "official" | "editorial";
  accessedAt?: string;
};

export type NutritionFact = {
  label: LocalizedText;
  value?: string;
  qualifier?: "minimum" | "maximum" | "typical";
  unit?: string;
};

export type Brand = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  country?: string;
  logo?: string;
  sources: Source[];
  status: ContentStatus;
};

export type ProductIngredient = {
  name: LocalizedText;
  ingredientId?: string;
};

export type Product = {
  id: string;
  slug: string;
  brandId: string;
  name: LocalizedText;
  species: Species[];
  foodType: FoodType;
  lifeStages: string[];
  description: LocalizedText;
  image?: string;
  ingredients: ProductIngredient[];
  nutritionFacts: NutritionFact[];
  sources: Source[];
  mapleBowlNotes?: LocalizedText;
  lastVerifiedAt?: string;
  status: ContentStatus;
};

export type Ingredient = {
  id: string;
  slug: string;
  name: LocalizedText;
  aliases: string[];
  category?: string;
  description: LocalizedText;
  sources: Source[];
  status: ContentStatus;
};

export type NutritionTopic = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  speciesScope: Species[] | "both";
  sources: Source[];
  status: ContentStatus;
};

export type Guide = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  topicId?: string;
  relatedProductIds: string[];
  relatedIngredientIds: string[];
  sources: Source[];
  status: ContentStatus;
};

export type Review = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  productId?: string;
  publishedAt: string;
  updatedAt?: string;
  sources: Source[];
};

export type LocalizedText = {
  zh: string;
  en?: string;
  fr?: string;
};
