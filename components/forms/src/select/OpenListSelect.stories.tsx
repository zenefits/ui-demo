import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import OpenListSelect from './OpenListSelect';

const fruits = ['Apple', 'Banana', 'Orange', 'Peach', 'Mango', 'Grape', 'Kiwi', 'Pineapple', 'Avocado', 'Cheetos?'];

storiesOf('forms|OpenListSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <OpenListSelect<string> name="Fruit" label="Fruit" getOptionText={o => o}>
      {({ SelectOption }) => fruits.map(fruit => <SelectOption option={fruit} key={fruit} />)}
    </OpenListSelect>
  ))
  .add('loading', () => (
    <OpenListSelect<string> name="Fruit" label="Fruit" height={240} loading getOptionText={o => o}>
      {({ SelectOption }) => fruits.map(fruit => <SelectOption option={fruit} key={fruit} />)}
    </OpenListSelect>
  ));
