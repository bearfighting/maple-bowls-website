export type Locale = "zh" | "en" | "fr";

export type Species = "dog" | "cat";

export type PetPreference = "dog" | "cat" | "both" | "unset";

export type ContentStatus = "draft" | "verified";

export type LifeStage = "all-life-stages" | "puppy" | "adult" | "senior";

export type FoodType =
  "dry" | "wet" | "raw" | "freeze-dried" | "air-dried" | "dehydrated" | "fresh" | "treat" | "topper" | "other";

export type Source = {
  readonly name: string;
  readonly url: string;
  readonly kind: "manufacturer" | "official" | "editorial";
  readonly accessedAt?: string;
};

export type NutritionFact = {
  readonly label: LocalizedText;
  readonly value?: string;
  readonly qualifier?: "minimum" | "maximum" | "typical";
  readonly unit?: string;
};

export type Brand = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  country?: string;
  logo?: string;
  readonly sources: ReadonlyArray<Source>;
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
  readonly species: ReadonlyArray<Species>;
  foodType: FoodType;
  readonly lifeStages: ReadonlyArray<LifeStage>;
  description: LocalizedText;
  image?: string;
  readonly ingredients: ReadonlyArray<ProductIngredient>;
  readonly nutritionFacts: ReadonlyArray<NutritionFact>;
  readonly sources: ReadonlyArray<Source>;
  mapleBowlNotes?: LocalizedText;
  lastVerifiedAt?: string;
  status: ContentStatus;
};

export type Ingredient = {
  id: string;
  slug: string;
  name: LocalizedText;
  readonly aliases: ReadonlyArray<string>;
  category?: string;
  description: LocalizedText;
  readonly sources: ReadonlyArray<Source>;
  status: ContentStatus;
};

export type NutritionTopic = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  readonly speciesScope: ReadonlyArray<Species> | "both";
  readonly sources: ReadonlyArray<Source>;
  status: ContentStatus;
};

export type Guide = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  topicId?: string;
  readonly relatedProductIds: ReadonlyArray<string>;
  readonly relatedIngredientIds: ReadonlyArray<string>;
  readonly sources: ReadonlyArray<Source>;
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
