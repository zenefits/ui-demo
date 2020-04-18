import React, { Component } from 'react';

import { Box, Flex, TextBlock, TextInline } from 'zbase';
import { IconButton } from 'z-frontend-elements';

interface Props {
  onPageChange: (page: number) => void;
  pageSize: number;
  currentPage: number;
  totalItemsCount: number;
  s?: 'small' | 'medium' | 'large' | 'xsmall';
}

class Pager extends Component<Props> {
  onPageBackwards = () => {
    const pageBackward = this.props.currentPage - 1;
    this.props.onPageChange(pageBackward);
  };

  onPageForwards = () => {
    const pageForward = this.props.currentPage + 1;
    this.props.onPageChange(pageForward);
  };

  getItemRange = (currentPage: number, pageSize: number, totalItemsCount: number) => {
    const start = currentPage * pageSize - pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItemsCount);
    const currentPageLabel = totalItemsCount > 0 ? `${start}-${end}` : '0';
    return (
      <TextBlock my="auto" color="text.light">
        <TextInline bold color="text.dark">
          {currentPageLabel}
        </TextInline>{' '}
        (of {totalItemsCount})
      </TextBlock>
    );
  };

  render() {
    const { currentPage, pageSize, totalItemsCount, s: size = 'medium' } = this.props;
    return (
      <Flex align="center">
        <Box order={[2, 1]} mr={[0, 3]} width={[1, 'auto']} textAlign={['center', 'right']}>
          {this.getItemRange(currentPage, pageSize, totalItemsCount)}
        </Box>
        <Box order={[1, 2]}>
          <IconButton
            iconName="chevron-left"
            aria-label="Previous page"
            mode="normal"
            s={size}
            disabled={currentPage <= 1}
            onClick={this.onPageBackwards}
            mr={2}
          />
        </Box>
        <Box order={3}>
          <IconButton
            iconName="chevron-right"
            aria-label="Next page"
            mode="normal"
            s={size}
            disabled={currentPage >= Math.ceil(totalItemsCount / pageSize)}
            onClick={this.onPageForwards}
          />
        </Box>
      </Flex>
    );
  }
}

export default Pager;
