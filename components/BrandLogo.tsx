import { appName } from "@/lib/constants";

const markSizes = {
  sm: "size-9",
  md: "size-10"
};

const svgSizes = {
  sm: 21,
  md: 23
};

type BrandLogoProps = {
  markSize?: keyof typeof markSizes;
  showWordmark?: boolean;
};

export function BrandLogo({ markSize = "md", showWordmark = true }: BrandLogoProps) {
  return (
    <>
      <span
        className={`grid ${markSizes[markSize]} place-items-center rounded-2xl bg-medical-blue text-white shadow-[0_12px_26px_rgba(21,94,239,0.25)] dark:bg-sky-500`}
        aria-hidden="true"
      >
        <svg
          width={svgSizes[markSize]}
          height={svgSizes[markSize]}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 7H7v6M21 7h4v6M7 19v6h6M25 19v6h-6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 11.5h7a2 2 0 0 1 2 2v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.42"
          />
          <path
            d="M8.5 16.5h4.7l1.9-4.6 3.5 9.5 2-4.9h3"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark ? <span>{appName}</span> : null}
    </>
  );
}
