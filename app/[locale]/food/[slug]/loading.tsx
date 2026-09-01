import { SectionContainer } from "@/components/ui/section-container";

export default function ProductLoading() {
  return (
    <SectionContainer>
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-muted" />
      <div className="mt-6 h-24 max-w-2xl animate-pulse rounded-xl bg-muted" />
    </SectionContainer>
  );
}
