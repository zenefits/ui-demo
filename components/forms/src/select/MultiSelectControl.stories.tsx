import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MultiSelectControl from './MultiSelectControl';

storiesOf('forms|MultiSelectControl', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('with selections', () => (
    <Flex direction="column">
      <MultiSelectControl
        placeholder="test"
        selections={['First', 'Second', 'Third']}
        onKeyDown={action('Key pressed')}
      />
      <Box
        mt={3}
        width={200} // constrain to force word-break
      >
        <MultiSelectControl
          placeholder="test"
          selections={[
            'Lakshminarasimhan Srinivasa-Raghavan',
            'Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr',
          ]}
          onKeyDown={action('Key pressed')}
        />
      </Box>
    </Flex>
  ))
  .add('disabled', () => <MultiSelectControl placeholder="test" selections={['First', 'Second', 'Third']} disabled />)
  .add('no selections', () => <MultiSelectControl placeholder="This is a placeholder" selections={[]} />)
  .add('error', () => <MultiSelectControl placeholder="test" selections={['First', 'Second', 'Third']} hasError />);
