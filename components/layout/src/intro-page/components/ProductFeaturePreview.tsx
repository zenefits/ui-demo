import React, { Component } from 'react';

import { Box, BoxProps, Image, TextBlock } from 'zbase';

export type ProductFeaturePreviewProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageWidth?: number[];
} & BoxProps;

export default class ProductFeaturePreview extends Component<ProductFeaturePreviewProps> {
  render() {
    const { title, description, imageSrc, imageWidth, ...otherProps } = this.props;

    return (
      <Box {...otherProps}>
        <Image w={imageWidth || [8 / 10, 1]} mx="auto" src={imageSrc} alt={title} />
        <TextBlock
          mt={[4, 5, 5, 6]}
          mb={[4, 4, 4, 5]}
          fontStyle={['headings.l', 'headings.l', 'headings.l', 'headings.xl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('secondary.a')}
        >
          {title}
        </TextBlock>
        <TextBlock fontStyle={['paragraphs.l', 'paragraphs.l', 'paragraphs.l', 'paragraphs.xxl']}>
          {description}
        </TextBlock>
      </Box>
    );
  }
}
