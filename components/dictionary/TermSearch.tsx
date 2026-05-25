import { Search } from "lucide-react";

export function TermSearch({
  defaultValue = ""
}: {
  defaultValue?: string;
}) {
  return (
    <form action="/dictionary" className="relative w-full max-w-xl">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search terms like cyst, nodule, contrast"
        className="input-field pl-11"
      />
    </form>
  );
}
