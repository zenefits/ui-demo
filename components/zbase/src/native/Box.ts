import { View, ViewProperties } from 'react-native';
import { ObjectOmit } from 'typelevel-ts';

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

export const Box = withUtilPropsNative<ObjectOmit<ViewProperties, keyof BoxAdditionalProps>, BoxAdditionalProps>({
  displayName: 'Box',
  additionalPropsMap: boxPropsMap,
  defaultUtilProps: {
    borderColor: theme.borderColor,
  },
})(__DEVELOPMENT__ ? View : 'View');
