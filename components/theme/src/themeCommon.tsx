import { colorsMap, ColorString } from './colors';
import icons from './icons';
import depths from './depths';

export const opacities = [0.65];

// TODO: move to another place
const images = {
  logo: 'https://www.zenefits.com/static/images/logos/icon-footer-zenefits.svg',
};

const themeObject = {
  opacities,
  icons,
  images,
  depths,
  radius: 2,
  colors: colorsMap,
  space: [0, 4, 8, 16, 24, 32, 64, 128],
  buttonSpace: [0, 4, 6, 8, 10, 12, 14, 16],
  heights: {
    xsmall: 24,
    small: 32,
    medium: 40,
    large: 48,
    xlarge: 64,
    xxlarge: 80,
    xxxlarge: 152,
  },
  borderColor: 'grayscale.f' as ColorString,
  topNavHeight: '65px',
};

export interface ThemeInterfaceCommon {
  colors: typeof colorsMap;
  opacities: typeof themeObject.opacities;
  icons: typeof themeObject.icons;
  images: typeof themeObject.images;
  radius: typeof themeObject.radius;
  space: typeof themeObject.space;
  buttonSpace: typeof themeObject.buttonSpace;
  heights: typeof themeObject.heights;
  depths: typeof themeObject.depths;
  borderColor: ColorString;
  topNavHeight: string;
  fontSizes?: number[];
  fontStyles?: { [key: string]: string };
  fonts?: string[];
  font?: string;
  weights?: number[];
  breakpoints?: number[];
  zIndex?: { [key: string]: number };
  iconFont?: string;
}

export const themeCommon: ThemeInterfaceCommon = themeObject;
