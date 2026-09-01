import fs from "node:fs";

const locales = ["en", "fr", "zh"] as const;

function getKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [prefix.slice(0, -1)];
  return Object.entries(value).flatMap(([key, child]) => getKeys(child, `${prefix}${key}.`));
}

const keySets = locales.map((locale) => {
  const messages = JSON.parse(fs.readFileSync(`messages/${locale}.json`, "utf8")) as unknown;
  return { locale, keys: new Set(getKeys(messages)) };
});
const reference = keySets[0];
const differences = keySets.flatMap(({ locale, keys }) => [
  ...[...reference.keys].filter((key) => !keys.has(key)).map((key) => `${locale} is missing ${key}`),
  ...[...keys].filter((key) => !reference.keys.has(key)).map((key) => `${locale} has unexpected ${key}`),
]);

if (differences.length > 0) throw new Error(`Message key mismatch:\n${differences.join("\n")}`);
console.log(`Validated ${reference.keys.size} UI translation keys across ${locales.join(", ")}.`);
