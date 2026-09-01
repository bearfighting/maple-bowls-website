import { Badge } from "@/components/ui/badge";
import type { ContentStatus } from "@/lib/types";

export function ContentStatusBadge({
  status,
  labels,
}: {
  status: ContentStatus;
  labels: Record<ContentStatus, string>;
}) {
  return <Badge variant={status === "draft" ? "secondary" : "default"}>{labels[status]}</Badge>;
}
