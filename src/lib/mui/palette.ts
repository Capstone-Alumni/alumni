import { alpha, Palette } from '@mui/material';
import GREEN_PALETTE from './paletteList/green';
import PURPLE_PALETTE from './paletteList/purple';
import BLUE_PALETTE from './paletteList/blue';
import YELLOW_PALETTE from './paletteList/yellow';
import RED_PALETTE from './paletteList/red';

// ----------------------------------------------------------------------

interface GradientsPaletteOptions {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface Palette {
    gradients: GradientsPaletteOptions;
  }
  interface PaletteOptions {
    gradients?: GradientsPaletteOptions;
  }
}

declare module '@mui/material' {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

const PALETTE_LIST: { [key: string]: any } = {
  green: GREEN_PALETTE,
  purple: PURPLE_PALETTE,
  blue: BLUE_PALETTE,
  yellow: YELLOW_PALETTE,
  red: RED_PALETTE,
};

export const getPalette = (paletteName: string) => {
  const customPalette = PALETTE_LIST[paletteName];

  return {
    light: {
      ...customPalette.COMMON,
      text: {
        primary: customPalette.GREY[800],
        secondary: customPalette.GREY[600],
        disabled: customPalette.GREY[500],
      },
      background: {
        paper: '#fff',
        default: '#fff',
        neutral: customPalette.GREY[200],
      },
      action: {
        active: customPalette.GREY[600],
        ...customPalette.COMMON.action,
      },
    },
    dark: {
      ...customPalette.COMMON,
      text: {
        primary: '#fff',
        secondary: customPalette.GREY[500],
        disabled: customPalette.GREY[600],
      },
      background: {
        paper: customPalette.GREY[800],
        default: customPalette.GREY[900],
        neutral: customPalette.GREY[500_16],
      },
      action: {
        active: customPalette.GREY[500],
        ...customPalette.COMMON.action,
      },
    },
  };
};
