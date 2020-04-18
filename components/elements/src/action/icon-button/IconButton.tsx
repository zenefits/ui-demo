import React, { StatelessComponent } from 'react';

import { Icon, IconSize } from 'zbase';
import { IconNameString } from 'z-frontend-theme';

import Button, { ButtonBasicProps } from '../button/Button';

type IconButtonProps = {
  /** Name of the icon to show. */
  iconName: IconNameString;
  /** Size of the icon. Omit to use the inherited font size. */
  iconSize?: IconSize;
} & ButtonBasicProps;

const iconAriaLabelMap: { [key: string]: string } = {
  close: 'Close',
  delete: 'Delete',
  edit: 'Edit',
  'help-outline': 'Help',
};

const IconButton: StatelessComponent<IconButtonProps> = props => {
  const { iconName, iconSize, 'aria-label': ariaLabelProp, ...rest } = props;
  const ariaLabel = ariaLabelProp || iconAriaLabelMap[iconName] || undefined;
  return (
    <Button aria-label={ariaLabel} {...rest}>
      <Icon iconName={iconName} mr={props.children ? 2 : 0} s={iconSize} />
      {props.children}
    </Button>
  );
};

IconButton.defaultProps = { mode: 'transparent' };
export default IconButton;
