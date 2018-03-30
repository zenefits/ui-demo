import React from 'react';
import { storiesOf } from '@storybook/react';
import { Flex, Box, P, Icon } from 'zbase';
import { action } from '@storybook/addon-actions';
import RadioToggle from './RadioToggle';

storiesOf('Radio Toggle', module)
  .addDecorator(getStory => <Flex>{getStory()}</Flex>)
  .add('default', () => (
    <Box w={[1, 2 / 3]}>
      <Flex wrap mt={50}>
        <Box mx={4}>
          <P my={2}> Neutral</P>
          <RadioToggle name="option1" onLabel="On Track" offLabel="Off Track" />
        </Box>
        <Box mx={4}>
          <P my={2}> Good Checked</P>
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
          <P my={2}> Bad Checked</P>
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
        <P my={2}> Icons</P>
        <RadioToggle name="option4" onLabel={<Icon iconName="check" />} offLabel={<Icon iconName="close" />} />
      </Box>
      <Box m={4}>
        <P my={2}> Disabled</P>
        <RadioToggle name="option5" onLabel="On Track" offLabel="Off Track" disabled />
      </Box>
      <Box m={4}>
        <P my={2}> Handles events</P>
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
