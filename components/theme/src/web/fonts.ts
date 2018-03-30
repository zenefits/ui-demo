import { convertToNestedMap } from '../utils';

export const fontSizes = [12, 14, 16, 19, 24, 32, 45, 48];
export const fonts = ['Circular, sans-serif'];
export const weights = [400, 600, 700]; // TODO: update them to only the ones we support

export const fontDescriptionsMap = {
  'headings.xxl': {
    fontFamily: 0,
    fontSize: 7,
    lineHeight: '1',
    fontWeight: 1,
  },
  'headings.xl': {
    fontFamily: 0,
    fontSize: 5,
    lineHeight: '1.25',
    fontWeight: 2,
  },
  'headings.l': {
    fontFamily: 0,
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 2,
  },
  'headings.m': {
    fontFamily: 0,
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 2,
  },
  'headings.s': {
    fontFamily: 0,
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
  },
  'headings.xs': {
    fontFamily: 0,
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 2,
    uppercase: true,
  },
  'controls.xxl': {
    fontFamily: 0,
    fontSize: 4,
    lineHeight: '1.17',
    fontWeight: 1,
  },
  'controls.xl': {
    fontFamily: 0,
    fontSize: 3,
    lineHeight: '1.26',
    fontWeight: 1,
  },
  'controls.l': {
    fontFamily: 0,
    fontSize: 2,
    lineHeight: '1.25',
    fontWeight: 1,
  },
  'controls.m': {
    fontFamily: 0,
    fontSize: 1,
    lineHeight: '1.14',
    fontWeight: 1,
  },
  'controls.s': {
    fontFamily: 0,
    fontSize: 0,
    lineHeight: '1',
    fontWeight: 1,
  },
  'paragraphs.xxl': {
    fontFamily: 0,
    fontSize: 4,
    lineHeight: '1.33',
    fontWeight: 0,
  },
  'paragraphs.xl': {
    fontFamily: 0,
    fontSize: 3,
    lineHeight: '1.47',
    fontWeight: 0,
  },
  'paragraphs.l': {
    fontFamily: 0,
    fontSize: 2,
    lineHeight: '1.5',
    fontWeight: 0,
  },
  'paragraphs.m': {
    fontFamily: 0,
    fontSize: 1,
    lineHeight: '1.43',
    fontWeight: 0,
  },
  'paragraphs.s': {
    fontFamily: 0,
    fontSize: 0,
    lineHeight: '1.33',
    fontWeight: 0,
  },
};

export type FontStyleString = keyof (typeof fontDescriptionsMap);

export const fontStyles: { [key: string]: string } = Object.keys(fontDescriptionsMap).reduce((rules, fontStyleName) => {
  const fontData = fontDescriptionsMap[fontStyleName];
  rules[fontStyleName] = `
  font-family: ${fonts[fontData.fontFamily]};
  font-size: ${fontSizes[fontData.fontSize]}px;
  line-height: ${fontData.lineHeight};
  font-weight: ${weights[fontData.fontWeight]};
  ${fontData.uppercase ? 'text-transform: uppercase;' : ''}
  `;
  return rules;
}, {});

export const fontDescriptions = convertToNestedMap(fontDescriptionsMap);
