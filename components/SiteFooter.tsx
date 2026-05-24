import Link from "next/link";
import { Activity } from "lucide-react";
import { appName } from "@/lib/constants";

const footerBullets = [
  "Private report storage",
  "CT and ultrasound only",
  "Plain English explanations",
  "Educational, not diagnostic"
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-2xl font-semibold heading-text">
            <span className="grid size-9 place-items-center rounded-2xl bg-medical-blue text-white">
              <Activity aria-hidden="true" size={18} />
            </span>
            {appName}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 body-text">
            Helping patients read radiology reports with calmer, clearer language.
          </p>
        </div>

        <ul className="grid gap-2 text-sm font-medium text-slate-700 sm:grid-cols-2 dark:text-slate-300">
          {footerBullets.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-medical-blue dark:bg-sky-300" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <nav className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="focus-ring rounded-xl text-medical-blue hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200" href="/upload">
            Upload
          </Link>
          <Link className="focus-ring rounded-xl text-medical-blue hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200" href="/dashboard">
            Dashboard
          </Link>
          <Link className="focus-ring rounded-xl text-medical-blue hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200" href="/auth">
            Login
          </Link>
        </nav>
      </div>
    </footer>
  );
}
