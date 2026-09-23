/* The single source of truth for how the theme is stored and resolved.

   Both the blocking <head> script and the React toggle read this file, so the
   storage key and the resolution rule can never disagree between them — a
   mismatch there is invisible in dev and shows up as a flash in production. */

/** What the page actually renders as. */
export type Theme = "light" | "dark";

/** What the user chose. "system" defers to the OS, and is the default. */
export type ThemePreference = Theme | "system";

export const THEME_STORAGE_KEY = "jho-theme";
export const THEME_ATTRIBUTE = "data-theme";
export const DARK_QUERY = "(prefers-color-scheme: dark)";

export const THEME_PREFERENCES: readonly ThemePreference[] = ["system", "light", "dark"];

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

/** Reads the stored choice. "system" whenever storage is empty or unreadable
    (Safari private mode, blocked site data), which is also the default. */
export function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

export function systemTheme(): Theme {
  return typeof matchMedia === "function" && matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function resolveTheme(preference: ThemePreference): Theme {
  return preference === "system" ? systemTheme() : preference;
}

/** Paints the choice onto <html>. `colorScheme` is what makes the UA render
    scrollbars, form controls and the overscroll gutter in the right mode;
    Tailwind's preflight does not set it. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.style.colorScheme = theme;
}

/* --- The preference as an external store ---------------------------------

   The theme lives in localStorage and the OS, not in React, so components
   read it through useSyncExternalStore rather than mirroring it into state.
   That is what lets the server render "system" and the client swap to the
   real value during hydration without a mismatch — and it keeps every tab
   and every mounted toggle agreeing with each other. */

const listeners = new Set<() => void>();

export function subscribeToPreference(onChange: () => void): () => void {
  listeners.add(onChange);

  // The OS flipping matters only while the preference is "system", but the
  // DOM has to follow immediately either way.
  const query = matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    applyTheme(resolveTheme(readPreference()));
    onChange();
  };
  query.addEventListener("change", onSystemChange);

  // Another tab writing the key. Same-tab writes go through writePreference,
  // because `storage` does not fire in the tab that caused it.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
    applyTheme(resolveTheme(readPreference()));
    onChange();
  };
  addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onSystemChange);
    removeEventListener("storage", onStorage);
  };
}

/** Server snapshot. Must match what the layout renders, or hydration differs. */
export function serverPreference(): ThemePreference {
  return "system";
}

export function writePreference(next: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Site data blocked — the choice still applies for this page view.
  }
  applyTheme(resolveTheme(next));
  for (const listener of listeners) listener();
}

/* Runs synchronously while the browser parses <head>, before the first paint.
   Anything deferred to an effect — even useLayoutEffect — paints the server's
   guess first on a slow connection, because the browser gets to the HTML long
   before React hydrates.

   Minified by hand: it ships inline in every document, and a build step
   cannot reach it. Everything is wrapped in try/catch because localStorage
   throws outright when site data is blocked. */
export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)}),t=p==="dark"||(p!=="light"&&matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches)?"dark":"light",e=document.documentElement;e.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},t);e.style.colorScheme=t}catch(e){}})()`;
