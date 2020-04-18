import React, { Component } from 'react';

import { Box, BoxProps } from 'zbase';

import Pager from '../Pager';
import { DataManagerContext } from '../DataManager';

type DataPagerProps = BoxProps;

export default class DataPager extends Component<DataPagerProps> {
  render() {
    return (
      <DataManagerContext.Consumer>
        {({ paging }) => {
          return (
            <Box {...this.props}>
              <Pager
                s="small"
                pageSize={paging.config.pageSize}
                currentPage={paging.config.currentPage}
                totalItemsCount={paging.inputData.length}
                onPageChange={paging.onPageChange}
              />
            </Box>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
