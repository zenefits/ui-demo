import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { images } from 'z-frontend-theme';

import { Box, Flex, Image, Label } from '../index';

storiesOf('zbase|Label', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <Flex>
      <Label mr={2}>Logo</Label>
      <Image src={images.logo} height="auto" maxWidth={150} alt="Zenefits Logo" />
    </Flex>
  ))
  .add('util prop', () => <Label color="primary.a">Label with color</Label>);
