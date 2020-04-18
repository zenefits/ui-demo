import React, { Component } from 'react';

import { Flex, Image, TextBlock } from 'zbase';

const Splatters = require('./../images/splatters.png');

export default class FeaturesSection extends Component<{
  title: string;
  description: string;
  imageSrc: string;
}> {
  render() {
    const { title, description, imageSrc } = this.props;

    return (
      <Flex align="center" column>
        <TextBlock
          w={[1, 50 / 100, 70 / 100, 45 / 100]}
          px={[3, 0]}
          fontStyle={['headings.xl', 'headings.xl', 'headings.xl', 'headings.xxl']}
          // has to be an array to work around a color-responsiveness bug in TextBlock.
          color={Array(4).fill('primary.a')}
          textAlign="center"
        >
          {title}
        </TextBlock>
        <Flex align="center" justify="center" w={1} style={{ position: 'relative' }} my={5}>
          <Image
            src={Splatters}
            alt="Splatters"
            width={['420px', '975px', '1050px', 1]}
            height={['250px', '375px', '400px', 1]}
            style={{ objectFit: 'cover' }}
          />
          <Image src={imageSrc} alt={title} height="100%" style={{ position: 'absolute' }} />
        </Flex>
        <TextBlock
          w={[1, 50 / 100, 70 / 100, 45 / 100]}
          px={[3, 0]}
          textAlign="center"
          fontStyle={['paragraphs.l', 'paragraphs.l', 'paragraphs.l', 'paragraphs.xxl']}
        >
          {description}
        </TextBlock>
      </Flex>
    );
  }
}
