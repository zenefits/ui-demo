import React from 'react';

import { Flex, TextInline } from 'zbase';

import { ProductTitleWithDropdownMode, UserInfoBusinessCase } from '../types';
import ProductTitleWithDropdown from './ProductTitleWithDropdown';

type ProductTitleProps = {
  isDemoCenter: boolean;
  isCompanyHub: boolean;
  productTitleKey: string;
  productTitleDefault: string;
  userInfo?: UserInfoBusinessCase;
};

class ProductTitle extends React.Component<ProductTitleProps> {
  render() {
    const { isDemoCenter, isCompanyHub, productTitleKey, productTitleDefault, userInfo } = this.props;

    const productTitleText = getProductTitleText(isDemoCenter, productTitleKey, productTitleDefault);

    const showProductTitleWithDropdown = isDemoCenter || isCompanyHub;

    if (showProductTitleWithDropdown) {
      // Demo center has higher priority than company hub
      const productTitleWithDropdownMode: ProductTitleWithDropdownMode = isDemoCenter ? 'demoCenter' : 'companyHub';

      return (
        <ProductTitleWithDropdown
          productTitleText={productTitleText}
          mode={productTitleWithDropdownMode}
          userInfo={userInfo}
        />
      );
    } else if (productTitleText) {
      // Default product title is just text
      return (
        <Flex align="center" fontStyle="headings.s" color="secondary.a" data-testid="ProductTitle">
          {productTitleText}
        </Flex>
      );
    } else {
      return null;
    }
  }
}

export default ProductTitle;

function getProductTitleText(isDemoCenter: boolean, productTitleKey: string, productTitleDefault: string): JSX.Element {
  return isDemoCenter ? (
    <TextInline>Demo Center</TextInline>
  ) : productTitleKey ? (
    <TextInline textKey={productTitleKey} textDefault={productTitleDefault} />
  ) : productTitleDefault ? (
    <TextInline>{productTitleDefault}</TextInline>
  ) : null;
}
