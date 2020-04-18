import React, { Component } from 'react';

import { Box, Flex, FlexProps, Image, TextBlock } from 'zbase';

export default class HowItWorksSection extends Component<
  {
    title: string;
    description: string;
    imageSrc: string;
  } & FlexProps
> {
  render() {
    const { title, description, imageSrc, ...otherProps } = this.props;

    return (
      <Flex justify="center" direction="row-reverse" wrap px={[4, 5, 5, 7]} {...otherProps}>
        <Box w={[1, 1 / 2]} pl={[0, 6]}>
          <Image w={[80 / 100, 1, 1, 75 / 100]} mx={['auto', 0]} src={imageSrc} alt={title} />
        </Box>
        <Flex column justify="center" align="flex-end" w={[1, 1 / 2]} pl={[0, 0, 0, 7]} pr={[0, 0, 0, 4]} mt={[5, 0]}>
          <TextBlock
            fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
            // has to be an array to work around a color-responsiveness bug in TextBlock.
            color={Array(4).fill('primary.a')}
          >
            {title}
          </TextBlock>
          <TextBlock mt={[4, 4, 4, 5]} fontStyle={['paragraphs.l', 'paragraphs.l', 'paragraphs.l', 'paragraphs.xxl']}>
            {description}
          </TextBlock>
        </Flex>
      </Flex>
    );
  }
}
