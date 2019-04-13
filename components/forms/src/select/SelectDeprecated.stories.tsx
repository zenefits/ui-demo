import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import SelectDeprecated from './SelectDeprecated';

const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
  { value: 'long', label: 'this is a super long label going forever . . . still going . . . yes . . . still . . .' },
];

storiesOf('forms|SelectDeprecated', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <SelectDeprecated options={options} />)
  .add('placeholder', () => <SelectDeprecated options={options} placeholder="Placeholder" />)
  .add('util props', () => <SelectDeprecated options={options} placeholder="Placeholder" my={50} />)
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb={1}>
        <SelectDeprecated s="large" options={options} placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb={1}>
        <SelectDeprecated s="medium" options={options} placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb={1}>
        <SelectDeprecated s="small" options={options} placeholder="Placeholder" />
      </Box>
    </Flex>
  ))
  .add('default value', () => <SelectDeprecated options={options} value="no" />)
  .add('disabled', () => <SelectDeprecated options={options} value="yes" disabled />)
  .add('autoFocus', () => <SelectDeprecated options={options} autoFocus openOnFocus />)
  .add('multi', () => <SelectDeprecated options={options} multi value="yes,maybe,long" />)
  .add('error', () => <SelectDeprecated options={options} value="no" hasError />)
  .add(
    'fires events',
    () => (
      <SelectDeprecated
        options={options}
        placeholder="Try interacting"
        onFocus={action('select-onfocus')}
        onBlur={action('select-onblur')}
        onClick={action('select-onclick')}
        onChange={action('select-onchange')}
      />
    ),
    skipVisualTest,
  );
