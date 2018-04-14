import { ViewProperties } from 'react-native';

import { theme } from 'z-frontend-theme/native';

import { PropsMap } from '../commonTypes';
import { UtilTypeBorder } from './types';
import withUtilPropsNative, {
  borderPropsMap,
  flexOnlyPropsMap,
  FlexOnlyAdditionalProps,
  ResultNativeComponentProps,
} from './withUtilPropsNative';

interface BoxAdditionalProps extends FlexOnlyAdditionalProps, UtilTypeBorder {}

export type BoxProps = ResultNativeComponentProps<ViewProperties, BoxAdditionalProps>;

const boxPropsMap: PropsMap = Object.assign({}, flexOnlyPropsMap, {
  ...borderPropsMap,
});

export const Box = withUtilPropsNative<ViewProperties, BoxAdditionalProps>({
  displayName: 'Box',
  additionalPropsMap: boxPropsMap,
  defaultUtilProps: {
    borderColor: theme.borderColor,
  },
})('View');
