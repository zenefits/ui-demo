import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SimpleSelect from './SimpleSelect';

storiesOf('forms|SimpleSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('placeholder', () => (
    <SimpleSelect<string> name="Fruit" placeholder="Select a fruit..." getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Apple" />}
    </SimpleSelect>
  ))
  .add('disabled', () => (
    <SimpleSelect<string> name="Fruit" disabled getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Option 1" />}
    </SimpleSelect>
  ))
  .add('error', () => (
    <SimpleSelect<string> name="Fruit" error="This is an error" getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Option 1" />}
    </SimpleSelect>
  ))
  .add('focused', () => (
    <SimpleSelect<string> name="Fruit" autoFocus getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Option 1" />}
    </SimpleSelect>
  ))
  .add('sizes', () => (
    <>
      <Box mb={2}>
        <SimpleSelect<string> name="Fruit" s="large" getOptionText={o => o}>
          {({ SelectOption }) => <SelectOption option="Option 1" />}
        </SimpleSelect>
      </Box>
      <Box mb={2}>
        <SimpleSelect<string> name="Fruit" s="medium" getOptionText={o => o}>
          {({ SelectOption }) => <SelectOption option="Option 1" />}
        </SimpleSelect>
      </Box>
      <Box mb={2}>
        <SimpleSelect<string> name="Fruit" s="small" getOptionText={o => o}>
          {({ SelectOption }) => <SelectOption option="Option 1" />}
        </SimpleSelect>
      </Box>
    </>
  ));
