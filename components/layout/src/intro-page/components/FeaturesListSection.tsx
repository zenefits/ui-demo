import React, { Component } from 'react';

import { Box, Flex, Image, TextBlock } from 'zbase';

export default class FeaturesListSection extends Component<{
  title: string;
  description: string;
  featuresList: string[];
  imageSrc: string;
  imageOnLeft: boolean;
  isFeaturesListOrdered: boolean;
  footnote?: string;
}> {
  displayList = (list: string[]) => {
    return list.map(listItem => (
      <li key={listItem}>
        <Flex py={2}>
          <TextBlock fontStyle="controls.xl">{listItem}</TextBlock>
        </Flex>
      </li>
    ));
  };

  render() {
    const { title, description, featuresList, imageSrc, imageOnLeft, isFeaturesListOrdered, footnote } = this.props;

    const imageOrder = imageOnLeft ? 0 : 1;
    const listOrder = imageOnLeft ? 1 : 0;

    return (
      <Flex align="center" w={1} column>
        <TextBlock
          w={[1, 5 / 10, 7 / 10, 7 / 10]}
          px={[3, 0]}
          fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('primary.a')}
          textAlign="center"
        >
          {title}
        </TextBlock>
        <Flex align="center" justify="center" w={1} my={5} mx={5}>
          <Box w={1 / 2} px={[5, 3]} order={imageOrder}>
            <Image src={imageSrc} alt="" />
          </Box>
          <Box w={1 / 2} px={[5, 3]} order={listOrder}>
            <Flex column>
              <TextBlock
                mb={[4, 4, 4, 5]}
                fontStyle={['headings.l', 'headings.l', 'headings.l', 'headings.xl']}
                // has to be an array to work around a color-responsiveness bug in TextBlock.
                color={Array(4).fill('secondary.a')}
              >
                {description}
              </TextBlock>
              {isFeaturesListOrdered ? (
                <ol>{this.displayList(featuresList)}</ol>
              ) : (
                <ul>{this.displayList(featuresList)}</ul>
              )}
              {footnote && (
                <TextBlock mt={5} fontStyle="paragraphs.s">
                  {footnote}
                </TextBlock>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    );
  }
}
