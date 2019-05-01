import { convertToNestedMap } from '../utils';

export const fontSizes = [11, 12, 14, 16, 18, 24, 32];

export const weights = [400, 700]; // normal, bold

type FontRule = {
  fontSize: number;
  lineHeight?: string;
  fontWeight?: number;
  uppercase?: boolean;
};

type FontStyleNative = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';

const fontDescriptionsMap: { [key in FontStyleNative]: FontRule } = {
  xsmall: { fontSize: 0 },
  small: { fontSize: 1 },
  medium: { fontSize: 2 },
  large: { fontSize: 3 },
  xlarge: { fontSize: 4 },
  xxlarge: { fontSize: 5 },
  xxxlarge: { fontSize: 6 },
};

export type FontStyleString = keyof (typeof fontDescriptionsMap);

// TODO: fix this for RN. this is just a copy paste from the web version
export const fontStyles: { [key: string]: string } = Object.keys(fontDescriptionsMap).reduce(
  (rules: { [key: string]: string }, fontStyleName: FontStyleNative) => {
    const fontData = fontDescriptionsMap[fontStyleName];
    rules[fontStyleName] = `
    font-size: ${fontSizes[fontData.fontSize]}px;
    ${fontData.lineHeight ? `line-height: ${fontData.lineHeight};` : ''}
    ${fontData.fontWeight ? `font-weight: ${weights[fontData.fontWeight]};` : ''}
    ${fontData.uppercase ? 'text-transform: uppercase;' : ''}
  `;
    return rules;
  },
  {},
);

export const fontDescriptions = convertToNestedMap(fontDescriptionsMap);
