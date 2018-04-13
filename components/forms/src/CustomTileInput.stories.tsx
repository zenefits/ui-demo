import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex } from 'zbase';
import { Card } from 'z-frontend-layout';

import CustomTileInput from './CustomTileInput';

storiesOf('Custom Tile Input', module)
  .addDecorator(getStory => (
    <Flex p={20} align-items="start">
      {getStory()}
    </Flex>
  ))
  .add('Basic', () => (
    <Flex>
      <Box w={[1, 1 / 2]} mr={4}>
        Radios
        <CustomTileInput name="Radios" value="one">
          <Card.Row>radio1</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="two">
          <Card.Row>radio2</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="three">
          <Card.Row>radio3</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Radios" value="four">
          <Card.Row>radio4</Card.Row>
        </CustomTileInput>
      </Box>
      <Box w={[1, 1 / 2]}>
        Checkboxes
        <CustomTileInput name="Checkboxes" value="one" isCheckbox>
          <Card.Row>checkbox1</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="two" isCheckbox>
          <Card.Row>checkbox2</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="three" isCheckbox>
          <Card.Row>checkbox3</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="Checkboxes" value="four" isCheckbox>
          <Card.Row>checkbox4</Card.Row>
        </CustomTileInput>
      </Box>
    </Flex>
  ))
  .add('Custom Tile states', () => (
    <Flex>
      <Box w={[1, 1 / 2]} mr={4}>
        Radios
        <CustomTileInput name="radioStates">
          <Card.Row>Normal</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="radioStates" defaultChecked>
          <Card.Row>Default Checked (Normal)</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="radioStates" disabled>
          <Card.Row>Disabled</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="radioStates" className="error">
          <Card.Row>Error</Card.Row>
        </CustomTileInput>
      </Box>
      <Box w={[1, 1 / 2]}>
        Checkboxes
        <CustomTileInput name="checkboxStates" isCheckbox>
          <Card.Row>Normal</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" defaultChecked isCheckbox>
          <Card.Row>Default Checked (Normal)</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" disabled isCheckbox>
          <Card.Row>Disabled</Card.Row>
        </CustomTileInput>
        <CustomTileInput name="checkboxStates" className="error" isCheckbox>
          <Card.Row>Error</Card.Row>
        </CustomTileInput>
      </Box>
    </Flex>
  ));
