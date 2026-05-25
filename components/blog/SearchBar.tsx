import { Search } from "lucide-react";

export function SearchBar({
  action = "/learn",
  defaultValue = "",
  placeholder = "Search CT, ultrasound, or findings"
}: {
  action?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <form action={action} className="relative w-full max-w-xl">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-field pl-11"
      />
    </form>
  );
}
