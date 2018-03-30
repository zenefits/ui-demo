import React, { StatelessComponent } from 'react';
import { TouchableHighlightProperties, View } from 'react-native';
import { styled } from 'z-frontend-theme/native';

import { PropsMap } from '../commonTypes';
import withUtilPropsNative, {
  ResultNativeComponentProps,
  FlexOnlyAdditionalProps,
  flexOnlyPropsMap,
} from './withUtilPropsNative';

type TouchableHighlightAdditionalProps = FlexOnlyAdditionalProps & {
  // underlayColor?: string;
};
const touchableHighlightPropsMap: PropsMap = Object.assign({}, flexOnlyPropsMap, {
  // underlayColor: { isProp: true, utilFn: color },
});

export type TouchableHighlightProps = ResultNativeComponentProps<
  TouchableHighlightProperties,
  TouchableHighlightAdditionalProps
>;

const StyledTH = styled.TouchableHighlight`
  /* stylelint-disable-line block-no-empty */
`;
const StyledTHWithView: StatelessComponent<TouchableHighlightProperties> = ({ children, ...rest }) => (
  <StyledTH {...rest}>
    <View>{children}</View>
  </StyledTH>
);

export const TouchableHighlight = withUtilPropsNative<TouchableHighlightProperties, TouchableHighlightAdditionalProps>({
  // componentAttrs: {
  //   underlayColor: '#frfrfr',
  // },
  additionalPropsMap: touchableHighlightPropsMap,
})(StyledTHWithView);
