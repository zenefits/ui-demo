import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import Input from './Input';
import PercentageInput from '../percentage-input/PercentageInput';
import MoneyInput from '../money-input/MoneyInput';
import NumberInput from '../number-input/NumberInput';
import InputWithIcon from '../input-with-icon/InputWithIcon';

storiesOf('forms|Input', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Input />)
  .add('placeholder', () => <Input placeholder="Placeholder" />)
  .add('util props', () => <Input placeholder="Placeholder" my={50} />)
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb="5px">
        <Input s="large" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb="5px">
        <Input s="medium" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb="5px">
        <Input s="small" placeholder="Placeholder" />
      </Box>
    </Flex>
  ))
  .add('default value', () => <Input defaultValue="Default" />)
  .add('disabled', () => <Input value="Cannot be edited, focused or submitted" disabled />)
  .add('readOnly', () => <Input value="Cannot be edited, but can be focused and submitted" readOnly />)
  .add('error', () => <Input defaultValue="Invalid input" hasError />)
  .add(
    'fires events',
    () => (
      <Input
        defaultValue="Try interacting"
        onFocus={action('input-onfocus')}
        onBlur={action('input-onblur')}
        onKeyUp={action('input-onkeyup')}
        onChange={action('input-onchange')}
      />
    ),
    skipVisualTest,
  )
  .add('with icon', () => (
    <Box mb={3}>
      <InputWithIcon
        leftIconName="search"
        onLeftIconClick={action('input-icon-onclick')}
        rightIconName="close"
        placeholder="Search..."
        s="small"
      />
      <InputWithIcon
        leftIconName="search"
        onLeftIconClick={action('input-icon-onclick')}
        rightIconName="close"
        placeholder="Search..."
        s="medium"
      />
      <InputWithIcon
        leftIconName="search"
        onLeftIconClick={action('input-icon-onclick')}
        rightIconName="close"
        placeholder="Search..."
        s="large"
      />
    </Box>
  ))
  .add('with icon and width', () => (
    <Box mb={3}>
      <InputWithIcon
        leftIconName="search"
        onLeftIconClick={action('input-icon-onclick')}
        rightIconName="close"
        placeholder="Search..."
        w={1 / 2}
      />
    </Box>
  ))
  .add('masked inputs (money, number, percentage)', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Number Input</Box>
      <Box w={2 / 3} mb="5px">
        <NumberInput placeholder="number" allowNegative value="-333" />
      </Box>
      <Box w={1 / 3}>Percentage Input</Box>
      <Box w={2 / 3} mb="5px">
        <PercentageInput placeholder="percentage" value="33" />
      </Box>
      <Box w={1 / 3}>Money Input</Box>
      <Box w={2 / 3} mb="5px">
        <MoneyInput placeholder="Enter amount" value="33333" />
      </Box>
    </Flex>
  ));
