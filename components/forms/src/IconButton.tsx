import React, { StatelessComponent } from 'react';

import { Icon } from 'zbase';
import { IconNameString } from 'z-frontend-theme';

import Button, { ButtonBasicProps } from './Button';

const IconButton: StatelessComponent<{ iconName: IconNameString } & ButtonBasicProps> = props => {
  const { iconName, ...rest } = props;
  return (
    <Button {...rest}>
      <Icon iconName={iconName} mr={props.children ? 2 : 0} />
      {props.children}
    </Button>
  );
};

IconButton.defaultProps = { mode: 'transparent' };
export default IconButton;
