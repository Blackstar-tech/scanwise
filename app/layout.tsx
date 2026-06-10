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

const extensionAttributeCleanupScript = `
(function () {
  var extensionAttributes = ["bis_skin_checked"];

  function removeExtensionAttributes(node) {
    if (!node || node.nodeType !== 1) {
      return;
    }

    extensionAttributes.forEach(function (attribute) {
      if (node.hasAttribute(attribute)) {
        node.removeAttribute(attribute);
      }
    });

    if (!node.querySelectorAll) {
      return;
    }

    extensionAttributes.forEach(function (attribute) {
      node.querySelectorAll("[" + attribute + "]").forEach(function (element) {
        element.removeAttribute(attribute);
      });
    });
  }

  removeExtensionAttributes(document.documentElement);

  try {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes") {
          removeExtensionAttributes(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(removeExtensionAttributes);
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: extensionAttributes,
      childList: true,
      subtree: true
    });
  } catch {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script id="extension-attribute-cleanup" strategy="beforeInteractive">
          {extensionAttributeCleanupScript}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
