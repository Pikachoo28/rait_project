"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { MoonIcon, SunIcon } from "./Icons";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-[7.5rem] rounded-full border border-border/40 bg-surface/80" />
    );
  }

  const nextThemeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextThemeLabel}
      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/90 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
    >
      {theme === "light" ? (
        <>
          <MoonIcon className="h-4 w-4" />
          Dark mode
        </>
      ) : (
        <>
          <SunIcon className="h-4 w-4" />
          Light mode
        </>
      )}
    </button>
  );
};
