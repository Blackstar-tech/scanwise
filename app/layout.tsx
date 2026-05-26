import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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

const themeInitScript = `
try {
  const theme = localStorage.getItem("scanwise-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", theme ? theme === "dark" : prefersDark);
} catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
