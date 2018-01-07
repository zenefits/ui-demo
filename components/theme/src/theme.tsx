/* tslint:disable:import-filter */
import {
  keyframes as baseKeyframes,
  injectGlobal as baseInjectGlobal,
  ThemedStyledComponentsModule,
} from 'styled-components';
/* tslint:enable:import-filter */
import colors from './colors';
import icons from './icons';
import depths from './depths';
import { fonts, fontSizes, fontStyles, weights } from './fonts';

const opacities = [0.65];

// TODO: move to another place
const images = {
  logo: 'https://www.zenefits.com/static/images/logos/icon-footer-zenefits.svg',
};

const themeObject = {
  colors,
  fontSizes,
  fontStyles,
  fonts,
  weights,
  opacities,
  icons,
  images,
  depths,
  radius: 2,
  font: fonts[0],
  space: [0, 4, 8, 16, 24, 32, 64, 128],
  buttonSpace: [0, 4, 6, 8, 10, 12, 14, 16],
  // min-width breakpoints in ems
  breakpoints: [32, 48, 64, 80],
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  heights: {
    xsmall: 24,
    small: 32,
    medium: 40,
    large: 48,
    xlarge: 64,
    xxlarge: 80,
  },
};

interface ThemeInterface {
  colors: typeof colors;
  fontSizes: typeof themeObject.fontSizes;
  fontStyles: typeof themeObject.fontStyles;
  fonts: typeof themeObject.fonts;
  font: typeof themeObject.font;
  weights: typeof themeObject.weights;
  opacities: typeof themeObject.opacities;
  icons: typeof themeObject.icons;
  images: typeof themeObject.images;
  radius: typeof themeObject.radius;
  space: typeof themeObject.space;
  buttonSpace: typeof themeObject.buttonSpace;
  zIndex: typeof themeObject.zIndex;
  heights: typeof themeObject.heights;
  depths: typeof themeObject.depths;
}

const theme: ThemeInterface = themeObject;

const { keyframes, injectGlobal } = {
  keyframes: baseKeyframes,
  injectGlobal: baseInjectGlobal,
} as ThemedStyledComponentsModule<ThemeInterface>;

export { opacities, injectGlobal, ThemeInterface, theme, keyframes };
