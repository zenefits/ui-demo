import React, { Component, ReactNode } from 'react';

import { Box, BoxProps, Flex } from 'zbase';

export type CardHeaderProps = BoxProps & {
  actionRender?: () => ReactNode;
};

class CardHeader extends Component<CardHeaderProps> {
  static defaultProps = {
    borderBottom: true,
    fontStyle: 'headings.s' as 'headings.s',
    py: 3,
    px: 4,
  };

  render() {
    const { children, actionRender, ...rest } = this.props;

    return (
      <Box {...rest}>
        {actionRender ? (
          <Flex justify="space-between" align="center">
            {children}
            {/* customize margin to maintain heading spacing with/without action */}
            <Box my={-2} ml={2} mr={-2}>
              {actionRender()}
            </Box>
          </Flex>
        ) : (
          children
        )}
      </Box>
    );
  }
}

export default CardHeader;
