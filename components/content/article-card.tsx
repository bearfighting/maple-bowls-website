import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";

export function ArticleCard({
  href,
  title,
  summary,
  label,
}: {
  href: string;
  title: string;
  summary: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full p-5 transition-transform group-hover:-translate-y-1">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">{label}</p>
        <h2 className="mt-3 font-display text-xl font-bold">{title}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{summary}</p>
      </Card>
    </Link>
  );
}
