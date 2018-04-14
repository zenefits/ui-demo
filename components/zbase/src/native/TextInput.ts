import { TextInputProperties } from 'react-native';

import { css } from 'z-frontend-theme/native';
import { color } from 'z-frontend-theme/utils';

import withUtilPropsNative, { ResultNativeComponentProps } from './withUtilPropsNative';

export type TextInputProps = ResultNativeComponentProps<TextInputProperties>;

export const TextInput = withUtilPropsNative<TextInputProperties>({
  additionalCss: css`
    border: 1px solid ${color('affirmation.a')};
  `,
})('TextInput');
