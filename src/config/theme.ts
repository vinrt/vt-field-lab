export type ThemePreference = "light" | "dark" | "system";
export function parseTheme(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}
export function resolveTheme(preference: ThemePreference, systemDark: boolean): "light" | "dark" {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}
export function readTheme(): ThemePreference {
  try { return parseTheme(localStorage.getItem("vt-theme")); } catch { return "system"; }
}
export function applyTheme(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolveTheme(preference, matchMedia("(prefers-color-scheme: dark)").matches);
}
