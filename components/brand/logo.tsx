import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function Logo({ homeLabel }: { homeLabel: string }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={homeLabel}
    >
      <Image src="/brand/favicon.png" alt="" width={42} height={42} className="size-10 object-contain" priority />
      <span className="font-display text-2xl font-bold tracking-tight text-foreground">
        Maple <span className="text-primary">Bowl</span>
      </span>
    </Link>
  );
}
