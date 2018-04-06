import React, { StatelessComponent } from 'react';
import Button, { ButtonBasicProps } from './Button';
import { Icon } from 'zbase';

const IconButton: StatelessComponent<{ iconName: string } & ButtonBasicProps> = props => {
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
