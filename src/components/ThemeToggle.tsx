"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) document.body.classList.add("dark");
    return isDark;
  });

  function toggle() {
    const next = !dark;
    setDark(next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="border border-vibe-border dark:border-vibe-border-dark rounded-[4px] px-2 py-1 text-xs text-vibe-muted hover:border-vibe-accent transition-colors cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
