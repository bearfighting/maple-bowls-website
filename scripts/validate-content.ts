import { validateContent } from "../lib/content-validation";

const counts = validateContent();
console.log(
  "Validated " +
    counts.brands +
    " brands, " +
    counts.products +
    " products, " +
    counts.ingredients +
    " ingredients, " +
    counts.topics +
    " nutrition topics, and " +
    counts.guides +
    " guides.",
);
