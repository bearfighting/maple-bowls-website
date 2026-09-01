import { ComingSoonPage } from "@/components/content/coming-soon-page";
import { getLocaleOrNotFound } from "@/lib/locale";
import { getComingSoonMetadata } from "@/lib/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleOrNotFound((await params).locale);
  return getComingSoonMetadata(locale, "search");
}
export default function SearchPage() {
  return <ComingSoonPage section="search" />;
}
