import React, { Component } from 'react';

import { Box } from 'zbase';

import Popover, { PopoverProps } from './Popover';

type InformationPopoverProps = {
  title: String;
} & PopoverProps;

class InformationPopover extends Component<InformationPopoverProps> {
  render() {
    const { children, ...props } = this.props;
    return (
      <Popover {...props}>
        <Box w={[1, 280]}>
          <Popover.Body>{children}</Popover.Body>
        </Box>
      </Popover>
    );
  }
}

export default InformationPopover;
