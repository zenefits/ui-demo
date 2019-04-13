import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import { AppContentContainerBox, AppContentContainerBoxProps } from '../AppContentContainer';

/** @component */
const ProductPageContainerStyled = styled<AppContentContainerBoxProps>(AppContentContainerBox)`
  padding-top: ${space(4)};
  padding-bottom: ${space(4)};
`;

export default class ProductPageContainer extends Component<AppContentContainerBoxProps> {
  render() {
    const { children, ...rest } = this.props;
    return <ProductPageContainerStyled {...rest}>{children}</ProductPageContainerStyled>;
  }
}
