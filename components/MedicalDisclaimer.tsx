import { AlertTriangle } from "lucide-react";
import { medicalDisclaimer } from "@/lib/constants";

export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 text-amber-950 shadow-sm transition-colors duration-300 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-100 ${
        compact ? "p-4 text-sm" : "p-5 text-sm"
      }`}
    >
      <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
      <p>{medicalDisclaimer}</p>
    </div>
  );
}
