declare module "charged-token-themes" {
  interface ThemeConfiguration {
    name: string;
    hostname: string;
    uri: string;
    title: string;
    project?: string;
    brand?: boolean;
    favicon?: boolean;
    thumbnails?: boolean;
    dark?: boolean;
  }

  export var THEMES: ThemeConfiguration[];
  export var CURRENT_THEME_KEY: string;
  export var DEFAULT_THEME: string;

  export function initThemes(autoDetect: boolean, useThemeSwitcher: boolean);
  export function getCurrentTheme(): string;
  export function setCurrentTheme(theme: string): void;
  export function getThemeEntry(): ThemeConfiguration;
  export function getThemeThumbnailsList(): string[];
  export function getThemeBrand(): string;
  export function isThemeDark(): boolean;
  export function getThemeProject(): string | undefined;
}
