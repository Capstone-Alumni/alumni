import { ReactNode, useMemo, forwardRef } from 'react';
// material
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import shape from './shape';
import { getPalette } from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import { getShadows, getCustomShadows } from './shadows';

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  paletteName?: string;
  children: ReactNode;
};

export default function ThemeConfig({
  paletteName,
  children,
}: ThemeConfigProps) {
  // const { themeMode, themeDirection } = useSettings();
  const themeMode = 'light';
  const themeDirection = 'ltf';
  const isLight = themeMode === 'light';
  const palette = useMemo(() => {
    return getPalette(paletteName || 'purple');
  }, [paletteName]);
  const shadows = getShadows(palette);
  const customShadows = getCustomShadows(palette);

  const themeOptions: any = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
