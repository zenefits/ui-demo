import React, { StatelessComponent } from 'react';

import { Icon, IconSize } from 'zbase';
import { IconNameString } from 'z-frontend-theme';

import Button, { ButtonBasicProps } from '../button/Button';

type IconButtonProps = {
  iconName: IconNameString;
  iconSize?: IconSize;
} & ButtonBasicProps;

const IconButton: StatelessComponent<IconButtonProps> = props => {
  const { iconName, iconSize, ...rest } = props;
  return (
    <Button {...rest}>
      <Icon iconName={iconName} mr={props.children ? 2 : 0} s={iconSize} />
      {props.children}
    </Button>
  );
};

IconButton.defaultProps = { mode: 'transparent' };
export default IconButton;
