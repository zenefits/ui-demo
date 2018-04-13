import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, Image } from 'zbase';

import Avatar from './Avatar';

const photoUrl =
  'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-30.jpg';

storiesOf('Avatar', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('states', () => (
    <Flex align="center">
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" s="xxlarge" />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" s="xxlarge" disabled />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" photoUrl={photoUrl} s="xxlarge" />
      </Box>
      <Box mr={2}>
        <Avatar firstName="Nname" lastName="Rname" photoUrl={photoUrl} s="xxlarge" disabled />
      </Box>
    </Flex>
  ))
  .add('sizes', () => (
    <Flex wrap align="center">
      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Nname" lastName="Rname" s="xxlarge" />
        </Box>
        <Box my={2}>XXL</Box>
        <Box>
          <Avatar firstName="Nname" lastName="Rname" photoUrl={photoUrl} s="xxlarge" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Mname" lastName="Rname" s="xlarge" />
        </Box>
        <Box my={2}>XL</Box>
        <Box>
          <Avatar firstName="Mname" lastName="Rname" photoUrl={photoUrl} s="xlarge" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Tname" lastName="Fname" s="large" />
        </Box>
        <Box my={2}>L</Box>
        <Box>
          <Avatar firstName="Tname" lastName="Rname" photoUrl={photoUrl} s="large" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Mname" lastName="Wname" />
        </Box>
        <Box my={2}>M</Box>
        <Box>
          <Avatar firstName="Mname" lastName="Rname" photoUrl={photoUrl} />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Kname" lastName="Sname" s="small" />
        </Box>
        <Box my={2}>S</Box>
        <Box>
          <Avatar firstName="Kname" lastName="Rname" photoUrl={photoUrl} s="small" />
        </Box>
      </Flex>

      <Flex column justify="space-around" align="center" mr={2}>
        <Box>
          <Avatar firstName="Jname" lastName="Sname" s="xsmall" />
        </Box>
        <Box my={2}>XS</Box>
        <Box>
          <Avatar firstName="Jname" lastName="Rname" photoUrl={photoUrl} s="xsmall" />
        </Box>
      </Flex>
    </Flex>
  ))
  .add('util props', () => (
    <Flex>
      <Avatar firstName="John" lastName="Doe" s="xxlarge" m={3} />
      <Avatar photoUrl={photoUrl} s="xxlarge" m={3} />
    </Flex>
  ))
  .add('preserves aspect ratio', () => (
    <Flex column align="flex-start">
      <Image src="https://placeimg.com/300/100/people" mb={2} />
      <Avatar photoUrl="https://placeimg.com/300/100/people" s="xxlarge" mb={2} />
      <Avatar photoUrl="https://placeimg.com/300/100/people" s="xlarge" mb={2} />
      <Avatar photoUrl="https://placeimg.com/300/100/people" s="large" mb={2} />
    </Flex>
  ));
