import { convertToNestedMap } from '../utils';
import { getColor, ColorString } from '../colors';

export const fontSizes = [12, 14, 16, 19, 24, 32, 45, 48];
export const fonts = ['Circular, sans-serif'];
export const weights = [400, 700]; // normal, bold

type FontConfig = {
  fontSize: number;
  lineHeight: string;
  fontWeight: number;
  color: ColorString;
  uppercase?: boolean;
  letterSpacing: string;
};

type FontStyleWeb =
  | 'headings.xxl'
  | 'headings.xl'
  | 'headings.l'
  | 'headings.m'
  | 'headings.s'
  | 'headings.xs'
  | 'controls.xxl'
  | 'controls.xl'
  | 'controls.l'
  | 'controls.m'
  | 'controls.s'
  | 'paragraphs.xxl'
  | 'paragraphs.xl'
  | 'paragraphs.l'
  | 'paragraphs.m'
  | 'paragraphs.s';

export const fontDescriptionsMap: { [key in FontStyleWeb]: FontConfig } = {
  'headings.xxl': {
    fontSize: 7,
    lineHeight: '1',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'headings.xl': {
    fontSize: 5,
    lineHeight: '1.25',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'headings.l': {
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'headings.m': {
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'headings.s': {
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'headings.xs': {
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 1,
    color: 'text.dark',
    uppercase: true,
    letterSpacing: 'normal',
  },
  'controls.xxl': {
    fontSize: 4,
    lineHeight: '1.17',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'controls.xl': {
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'controls.l': {
    fontSize: 2,
    lineHeight: '1.25',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'controls.m': {
    fontSize: 1,
    lineHeight: '1.14',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'controls.s': {
    fontSize: 0,
    lineHeight: '1',
    fontWeight: 1,
    color: 'text.dark',
    letterSpacing: 'normal',
  },
  'paragraphs.xxl': {
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 0,
    color: 'text.default',
    letterSpacing: 'normal',
  },
  'paragraphs.xl': {
    fontSize: 3,
    lineHeight: '1.47',
    fontWeight: 0,
    color: 'text.default',
    letterSpacing: 'normal',
  },
  'paragraphs.l': {
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
    color: 'text.default',
    letterSpacing: 'normal',
  },
  'paragraphs.m': {
    fontSize: 1,
    lineHeight: '1.43',
    fontWeight: 0,
    color: 'text.default',
    letterSpacing: 'normal',
  },
  'paragraphs.s': {
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 0,
    color: 'text.default',
    letterSpacing: 'normal',
  },
};

export type FontStyleString = keyof typeof fontDescriptionsMap;

export const fontStyles: { [key: string]: string } = Object.keys(fontDescriptionsMap).reduce(
  (rules: { [key: string]: string }, fontStyleName: FontStyleWeb) => {
    const fontData = fontDescriptionsMap[fontStyleName];
    rules[fontStyleName] = `
  font-size: ${fontSizes[fontData.fontSize]}px;
  line-height: ${fontData.lineHeight};
  font-weight: ${weights[fontData.fontWeight]};
  color: ${getColor(fontData.color)};
  text-transform: ${fontData.uppercase ? 'uppercase' : 'none'};
  letter-spacing: ${fontData.letterSpacing};
  `;
    return rules;
  },
  {},
);

export const fontDescriptions = convertToNestedMap(fontDescriptionsMap);
