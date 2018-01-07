import React from 'react';
import { Box, Flex } from 'rebass';
import { storiesOf } from '@storybook/react';
import InitialsAvatar from './InitialsAvatar';

const picsrc =
  'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-30.jpg';
storiesOf('InitialsAvatar', module).add('InitialsAvatar states', () => (
  <Flex align="center">
    <Box mr={2}>
      <InitialsAvatar firstName={'Nname'} lastName={'Rname'} s="xxlarge" />
    </Box>
    <Box mr={2}>
      <InitialsAvatar firstName={'Nname'} lastName={'Rname'} s="xxlarge" disabled />
    </Box>
    <Box mr={2}>
      <InitialsAvatar firstName={'Nname'} lastName={'Rname'} photoUrl={picsrc} s="xxlarge" />
    </Box>
    <Box mr={2}>
      <InitialsAvatar firstName={'Nname'} lastName={'Rname'} photoUrl={picsrc} s="xxlarge" disabled />
    </Box>
  </Flex>
));

storiesOf('InitialsAvatar', module).add('InitialsAvatar Sizes', () => (
  <Flex wrap align="center">
    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Nname'} lastName={'Rname'} s="xxlarge" />
      </Box>
      <Box my={2}>XXL</Box>
      <Box>
        <InitialsAvatar firstName={'Nname'} lastName={'Rname'} photoUrl={picsrc} s="xxlarge" />
      </Box>
    </Flex>

    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Mname'} lastName={'Rname'} s="xlarge" />
      </Box>
      <Box my={2}>XL</Box>
      <Box>
        <InitialsAvatar firstName={'Mname'} lastName={'Rname'} photoUrl={picsrc} s="xlarge" />
      </Box>
    </Flex>

    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Tname'} lastName={'Fname'} s="large" />
      </Box>
      <Box my={2}>L</Box>
      <Box>
        <InitialsAvatar firstName={'Tname'} lastName={'Rname'} photoUrl={picsrc} s="large" />
      </Box>
    </Flex>

    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Mname'} lastName={'Wname'} />
      </Box>
      <Box my={2}>M</Box>
      <Box>
        <InitialsAvatar firstName={'Mname'} lastName={'Rname'} photoUrl={picsrc} />
      </Box>
    </Flex>

    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Kname'} lastName={'Sname'} s="small" />
      </Box>
      <Box my={2}>S</Box>
      <Box>
        <InitialsAvatar firstName={'Kname'} lastName={'Rname'} photoUrl={picsrc} s="small" />
      </Box>
    </Flex>

    <Flex column justify="space-evenly" align="center" mr={2}>
      <Box>
        <InitialsAvatar firstName={'Jname'} lastName={'Sname'} s="xsmall" />
      </Box>
      <Box my={2}>XS</Box>
      <Box>
        <InitialsAvatar firstName={'Jname'} lastName={'Rname'} photoUrl={picsrc} s="xsmall" />
      </Box>
    </Flex>
  </Flex>
));
