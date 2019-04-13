import React from 'react';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import CustomTileInput from './CustomTileInput';

storiesOf('forms|CustomTileInput', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} align-items="start">
      {getStory()}
    </Flex>
  ))
  .add('Basic', () => (
    <Flex>
      <Box w={1} mr={4}>
        Radios
        <CustomTileInput name="Radios" value="one" my={4}>
          <Box p={2}>radio1</Box>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="two" my={4}>
          <Box p={2}>radio2</Box>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="three" my={4}>
          <Box p={2}>radio3</Box>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="four" my={4}>
          <Box p={2}>radio4</Box>
        </CustomTileInput>
      </Box>
      <Box w={1}>
        Checkboxes
        <CustomTileInput name="Checkboxes" value="one" isCheckbox my={4}>
          <Box p={2}>checkbox1</Box>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="two" isCheckbox my={4}>
          <Box p={2}>checkbox2</Box>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="three" isCheckbox my={4}>
          <Box p={2}>checkbox3</Box>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="four" isCheckbox my={4}>
          <Box p={2}>checkbox4</Box>
        </CustomTileInput>
      </Box>
    </Flex>
  ))
  .add('Custom Tile states', () => (
    <Flex>
      <Box w={[1, 1 / 2]} mr={4}>
        Radios
        <CustomTileInput name="radioStates" my={4}>
          <Box p={2}>Normal</Box>
        </CustomTileInput>
        <CustomTileInput name="radioStates" defaultChecked my={4}>
          <Box p={2}>Default Checked (Normal)</Box>
        </CustomTileInput>
        <CustomTileInput name="radioStates" disabled my={4}>
          <Box p={2}>Disabled</Box>
        </CustomTileInput>
        <CustomTileInput name="radioStates" className="error" my={4}>
          <Box p={2}>Error</Box>
        </CustomTileInput>
      </Box>
      <Box w={[1, 1 / 2]}>
        Checkboxes
        <CustomTileInput name="checkboxStates" isCheckbox my={4}>
          <Box p={2}>Normal</Box>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" defaultChecked isCheckbox my={4}>
          <Box p={2}>Default Checked (Normal)</Box>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" disabled isCheckbox my={4}>
          <Box p={2}>Disabled</Box>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" className="error" isCheckbox my={4}>
          <Box p={2}>Error</Box>
        </CustomTileInput>
      </Box>
    </Flex>
  ))
  .add('Error', () => (
    <Box w={[1, 1 / 2]} mr={4}>
      <CustomTileInput name="Radios" value="one" my={4} className="error">
        <Box p={2}>radio1</Box>
      </CustomTileInput>
      <CustomTileInput name="Radios" value="two" my={4}>
        <Box p={2}>radio2</Box>
      </CustomTileInput>
    </Box>
  ))
  .add('Disabled', () => (
    <Box w={[1, 1 / 2]} mr={4}>
      <CustomTileInput name="Radios" value="one" my={4} disabled>
        <Box p={2}>radio1</Box>
      </CustomTileInput>
      <CustomTileInput name="Radios" value="two" my={4}>
        <Box p={2}>radio2</Box>
      </CustomTileInput>
    </Box>
  ));
