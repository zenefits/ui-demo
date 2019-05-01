import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SearchSelect from './SearchSelect';

const optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

storiesOf('forms|SearchSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <SearchSelect<string>
      name="test"
      onChange={action('input value changed')}
      onSelect={action('option selected')}
      getOptionText={o => o}
    >
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ))
  .add('open', () => (
    <SearchSelect<string> name="test" autoFocus alwaysExpandInput defaultIsOpen getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ))
  .add('render no results', () => (
    <SearchSelect<string>
      name="test"
      autoFocus
      alwaysExpandInput
      defaultIsOpen
      renderNoResults={() => <Box p={3}>No results found</Box>}
      getOptionText={o => o}
    >
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter([]).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ))
  .add('loading', () => (
    <SearchSelect<string> name="test" autoFocus alwaysExpandInput defaultIsOpen isLoading getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ))
  .add('disabled', () => (
    <SearchSelect<string> name="test" disabled getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ))
  .add('expanded and disabled', () => (
    <SearchSelect<string> name="test" alwaysExpandInput disabled getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </SearchSelect>
  ));
