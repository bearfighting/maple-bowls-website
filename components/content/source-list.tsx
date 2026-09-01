import type { Source } from "@/lib/types";

export function SourceList({ sources, labels, lastVerifiedAt }: { sources: Source[]; labels: { title: string; manufacturer: string; official: string; editorial: string; accessed: string; lastVerified: string }; lastVerifiedAt?: string }) {
  const kindLabels = { manufacturer: labels.manufacturer, official: labels.official, editorial: labels.editorial };
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">{labels.title}</h2>
      {lastVerifiedAt && <p className="mt-2 text-sm text-muted-foreground">{labels.lastVerified}: {lastVerifiedAt}</p>}
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.url} className="text-sm">
            <a href={source.url} target="_blank" rel="noreferrer noopener" className="font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {source.name}
            </a>
            <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">{kindLabels[source.kind]}</span>
            {source.accessedAt && <span className="ml-2 text-muted-foreground">({labels.accessed}: {source.accessedAt})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
