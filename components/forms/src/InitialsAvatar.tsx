import React, { StatelessComponent } from 'react';
import { Box, Avatar, Text, hoc } from 'rebass';
import { RebassOnlyProps } from 'z-rebass-types';
import { px } from 'rebass/dist/util';

import { heights, color, fontSizes } from 'z-frontend-theme/src/utils';
import { styled, css, colors } from 'z-frontend-theme';

type InitialAvatarProps = RebassOnlyProps & {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  color?: string;
  s?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  disabled?: Boolean;
  title?: string;
};

const styleSpecMap = {
  fontStyleMap: {
    xsmall: 0,
    small: 0,
    medium: 1,
    large: 2,
    xlarge: 3,
    xxlarge: 4,
  },
  paddingSpaceMap: {
    xsmall: 4,
    small: 8,
    medium: 10,
    large: 12,
    xlarge: 18,
    xxlarge: 24,
  },
  // uses actual pixel sizes, some sizes are not in the spaces array
};

const AvatarStyle = css`
  box-sizing: border-box;
  width: ${props => heights(props.s)};
  height: ${props => heights(props.s)};
  color: ${color('grayscale.white')};
  border-radius: 50%;
  box-shadow: 0 0 0 2px ${color('button.defaultNormal')};
  background-color: ${props => props.color};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const AvatarInitials = styled<InitialAvatarProps>(Text)`
  line-height: 1.33;
  letter-spacing: 1px;
  font-size: ${props => fontSizes(styleSpecMap.fontStyleMap[props.s])};
  text-align: center;
  padding-top: ${props => px(styleSpecMap.paddingSpaceMap[props.s])};
`;

const StyledZAvatar = hoc(AvatarStyle, {})(Avatar);
const StyledIntialsAvatar = hoc(AvatarStyle, {})(Box);
const COLORS = Object.values(colors.avatar);

function hash(str) {
  let hashResult = 0;
  for (let i = 0; i < str.length; i += 1) {
    hashResult += str.charCodeAt(i);
  }
  return hashResult;
}

const InitialsAvatar: StatelessComponent<InitialAvatarProps> = props => {
  const { firstName, lastName, color, photoUrl, s, disabled, title, ...rest } = props;

  if (photoUrl) {
    const altText = `${firstName} ${lastName}'s picture`;
    return <StyledZAvatar s={s} src={photoUrl} title={title || altText} alt={altText} disabled={disabled} />;
  }

  const initialsComputed = ((firstName || ' ')[0] + (lastName || ' ')[0]).toUpperCase();
  const newColor = color || COLORS[hash(initialsComputed) % COLORS.length];
  return (
    <StyledIntialsAvatar s={s} color={newColor} disabled={disabled} {...rest}>
      <AvatarInitials s={s} title={title || `${firstName} ${lastName}`}>
        {initialsComputed}
      </AvatarInitials>
    </StyledIntialsAvatar>
  );
};
InitialsAvatar.defaultProps = {
  s: 'medium',
  disabled: false,
};

export default InitialsAvatar;
