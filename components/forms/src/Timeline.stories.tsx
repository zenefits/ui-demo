import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, P } from 'zbase';

import Timeline from './Timeline';

const startDate = new Date('1/1/2018');
const endDate = new Date('12/31/2018');
const lessValueDate = new Date('4/3/2018');
const greatValueDate = new Date('9/23/2018');
const middleValueDate = new Date('7/2/2018');

storiesOf('Timeline', module)
  .addDecorator(getStory => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('Basic', () => (
    <Box m={40}>
      <Box ml={4}>
        <P mt={4} mb={2}>
          Default
        </P>
        <Timeline startDate={startDate} endDate={endDate} valueDate={middleValueDate} />
        <P mt={4} mb={2}>
          Less than 50%
        </P>
        <Timeline startDate={startDate} endDate={endDate} valueDate={lessValueDate} />
        <P mt={4} mb={2}>
          Less than 50%, long date format
        </P>
        <Timeline startDate={startDate} endDate={endDate} valueDate={lessValueDate} rangeDateFormat="ll" />
        <P mt={4} mb={2}>
          Greater than 50%
        </P>
        <Timeline startDate={startDate} endDate={endDate} valueDate={greatValueDate} />
        <P mt={4} mb={2}>
          Greater than 50%, long date format
        </P>
        <Timeline startDate={startDate} endDate={endDate} valueDate={greatValueDate} rangeDateFormat="ll" />
        <P mt={4} mb={4}>
          With Label and OtherData
        </P>
        <Timeline
          startDate={startDate}
          endDate={endDate}
          valueDate={middleValueDate}
          otherData={'89 days'}
          label="Due in"
        />
      </Box>
    </Box>
  ));
