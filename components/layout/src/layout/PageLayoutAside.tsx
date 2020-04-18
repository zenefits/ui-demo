import React, { Component } from 'react';

import { Box, BoxProps } from 'zbase';

import { PageLayoutContext } from './PageLayoutContext';
import { columnSpacing, handleUnsupportedLayout } from './pageLayoutHelpers';

const widthsMap: { [key: string]: number | number[] } = {
  '2-8-2': [1, null, 2 / 12],
  '8-4': [1, null, 4 / 12],
};

type PageLayoutAsideProps = BoxProps;

class PageLayoutAside extends Component<PageLayoutAsideProps> {
  static contextType = PageLayoutContext;

  render() {
    const { columns } = this.context;

    const width = widthsMap[columns];
    if (width === undefined) {
      handleUnsupportedLayout(columns, Object.keys(widthsMap));
    }
    return <Box px={[0, 0, columnSpacing]} w={width} {...this.props} />;
  }
}

export default PageLayoutAside;
