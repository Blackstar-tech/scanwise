import { ScanSearch } from "lucide-react";

export function CommonFindings({
  title,
  findings
}: {
  title: string;
  findings: string[];
}) {
  return (
    <section className="surface-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="icon-tile size-10">
          <ScanSearch aria-hidden="true" size={19} />
        </div>
        <h2 className="text-xl font-semibold heading-text">{title}</h2>
      </div>
      <ul className="grid gap-3">
        {findings.map((finding) => (
          <li key={finding} className="surface-muted px-4 py-3 text-sm leading-6 body-text">
            {finding}
          </li>
        ))}
      </ul>
    </section>
  );
}
