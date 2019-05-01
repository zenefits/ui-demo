/* tslint:disable:import-filter */
import {
  injectGlobal as baseInjectGlobal,
  keyframes as baseKeyframes,
  ThemedStyledComponentsModule,
} from 'styled-components';

/* tslint:enable:import-filter */
import { fonts, fontSizes, fontStyles, weights } from './fonts';
import { themeCommon, ThemeInterfaceCommon } from '../themeCommon';
import zIndex from '../zIndex';

export const opacities = [0.65];

const themeObject = {
  ...themeCommon,
  fontSizes,
  fontStyles,
  fonts,
  weights,
  zIndex,
  iconFont: 'Material-Design-Iconic-Font',
  font: fonts[0],
  // min-width breakpoints in ems
  breakpoints: [32, 48, 64, 80],
};

export interface ThemeInterface extends ThemeInterfaceCommon {
  fontSizes: typeof themeObject.fontSizes;
  fontStyles: typeof themeObject.fontStyles;
  fonts: typeof themeObject.fonts;
  font: typeof themeObject.font;
  weights: typeof themeObject.weights;
  breakpoints: typeof themeObject.breakpoints;
  zIndex: typeof themeObject.zIndex;
  iconFont: string;
}

export const theme: ThemeInterface = themeObject;

export const { keyframes, injectGlobal } = {
  keyframes: baseKeyframes,
  injectGlobal: baseInjectGlobal,
} as ThemedStyledComponentsModule<ThemeInterface>;
