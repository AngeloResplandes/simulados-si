import { useSyncExternalStore } from "react";

export const THEME_KEY = "si-tema";
export type Theme = "light" | "dark";

const media = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
const listeners = new Set<() => void>();

function readPreference(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function effectiveTheme(): Theme {
  return readPreference() || (media?.matches ? "dark" : "light");
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const color = theme === "dark" ? "#11151C" : "#F7F4EE";
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute("content", color));
}

media?.addEventListener("change", () => {
  if (!readPreference()) {
    apply(effectiveTheme());
    listeners.forEach((listener) => listener());
  }
});

export function initTheme() {
  apply(effectiveTheme());
}

export function toggleTheme() {
  const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* sem armazenamento: vale só nesta visita */
  }
  apply(next);
  listeners.forEach((listener) => listener());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    effectiveTheme,
    () => "light"
  );
}
