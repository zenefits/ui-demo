import React, { Component } from 'react';

import { Icon, IconProps, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { InformationPopover, PopoverProps } from 'z-frontend-overlays';
import { color } from 'z-frontend-theme/utils';

type FormHelpPopoverProps = {
  title: string;
  iconProps?: IconProps;
  popoverProps?: PopoverProps;
};

const StyledIcon = styled(Icon)`
  cursor: pointer;

  :hover,
  :focus,
  :active {
    color: ${color('link.hover')};
  }
`;

export default class FormHelpPopover extends Component<FormHelpPopoverProps> {
  render() {
    const { title, children, iconProps, popoverProps } = this.props;
    return (
      <InformationPopover
        title={title}
        placement="top"
        {...popoverProps}
        targetBody={<StyledIcon role="button" iconName="help-outline" aria-label="Help" {...iconProps} />}
      >
        <TextBlock>{children}</TextBlock>
      </InformationPopover>
    );
  }
}
