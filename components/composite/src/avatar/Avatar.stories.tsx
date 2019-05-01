import React from 'react';

import { Box, Flex, Image } from 'zbase';
import { images } from 'z-frontend-theme';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleTooltips from './exampleTooltips';
import Avatar from './Avatar';

storiesOf('composites|Avatar', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('sizes', () => (
    <Flex wrap align="center">
      <Flex column justify="space-around" align="center" mr={2}>
        <Box width={200} height={200}>
          <Avatar firstName="M" lastName="W" w={1} fontStyle="headings.xxl" />
        </Box>
        <Box my={2}>
          <code>
            w={'{'}1{'}'}
          </code>
        </Box>
        <Box width={200} height={200}>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} w={1} />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" s="xxlarge" />
        </Box>
        <Box my={2}>XXL</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xxlarge" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" s="xlarge" />
        </Box>
        <Box my={2}>XL</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xlarge" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" s="large" />
        </Box>
        <Box my={2}>L</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="large" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" />
        </Box>
        <Box my={2}>M</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" s="small" />
        </Box>
        <Box my={2}>S</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="small" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="M" lastName="W" s="xsmall" />
        </Box>
        <Box my={2}>XS</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xsmall" />
        </Box>
      </Flex>
    </Flex>
  ))
  .add('disabled', () => (
    <Flex align="center">
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" s="xxlarge" />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" s="xxlarge" disabled />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" photoUrl={images.pug} s="xxlarge" />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" photoUrl={images.pug} s="xxlarge" disabled />
      </Box>
    </Flex>
  ))
  .add('square corners, contain (company)', () => (
    <Flex>
      <Avatar firstName="Zenefits" s="xxlarge" isSquare mr={3} />
      <Avatar firstName="Zenefits" lastName="" photoUrl={images.logo} s="xxlarge" isSquare imageFit="contain" />
    </Flex>
  ))
  .add('util props', () => (
    <Flex>
      <Avatar firstName="John" lastName="Doe" s="xxlarge" m={3} bg="primary.a" color="grayscale.d" />
      <Avatar photoUrl={images.pug} s="xxlarge" m={3} />
    </Flex>
  ))
  .add('preserves aspect ratio', () => (
    <Flex column align="flex-start">
      <Image src={images.aspectRatio} mb={2} />
      <Avatar photoUrl={images.aspectRatio} s="xxlarge" mb={2} />
      <Avatar photoUrl={images.aspectRatio} s="xlarge" mb={2} />
      <Avatar photoUrl={images.aspectRatio} s="large" mb={2} />
    </Flex>
  ))
  .add('Avatar with Badge', () => (
    <Flex align="center">
      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="Q" lastName="Z" s="xxxlarge" badge="contingent" />
        </Box>
        <Box my={2}>XXXL</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xxxlarge" badge="contingent" />
        </Box>
      </Flex>
      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="L" lastName="N" s="xxlarge" badge="contingent" />
        </Box>
        <Box my={2}>XXL</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xxlarge" badge="contingent" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="D" lastName="U" s="xlarge" badge="contingent" />
        </Box>
        <Box my={2}>XL</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xlarge" badge="contingent" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="Y" lastName="C" s="large" badge="contingent" />
        </Box>
        <Box my={2}>L</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="large" badge="contingent" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="X" lastName="O" badge="contingent" />
        </Box>
        <Box my={2}>M</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} badge="contingent" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="L" lastName="R" s="small" badge="contingent" />
        </Box>
        <Box my={2}>S</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="small" badge="contingent" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={4}>
        <Box>
          <Avatar firstName="D" lastName="V" s="xsmall" badge="contingent" />
        </Box>
        <Box my={2}>XS</Box>
        <Box>
          <Avatar firstName="M" lastName="W" photoUrl={images.pug} s="xsmall" badge="contingent" />
        </Box>
      </Flex>
    </Flex>
  ))
  .add('Avatar tooltips', () => (
    <Box pt={100}>
      <ExampleTooltips />
    </Box>
  ));
