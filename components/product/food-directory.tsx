"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product/product-card";
import { PET_PREFERENCE_CHANGE_EVENT, PET_PREFERENCE_COOKIE, sortProductsByPreference } from "@/lib/pet-preference";
import type { FoodType, LifeStage, Locale, PetPreference, Product, Species } from "@/lib/types";

type ProductWithBrand = { product: Product; brandName: string };

const speciesValues: Array<Species | "all"> = ["all", "dog", "cat"];
const foodTypeValues: Array<FoodType | "all"> = [
  "all",
  "dry",
  "wet",
  "raw",
  "freeze-dried",
  "air-dried",
  "dehydrated",
  "fresh",
  "treat",
  "topper",
  "other",
];
const lifeStageValues: Array<LifeStage | "all"> = ["all", "all-life-stages", "puppy", "adult", "senior"];

export function FoodDirectory({
  products,
  locale,
  labels,
  emptyLabel,
  initialSpecies = "all",
  initialFoodType = "all",
  initialLifeStage = "all",
}: {
  products: ReadonlyArray<ProductWithBrand>;
  locale: Locale;
  labels: {
    species: Record<Species, string>;
    foodType: Record<FoodType, string>;
    lifeStages: Record<string, string>;
    status: Record<"draft" | "verified", string>;
  };
  emptyLabel: string;
  initialSpecies?: Species | "all";
  initialFoodType?: FoodType | "all";
  initialLifeStage?: LifeStage | "all";
}) {
  const t = useTranslations("Filter");
  const [species, setSpecies] = useState(initialSpecies);
  const [foodType, setFoodType] = useState(initialFoodType);
  const [lifeStage, setLifeStage] = useState(initialLifeStage);
  const [preference, setPreference] = useState<PetPreference>("unset");

  useEffect(() => {
    function syncPreference() {
      const value = document.cookie
        .split(";")
        .map((part) => part.trim().split("="))
        .find(([name]) => name === PET_PREFERENCE_COOKIE)?.[1];
      if (value === "dog" || value === "cat" || value === "both" || value === "unset") setPreference(value);
    }

    const timer = window.setTimeout(syncPreference, 0);
    window.addEventListener(PET_PREFERENCE_CHANGE_EVENT, syncPreference);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(PET_PREFERENCE_CHANGE_EVENT, syncPreference);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(({ product }) => {
      const matchesSpecies = species === "all" || product.species.includes(species);
      const matchesFoodType = foodType === "all" || product.foodType === foodType;
      const matchesLifeStage = lifeStage === "all" || product.lifeStages.includes(lifeStage);
      return matchesSpecies && matchesFoodType && matchesLifeStage;
    });
    return sortProductsByPreference(filtered, preference);
  }, [foodType, lifeStage, preference, products, species]);

  function clearFilters() {
    setSpecies("all");
    setFoodType("all");
    setLifeStage("all");
    window.history.replaceState(null, "", window.location.pathname);
  }

  function updateFilter(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    if (value === "all") params.delete(name);
    else params.set(name, value);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }

  return (
    <>
      <div className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="font-display text-xl font-bold">{t("title")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <FilterSelect
            label={t("species")}
            value={species}
            onChange={(value) => {
              setSpecies(value as Species | "all");
              updateFilter("species", value);
            }}
            options={speciesValues.map((value) => ({
              value,
              label: value === "all" ? t("all") : labels.species[value],
            }))}
          />
          <FilterSelect
            label={t("foodType")}
            value={foodType}
            onChange={(value) => {
              setFoodType(value as FoodType | "all");
              updateFilter("foodType", value);
            }}
            options={foodTypeValues.map((value) => ({
              value,
              label: value === "all" ? t("all") : labels.foodType[value],
            }))}
          />
          <FilterSelect
            label={t("lifeStage")}
            value={lifeStage}
            onChange={(value) => {
              setLifeStage(value as LifeStage | "all");
              updateFilter("lifeStage", value);
            }}
            options={lifeStageValues.map((value) => ({
              value,
              label: value === "all" ? t("all") : labels.lifeStages[value],
            }))}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{t("showing", { count: visibleProducts.length })}</span>
          {(species !== "all" || foodType !== "all" || lifeStage !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("clear")}
            </button>
          )}
        </div>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map(({ product, brandName }) => (
            <ProductCard key={product.id} product={product} brandName={brandName} locale={locale} labels={labels} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-xl border border-border bg-background px-3 font-sans font-normal text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
