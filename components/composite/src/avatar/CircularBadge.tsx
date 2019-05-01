import { css, styled, theme } from 'z-frontend-theme';
import { color, fontStyles } from 'z-frontend-theme/utils';
import { Box } from 'zbase';

import { badgeTypeMap, AvatarProps } from './Avatar';

const fontSizeAdjustmentMap: { [key: string]: string } = {
  medium: 'font-size: 8px;',
  large: 'font-size: 10px;',
  xlarge: 'font-size: 12px;',
  xxlarge: 'font-size: 14px;',
  xxxlarge: 'font-size: 30px;',
};

function calculateBadgeStyle(props: any) {
  let badgeSize;
  let fontSizeAdjustment;

  if (props.width > 1) {
    // badge is 1/4 size of avatar
    badgeSize = `${Math.round(props.width / 4)}px`;
    if (fontSizeAdjustmentMap[props.s]) {
      fontSizeAdjustment = fontSizeAdjustmentMap[props.s];
    }
  } else if (props.width <= 1) {
    // defaults to largest badge
    badgeSize = `${Math.round(theme.heights['xxxlarge'] / 4)}px`;
    fontSizeAdjustment = fontSizeAdjustmentMap['xxxlarge'];
  }

  return css`
    height: ${badgeSize};
    width: ${badgeSize};
    ${fontStyles('paragraphs.s')};
    ${fontSizeAdjustment ? fontSizeAdjustment : ''};
  `;
}

const CircularBadge = styled<AvatarProps>(Box)`
  background-color: ${props => color(badgeTypeMap[props.badge].bg)};
  border-radius: 50%;
  ${props => calculateBadgeStyle(props)};
  color: ${color('grayscale.white')};
  display: inline-block;
  text-align: center;
  box-shadow: 0 0 0 2px ${color('secondary.b')};
`;

export default CircularBadge;
