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
  .add('with value', () => (
    <SimpleSelect<string> name="Fruit" getOptionText={o => o} value="Apple">
      {({ SelectOption }) => <SelectOption option="Apple" />}
    </SimpleSelect>
  ))
  .add('with long value', () => (
    <SimpleSelect<string> name="Fruit" getOptionText={o => o} value="very very long value" w={150}>
      {({ SelectOption }) => <SelectOption option="very very long value" />}
    </SimpleSelect>
  ))
  .add('disabled', () => (
    <SimpleSelect<string> name="Fruit" disabled getOptionText={o => o} value="Apple">
      {({ SelectOption }) => <SelectOption option="Apple" />}
    </SimpleSelect>
  ))
  .add('error', () => (
    <SimpleSelect<string> name="Fruit" error="This is an error" getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Apple" />}
    </SimpleSelect>
  ))
  .add('focused', () => (
    <SimpleSelect<string> name="Fruit" autoFocus getOptionText={o => o}>
      {({ SelectOption }) => <SelectOption option="Apple" />}
    </SimpleSelect>
  ))
  .add('sizes', () => (
    <>
      <Box mb={2}>
        <SimpleSelect<string> name="Fruit" s="large" getOptionText={o => o}>
          {({ SelectOption }) => <SelectOption option="Apple" />}
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
