import type { LocalizedText, Locale, PetPreference, Species } from "@/lib/types";

export type SearchEntityType = "brand" | "product" | "ingredient" | "topic" | "guide";

export type SearchDocument = {
  readonly id: string;
  readonly type: SearchEntityType;
  readonly href: string;
  readonly title: LocalizedText;
  readonly summary?: LocalizedText;
  readonly aliases?: ReadonlyArray<string>;
  readonly species?: ReadonlyArray<Species> | "both";
};

export interface SearchRepository {
  listDocuments(): Promise<ReadonlyArray<SearchDocument>>;
}

export function validateSearchDocuments(documents: ReadonlyArray<SearchDocument>): void {
  const ids = new Set<string>();
  const issues: string[] = [];
  for (const document of documents) {
    if (!document.id.trim()) issues.push("Search document has an empty id");
    if (ids.has(document.id)) issues.push("Duplicate search document id: " + document.id);
    ids.add(document.id);
    if (!document.href.startsWith("/") || document.href.startsWith("//")) {
      issues.push("Search document has an invalid href: " + document.id);
    }
    if (!Object.values(document.title).some((value) => value?.trim())) {
      issues.push("Search document has no title: " + document.id);
    }
  }
  if (issues.length > 0) throw new Error("Invalid search documents:\n" + issues.join("\n"));
}

export type SearchMatch = {
  readonly document: SearchDocument;
  readonly score: number;
};

export type SearchResult = {
  readonly query: string;
  readonly matches: ReadonlyArray<SearchMatch>;
  readonly total: number;
  readonly truncated: boolean;
};

const MAX_QUERY_LENGTH = 100;
const MAX_RESULTS = 50;
const typeOrder: Record<SearchEntityType, number> = {
  product: 0,
  brand: 1,
  ingredient: 2,
  guide: 3,
  topic: 4,
};

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchDocuments(
  documents: ReadonlyArray<SearchDocument>,
  query: string,
  locale: Locale,
  preference: PetPreference,
): SearchResult {
  const normalizedQuery = normalizeSearchText(query).slice(0, MAX_QUERY_LENGTH);
  if (!normalizedQuery) return { query: normalizedQuery, matches: [], total: 0, truncated: false };

  const matches = documents
    .map((document) => {
      const titleFields = Object.values(document.title).filter(Boolean).map(normalizeSearchText);
      const aliasFields = (document.aliases ?? []).map(normalizeSearchText).filter(Boolean);
      const titleScore = getFieldScore(titleFields, normalizedQuery, 0);
      const aliasScore = getFieldScore(aliasFields, normalizedQuery, 1);
      const baseScore = Math.max(titleScore, aliasScore);
      if (baseScore === 0) return undefined;

      const preferenceBoost = getPreferenceBoost(document.species, preference);
      const localeBoost = document.title[locale] ? 1 : 0;
      return { document, score: baseScore + preferenceBoost + localeBoost };
    })
    .filter((match): match is SearchMatch => Boolean(match))
    .sort((a, b) => {
      return (
        b.score - a.score ||
        typeOrder[a.document.type] - typeOrder[b.document.type] ||
        a.document.id.localeCompare(b.document.id, "en")
      );
    });

  return {
    query: normalizedQuery,
    matches: matches.slice(0, MAX_RESULTS),
    total: matches.length,
    truncated: matches.length > MAX_RESULTS,
  };
}

function getFieldScore(fields: ReadonlyArray<string>, query: string, aliasPenalty: number): number {
  return fields.reduce((best, field) => {
    if (field === query) return Math.max(best, 400 - aliasPenalty * 20);
    if (field.startsWith(query)) return Math.max(best, 300 - aliasPenalty * 20);
    const tokens = query.split(" ").filter(Boolean);
    if (tokens.length > 1 && tokens.every((token) => field.includes(token))) {
      return Math.max(best, 240 - aliasPenalty * 20);
    }
    if (field.includes(query)) return Math.max(best, 160 - aliasPenalty * 20);
    return best;
  }, 0);
}

function getPreferenceBoost(species: SearchDocument["species"], preference: PetPreference): number {
  if (!species || species === "both" || preference === "both" || preference === "unset") return 0;
  return species.includes(preference) ? 20 : 0;
}
