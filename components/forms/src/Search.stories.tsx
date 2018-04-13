import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';

import Search, { BasicSearch, Option } from './Search';

const optionList = [
  { value: 'Option 1' },
  { value: 'Option 2' },
  { value: 'Option 3' },
  { value: 'Option 4' },
  { value: 'Option 5' },
  { value: 'Option 6' },
];

const getOptions = query => optionList.filter(option => option.value.toLowerCase().includes(query.toLowerCase()));

const getOptionsAsync = query => {
  return new Promise<Option[]>(resolve => setTimeout(() => resolve(getOptions(query)), 200));
};

storiesOf('Search', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('sync', () => <Search getOptions={getOptions} async={false} debounce={false} />)
  .add('basic', () => <BasicSearch options={optionList} limit={3} />)
  .add('async', () => <Search getOptions={getOptionsAsync} />)
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb={1}>
        <Search s="large" getOptions={getOptions} />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb={1}>
        <Search s="medium" getOptions={getOptions} />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb={1}>
        <Search s="small" getOptions={getOptions} />
      </Box>
    </Flex>
  ))
  .add('fires events', () => (
    <Search
      getOptions={getOptionsAsync}
      onChange={query => action(`Query updated to: ${query}`)()}
      onSubmit={query => action(`Query submitted: ${query}`)()}
      onSelection={action(`on-selection`)}
    />
  ))
  .add('initial query', () => <Search getOptions={getOptionsAsync} initialQuery="UIE" />)
  .add('button text and input placeholder', () => (
    <Search getOptions={getOptionsAsync} buttonText="buttonText" placeholder="placeholder" />
  ));
