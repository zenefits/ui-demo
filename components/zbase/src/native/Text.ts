import { TextProperties } from 'react-native';

import { PropsMap } from '../commonTypes';
import withUtilPropsNative, { ResultNativeComponentProps } from './withUtilPropsNative';

type TextAdditionalProps = {
  bold?: boolean;
};
const textPropsMap: PropsMap = {
  bold: { cssName: 'font-weight', valueHelper: propValue => (propValue ? 'bold' : null) },
};

export type TextProps = ResultNativeComponentProps<TextProperties, TextAdditionalProps>;

export const Text = withUtilPropsNative<TextProperties, TextAdditionalProps>({
  defaultUtilProps: {
    fontSize__deprecated__doNotUse: 1,
    color: 'grayscale.b',
  },
  additionalPropsMap: textPropsMap,
})('Text');
