import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "ScanWise | Understand CT & Ultrasound Reports",
  description:
    "Plain English explanations, report timelines, and doctor questions for CT and ultrasound radiology reports."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("scanwise-theme");const d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch{}`,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
