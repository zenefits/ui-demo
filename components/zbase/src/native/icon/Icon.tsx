import React, { StatelessComponent } from 'react';
import { Text, TextStyle } from 'react-native';
import { FlattenInterpolation } from 'styled-components';

import { css, withTheme, IconNameString, ThemeInterface } from 'z-frontend-theme/native';
import { fontSizes } from 'z-frontend-theme/utils';

import withUtilPropsNative, { ResultNativeComponentProps } from '../withUtilPropsNative';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

export const iconFontSizeMap: { [size in IconSize]: number } = {
  xsmall: 0,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 5,
  xxlarge: 7,
};

type AdditionalProps = {
  /** Name of the icon to display. Available list: http://zavoloklom.github.io/material-design-iconic-font/icons.html */
  iconName: IconNameString;
  /** Should the icon spin continuously? */
  // spin?: boolean;
  /** Size of the icon. Omit to match the inherited font size. */
  s?: IconSize;
};

export type IconProps = ResultNativeComponentProps<{}, AdditionalProps>;

type InnerProps = { theme: ThemeInterface; style: TextStyle } & AdditionalProps;

// inherit font-size and color
const iconStyle: FlattenInterpolation<InnerProps & AdditionalProps>[] = css`
  font-family: ${props => props.theme.iconFont};
  /* font-style: normal; */ /* uncomment to crash JS VM on start */
  font-size: ${props => (props.s ? fontSizes(iconFontSizeMap[props.s]) : '')};
`;

const IconInner: StatelessComponent<InnerProps> = props => {
  // convert HEX value (like '/f26b') to Int, and then get a char code for it
  // used example https://github.com/oblador/react-native-vector-icons/blob/v4.6.0/lib/generate-icon-set-from-css.js#L16

  const iconStr = String.fromCharCode(parseInt(props.theme.icons[props.iconName].substr(1), 16));
  return <Text style={props.style}>{iconStr}</Text>;
};

export const Icon = withTheme(
  withUtilPropsNative<{}, AdditionalProps>({
    additionalCss: iconStyle,
  })(IconInner),
);

Icon.defaultProps = {
  s: 'large' as 'large',
};
