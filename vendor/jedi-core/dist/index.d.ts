import * as react from 'react';
import { ReactNode } from 'react';
import * as _astryxdesign_core_theme from '@astryxdesign/core/theme';
import { LinkComponentType } from '@astryxdesign/core/Link';
import { JediThemeMode } from '@jon4ohio/jedi-themes';
export { JediThemeMode } from '@jon4ohio/jedi-themes';

declare function resolveJediTheme(mode: JediThemeMode): _astryxdesign_core_theme.DefinedTheme;
interface JediProvidersProps {
    children: ReactNode;
    mode?: JediThemeMode;
    linkComponent: LinkComponentType;
}
declare function JediProviders({ children, mode, linkComponent, }: JediProvidersProps): react.JSX.Element;

export { JediProviders, type JediProvidersProps, resolveJediTheme };
