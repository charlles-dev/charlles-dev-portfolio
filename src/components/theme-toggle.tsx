"use client";

import { useState } from "react";

export function ThemeToggle({ label }: { label: string }) {
  const [light, setLight] = useState(false);

  function toggleTheme() {
    const nextLight = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    window.localStorage.setItem("charlles-theme", nextLight ? "light" : "dark");
    setLight(nextLight);
  }

  return (
    <button type="button" aria-label={label} aria-pressed={light} className="theme-toggle" onClick={toggleTheme}>
      <span aria-hidden="true">{light ? "☼" : "◐"}</span>
      <span className="sr-only">{light ? "Light theme" : "Dark theme"}</span>
    </button>
  );
}
