import { ScrollViewProperties } from 'react-native';

import { css } from 'z-frontend-theme/native';

import withUtilPropsNative, {
  flexOnlyPropsMap,
  FlexOnlyAdditionalProps,
  ResultNativeComponentProps,
} from './withUtilPropsNative';

export type ScrollViewProps = ResultNativeComponentProps<ScrollViewProperties, FlexOnlyAdditionalProps>;

export const ScrollView = withUtilPropsNative<ScrollViewProperties, FlexOnlyAdditionalProps>({
  componentAttrs: {
    keyboardShouldPersistTaps: 'handled',
  },
  additionalPropsMap: flexOnlyPropsMap,
  additionalCss: css`
    flex: 1;
  `,
})('ScrollView');
