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
  },
  'headings.xl': {
    fontSize: 5,
    lineHeight: '1.25',
    fontWeight: 1,
    color: 'text.dark',
  },
  'headings.l': {
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 1,
    color: 'text.dark',
  },
  'headings.m': {
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 1,
    color: 'text.dark',
  },
  'headings.s': {
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
    color: 'text.dark',
  },
  'headings.xs': {
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 1,
    color: 'text.dark',
    uppercase: true,
  },
  'controls.xxl': {
    fontSize: 4,
    lineHeight: '1.17',
    fontWeight: 1,
    color: 'text.dark',
  },
  'controls.xl': {
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 1,
    color: 'text.dark',
  },
  'controls.l': {
    fontSize: 2,
    lineHeight: '1.25',
    fontWeight: 1,
    color: 'text.dark',
  },
  'controls.m': {
    fontSize: 1,
    lineHeight: '1.14',
    fontWeight: 1,
    color: 'text.dark',
  },
  'controls.s': {
    fontSize: 0,
    lineHeight: '1',
    fontWeight: 1,
    color: 'text.dark',
  },
  'paragraphs.xxl': {
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 0,
    color: 'text.default',
  },
  'paragraphs.xl': {
    fontSize: 3,
    lineHeight: '1.47',
    fontWeight: 0,
    color: 'text.default',
  },
  'paragraphs.l': {
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
    color: 'text.default',
  },
  'paragraphs.m': {
    fontSize: 1,
    lineHeight: '1.43',
    fontWeight: 0,
    color: 'text.default',
  },
  'paragraphs.s': {
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 0,
    color: 'text.default',
  },
};

export type FontStyleString = keyof (typeof fontDescriptionsMap);

export const fontStyles: { [key: string]: string } = Object.keys(fontDescriptionsMap).reduce(
  (rules: { [key: string]: string }, fontStyleName: FontStyleWeb) => {
    const fontData = fontDescriptionsMap[fontStyleName];
    rules[fontStyleName] = `
  font-size: ${fontSizes[fontData.fontSize]}px;
  line-height: ${fontData.lineHeight};
  font-weight: ${weights[fontData.fontWeight]};
  color: ${getColor(fontData.color)};
  text-transform: ${fontData.uppercase ? 'uppercase' : 'none'};
  `;
    return rules;
  },
  {},
);

export const fontDescriptions = convertToNestedMap(fontDescriptionsMap);
