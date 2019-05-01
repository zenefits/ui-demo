import React, { StatelessComponent } from 'react';

import { Box, BoxProps, Flex } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import LoadingSpinner from './LoadingSpinner';

const Container: StatelessComponent<BoxProps> = props => <Box w={50} style={{ height: 50 }} {...props} />;

storiesOf('elements|LoadingSpinner', module)
  .add('default', () => (
    <Container>
      <LoadingSpinner />
    </Container>
  ))
  .add('with util props', () => (
    <Container>
      <LoadingSpinner bg="secondary.b" m={4} />
    </Container>
  ))
  .add('with size', () => (
    <Flex direction="column">
      <LoadingSpinner s="xxlarge" mb={3} />
      <LoadingSpinner s="xlarge" mb={3} />
      <LoadingSpinner s="large" mb={3} />
      <LoadingSpinner s="medium" mb={3} />
      <LoadingSpinner s="small" />
    </Flex>
  ));
