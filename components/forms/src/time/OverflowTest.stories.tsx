import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import TimeInput from './TimeInput';
import DateInput from '../date-picker/DateInput';
import SearchSelect from '../search/SearchSelect';

const selectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

storiesOf('forms|OverflowTest', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('appears outside overflow (eg EditableTable)', () => (
    <div style={{ overflow: 'hidden' }}>
      <Flex justify="space-between">
        <TimeInput name="test" defaultIsOpen />
        <DateInput autoFocus />
        <SearchSelect<string> getOptionText={o => o} alwaysExpandInput defaultIsOpen>
          {({ SelectOption, basicOptionFilter }) =>
            basicOptionFilter(selectOptions).map(option => <SelectOption key={option} option={option} />)
          }
        </SearchSelect>
      </Flex>
    </div>
  ));
