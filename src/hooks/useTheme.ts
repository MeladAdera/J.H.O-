"use client";

import { useSyncExternalStore } from "react";
import {
  readPreference,
  resolveTheme,
  serverPreference,
  subscribeToPreference,
  type Theme,
  type ThemePreference,
} from "@/lib/theme";

/* Reads the theme as a React value, for the things CSS custom properties
   cannot reach — chiefly the Three.js diorama, whose lights and materials
   live in WebGL and never see a stylesheet.

   Same external store as the toggle, so the scene, the button and the <html>
   attribute can never disagree. */

/** What the user picked: "system", "light" or "dark". */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribeToPreference, readPreference, serverPreference);
}

/** What the page is actually rendering as, with "system" already resolved.
    Returns "light" on the server, matching what the layout renders. */
export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribeToPreference,
    () => resolveTheme(readPreference()),
    () => "light" as Theme,
  );
}
