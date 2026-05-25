import Link from "next/link";
import { Activity, BookOpenText, Boxes, LibraryBig, LogIn, Upload } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { appName } from "@/lib/constants";

const contentLinks = [
  { href: "/learn", label: "Learn", icon: BookOpenText },
  { href: "/anatomy", label: "Anatomy Explorer", icon: Boxes },
  { href: "/dictionary", label: "Scan Dictionary", icon: LibraryBig }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#07111f]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-2xl font-semibold text-ink transition-colors dark:text-white">
          <span className="grid size-10 place-items-center rounded-2xl bg-medical-blue text-white shadow-[0_12px_26px_rgba(21,94,239,0.25)]">
            <Activity aria-hidden="true" size={20} />
          </span>
          <span>{appName}</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <div className="hidden items-center gap-1 lg:flex">
            {contentLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="focus-ring inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-slate-700 transition-colors hover:bg-ice-blue dark:text-slate-200 dark:hover:bg-white/10"
              >
                <Icon aria-hidden="true" size={16} />
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/auth"
            className="focus-ring hidden items-center gap-2 rounded-2xl px-3 py-2 text-slate-700 transition-colors hover:bg-ice-blue sm:flex dark:text-slate-200 dark:hover:bg-white/10"
          >
            <LogIn aria-hidden="true" size={16} />
            Login
          </Link>
          <ThemeToggle />
          <Link
            href="/upload"
            className="focus-ring primary-action px-3 py-2"
          >
            <Upload aria-hidden="true" size={16} />
            Upload Report
          </Link>
        </nav>
      </div>
      <nav className="border-t border-line/70 bg-white/95 px-4 py-2 sm:px-6 lg:hidden dark:border-white/10 dark:bg-[#07111f]" aria-label="Content navigation">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {contentLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-2xl bg-ice-blue px-3 py-2 text-sm font-semibold text-medical-blue-dark transition-colors hover:bg-blue-100 dark:bg-sky-400/10 dark:text-sky-200 dark:hover:bg-sky-400/20"
            >
              <Icon aria-hidden="true" size={16} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
