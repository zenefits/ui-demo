import { colorsMap, ColorString } from './colors';
import icons from './icons';
import depths from './depths';

const zenefitsSmallLogo = require('./images/icon-footer-zenefits.svg');

export const opacities = [0.65];

const isInEmbeddedNativeView =
  window.ZENEFITS_MOBILE_INTEGRATION && window.ZENEFITS_MOBILE_INTEGRATION.isEmbeddedNativeView;

// TODO: move to another place
const images = {
  logo: zenefitsSmallLogo,
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
  topNavHeightInPx: isInEmbeddedNativeView ? 0 : 65,
  // Height of the topNav including any banner. This is what to use if you want to position against the height of the TopNav.
  topNavHeightContainer: isInEmbeddedNativeView ? '0px' : '65px',
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
  topNavHeightContainer: string;
  topNavHeightInPx: number;
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
