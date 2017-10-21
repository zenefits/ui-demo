import React from 'react';
import styled, { css, ThemeProps } from 'styled-components';
import { hoc } from 'rebass';
import { RebassProps } from 'z-rebass-types';

interface IconProps extends RebassProps<HTMLLIElement> {
  iconName: string;
}

export const iconStyle = css`
:after {
  display: inline-block;
  font-family: Material-Design-Iconic-Font;
  text-align: center;
  content: '${(props: any) => props.theme.icons[props.iconName]}';
}
`;
const iconRebassProps = {
  fontSize: 4,
  color: 'greyScale.3',
};
const StyledIcon = hoc(iconStyle, iconRebassProps)('span');
export default (props: IconProps) => <StyledIcon {...props} />;
