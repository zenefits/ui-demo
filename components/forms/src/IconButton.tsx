import React, { StatelessComponent } from 'react';
import Button, { ButtonBasicProps } from './Button';
import Icon from 'z-frontend-theme/src/Icon';

const IconButton: StatelessComponent<{ iconName: string } & ButtonBasicProps> = props => {
  const { iconName, ...rest } = props;
  return (
    <Button {...rest} mode="transparent">
      <Icon iconName={iconName} mr={props.children ? 2 : 0} />
      {props.children}
    </Button>
  );
};

export default IconButton;
