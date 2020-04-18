import React, { Component } from 'react';

import { BoxProps, Flex, FlexProps } from 'zbase';

import { ProductFeaturePreviewProps } from './ProductFeaturePreview';

export default class ProductPreviewSection extends Component<FlexProps> {
  render() {
    const { children, ...containerProps } = this.props;
    return (
      <Flex wrap justify="center" px={[4, 3, 3, 7]} py={[6, 0]} bg={['secondary.c', 'inherit']} {...containerProps}>
        {React.Children.map(children, (child, idx) => {
          const extraChildProps: BoxProps = { w: [1, 5 / 10, 5 / 10, 4 / 10], px: [0, 5, 5, 6] };
          if (idx) {
            // adding borders in between the children - except on mobile screens.
            // @ts-ignore - even tho borderLeft accepts a responsiveness array, ts is complaning.
            extraChildProps['borderLeft'] = [false, true];
            // adding vertical space on mobile screens.
            extraChildProps['mt'] = [6, 0];
          }
          return React.cloneElement(child as React.ReactElement<ProductFeaturePreviewProps>, extraChildProps);
        })}
      </Flex>
    );
  }
}
