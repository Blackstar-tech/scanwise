import type { Organ } from "@/lib/content/organs";
import { OrganCard } from "@/components/anatomy/OrganCard";

export function OrganGrid({ organs }: { organs: Organ[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {organs.map((organ) => (
        <OrganCard key={organ.slug} organ={organ} />
      ))}
    </div>
  );
}
