import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex, Icon, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import RadioToggle from './RadioToggle';

storiesOf('forms|RadioToggle', module)
  .addDecorator((getStory: Function) => <Flex>{getStory()}</Flex>)
  .add('default', () => (
    <Box w={[1, 2 / 3]}>
      <Flex wrap mt={50}>
        <Box mx={4}>
          <TextBlock my={2}> Neutral</TextBlock>
          <RadioToggle name="option1" onLabel="On Track" offLabel="Off Track" />
        </Box>
        <Box mx={4}>
          <TextBlock my={2}> Good Checked</TextBlock>
          <RadioToggle
            name="option2"
            onLabel="On Track"
            offLabel="Off Track"
            onValue="exampleOn"
            offValue="exampleOff"
            selectedValue="exampleOn"
          />
        </Box>
        <Box mx={4}>
          <TextBlock my={2}> Bad Checked</TextBlock>
          <RadioToggle
            name="option3"
            onLabel="On Track"
            offLabel="Off Track"
            onValue="exampleOn"
            offValue="exampleOff"
            selectedValue="exampleOff"
          />
        </Box>
      </Flex>

      <Box m={4}>
        <TextBlock my={2}> Icons</TextBlock>
        <RadioToggle name="option4" onLabel={<Icon iconName="check" />} offLabel={<Icon iconName="close" />} />
      </Box>
      <Box m={4}>
        <TextBlock my={2}> Disabled</TextBlock>
        <RadioToggle name="option5" onLabel="On Track" offLabel="Off Track" disabled />
      </Box>
      <Box m={4}>
        <TextBlock my={2}> Handles events</TextBlock>
        <RadioToggle
          name="option6"
          onLabel="On Track"
          offLabel="Off Track"
          onFocus={action('radio-onfocus')}
          onBlur={action('radio-onblur')}
          onKeyUp={action('radio-onkeyup')}
          onChange={action('radio-onchange')}
          onClick={action('radio-onclick')}
        />
      </Box>
    </Box>
  ));
