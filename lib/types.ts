export type Locale = "zh" | "en" | "fr";

export type Species = "dog" | "cat";

export type PetPreference = "dog" | "cat" | "both" | "unset";

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
  accessedAt?: string;
};

export type NutritionFact = {
  label: string;
  value?: string;
  qualifier?: "minimum" | "maximum" | "typical";
  unit?: string;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  description: string;
  country?: string;
  logo?: string;
};

export type Product = {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  species: Species[];
  foodType: FoodType;
  lifeStages: string[];
  description: string;
  image?: string;
  ingredients: string;
  nutritionFacts: NutritionFact[];
  sources: Source[];
};
