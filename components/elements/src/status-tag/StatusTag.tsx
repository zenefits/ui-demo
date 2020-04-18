import React, { Component } from 'react';

import { styled, ColorString } from 'z-frontend-theme';
import { radius } from 'z-frontend-theme/utils';
import { Box, BoxProps } from 'zbase';

const StyledBox = styled(Box)`
  border-radius: ${radius};
  display: inline-block;
  vertical-align: middle;
`;

export type StatusTagProps = {
  mode: 'neutral' | 'caution' | 'negation' | 'affirmation';
} & Pick<BoxProps, 'fontStyle' | 'p' | 'm' | 'my' | 'mx' | 'mt' | 'mr' | 'mb' | 'ml'>;

type ModeMapItem = { borderColor: ColorString; color: ColorString };

const modeMap: { [key in StatusTagProps['mode']]: ModeMapItem } = {
  // NOTE: deliberately inflexible for consistency purposes
  neutral: { borderColor: 'grayscale.e', color: 'grayscale.c' },
  caution: { borderColor: 'caution.b', color: 'caution.a' },
  negation: { borderColor: 'negation.b', color: 'negation.a' },
  affirmation: { borderColor: 'affirmation.b', color: 'affirmation.a' },
};

export default class StatusTag extends Component<StatusTagProps> {
  static defaultProps = {
    fontStyle: 'controls.s',
    mx: 1,
  };

  render() {
    const { mode, ...rest } = this.props;
    const mapped = modeMap[mode];
    return <StyledBox p={1} border borderColor={mapped.borderColor} color={mapped.color} {...rest} />;
  }
}
