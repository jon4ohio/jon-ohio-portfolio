export { gothicTheme } from '@astryxdesign/theme-gothic/built';
export { neutralTheme } from '@astryxdesign/theme-neutral/built';

type JediThemeMode = 'light' | 'dark';
declare const JEDI_THEME_MODES: readonly ["light", "dark"];
declare function resolveJediThemeName(mode: JediThemeMode): 'gothic' | 'neutral';

export { JEDI_THEME_MODES, type JediThemeMode, resolveJediThemeName };
