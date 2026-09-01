import { SectionContainer } from "@/components/ui/section-container";

export default function LocaleLoading() {
  return (
    <SectionContainer>
      <div className="h-8 w-2/3 animate-pulse rounded-xl bg-muted" aria-hidden="true" />
      <div className="mt-6 h-24 max-w-3xl animate-pulse rounded-xl bg-muted" aria-hidden="true" />
    </SectionContainer>
  );
}
