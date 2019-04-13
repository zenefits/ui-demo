import React, { Component, ReactNode } from 'react';

import { Box, Flex, Icon, IconProps, TextBlock } from 'zbase';
import { Tooltip, TooltipProps } from 'z-frontend-overlays';

type TableHeaderCellProps = {
  iconProps?: IconProps;
  tooltipBody?: ReactNode;
  tooltipProps?: TooltipProps;
};

class TableHeaderCell extends Component<TableHeaderCellProps> {
  render() {
    const { iconProps, tooltipBody, tooltipProps, children } = this.props;
    return (
      <Flex align="center">
        {iconProps && <Icon mr={1} {...iconProps} />}
        <Box>{children}</Box>
        {tooltipBody && (
          <Tooltip
            placement="top"
            flip={['top', 'right', 'bottom']}
            event="hover"
            targetBody={<Icon ml={1} s="medium" iconName="help-outline" {...tooltipProps} />}
          >
            <TextBlock p={2}>{tooltipBody}</TextBlock>
          </Tooltip>
        )}
      </Flex>
    );
  }
}

export default TableHeaderCell;
