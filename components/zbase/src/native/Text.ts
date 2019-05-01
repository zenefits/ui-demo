import { Text as RNText, TextProperties } from 'react-native';

import { weights } from 'z-frontend-theme/native';

import { PropsMap } from '../commonTypes';
import withUtilPropsNative, { ResultNativeComponentProps } from './withUtilPropsNative';

type TextAdditionalProps = {
  bold?: boolean;
  /** Transform capitalization via CSS property `text-transform`. */
  // textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'initial';
};
const textPropsMap: PropsMap = {
  bold: { cssName: 'font-weight', valueHelper: propValue => (propValue ? weights[1].toString() : '') },
  fontStyle: {
    valueHelper: (propValue, props) => props.theme.fontStyles[propValue],
    order: -1,
  },
  // textTransform: {
  //   cssName: 'text-transform',
  // },
};

export type TextProps = ResultNativeComponentProps<TextProperties, TextAdditionalProps>;

export const Text = withUtilPropsNative<TextProperties, TextAdditionalProps>({
  defaultUtilProps: {
    fontStyle: 'medium',
    color: 'text.default',
  },
  additionalPropsMap: textPropsMap,
})(__DEVELOPMENT__ ? RNText : 'Text');
