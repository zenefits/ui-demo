import React from 'react';
import { css } from './ThemeProvider';
import { hoc } from 'rebass';
import { RebassProps } from 'z-rebass-types';

export interface IconProps extends RebassProps<HTMLLIElement> {
  iconName: string;
  spin?: boolean;
}

export const iconStyle = css`
  @keyframes zmdi-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ::after {
    display: inline-block;
    font-family: Material-Design-Iconic-Font;
    text-align: center;
    content: '${(props: any) => props.theme.icons[props.icon]}';
    ${(props: any) => props.spin && 'animation: zmdi-spin 1.5s infinite linear;'}
  }
`;

const iconRebassProps = {
  fontSize: 'inherit',
  color: 'inherit',
};

const StyledIcon = hoc(iconStyle, iconRebassProps)('span');
export default (props: IconProps) => {
  const { iconName, ...rest } = props;
  return <StyledIcon icon={iconName} {...rest} />;
};
