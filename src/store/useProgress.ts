import { useSyncExternalStore } from "react";
import { createProgressStore, type StorageLike } from "./progress.js";

function safeStorage(): StorageLike | null {
  try {
    const probe = "__si__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

export const progressStore = createProgressStore(typeof window !== "undefined" ? safeStorage() : null);

export function useProgress() {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getSnapshot);
}
