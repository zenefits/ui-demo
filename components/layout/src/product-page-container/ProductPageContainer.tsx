import React, { Component } from 'react';

import { AppContentContainerBox, AppContentContainerBoxProps } from '../AppContentContainer';

/** @component */
export default class ProductPageContainer extends Component<AppContentContainerBoxProps> {
  static defaultProps = {
    pt: 4,
    pb: 4,
  };

  render() {
    return <AppContentContainerBox pl={0} {...this.props} />;
  }
}
