import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Select from './Select';

const optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
storiesOf('forms|Select', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <Select<string> name="example" label="example" s="large" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Select>
  ))
  .add('with value', () => (
    <Select<string> name="example" label="example" s="large" value="Option 1" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Select>
  ))
  .add('error', () => (
    <Select<string> name="error" label="error example" error="This is an error" getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Select>
  ))
  .add('open', () => (
    <Select<string> name="open" label="open" autoFocus openOnFocus getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Select>
  ))
  .add('disabled', () => (
    <Select<string> name="disabled" label="disabled" value="Option 1" disabled getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
      }
    </Select>
  ))
  .add('disabled option', () => (
    <Select<string> name="disabled" label="disabled" disabled getOptionText={o => o}>
      {({ SelectOption, basicOptionFilter }) =>
        basicOptionFilter(optionList).map(option =>
          option === optionList[0] ? (
            <SelectOption key={option} option={option} disabled />
          ) : (
            <SelectOption key={option} option={option} />
          ),
        )
      }
    </Select>
  ))
  .add('elipsis for long string', () => {
    const optionsWithLongString = [...optionList, 'Option with a longer string than the others'];
    return (
      <Box p={20} w={300} bg="grayscale.white">
        <Select<string> name="example" label="example" getOptionText={o => o}>
          {({ SelectOption, basicOptionFilter }) =>
            basicOptionFilter(optionsWithLongString).map(option =>
              option === optionList[0] ? (
                <SelectOption key={option} option={option} disabled />
              ) : (
                <SelectOption key={option} option={option} />
              ),
            )
          }
        </Select>
      </Box>
    );
  });
