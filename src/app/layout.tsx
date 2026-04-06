import type { Metadata } from "next";
import { ReactNode } from "react";

import "@/app/globals.css";
import { MetricsProvider } from "@/context/MetricsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Metric Configuration Wizard",
  description: "Production-ready metric configuration flow built with Next.js 14."
};

interface RootLayoutProps {
  children: ReactNode;
}

const themeBootScript = `
  (() => {
    const storageKey = "rait-theme";
    const storedTheme = window.localStorage.getItem(storageKey);
    const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : fallbackTheme;
    document.documentElement.dataset.theme = theme;
  })();
`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <ThemeProvider>
          <MetricsProvider>
            <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-6 flex justify-end">
                <ThemeToggle />
              </div>
              {children}
            </div>
          </MetricsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
