import React from 'react';

import { Box } from 'zbase';

import Timeline from './Timeline';

const startDate = new Date('1/1/2018');
const endDate = new Date('12/31/2018');
const currentDate = new Date('9/23/2018');

const progressValue = 0.75;
const currentValue = 2000;
const targetValue = 10000;

export default () => (
  <Box>
    <Box m={5}>
      <Timeline
        startDate={startDate}
        endDate={endDate}
        valueDate={currentDate}
        progressColor={progressValue > 0.5 ? 'affirmation.a' : 'negation.a'}
        progressValue={progressValue}
        label="Increase Coverage"
        otherData={`${100 * progressValue}%`}
      />
    </Box>
    <Box m={5}>
      <Timeline
        startDate={startDate}
        endDate={endDate}
        valueDate={currentDate}
        progressColor={currentValue / targetValue > 0.5 ? 'affirmation.a' : 'negation.a'}
        progressValue={currentValue / targetValue}
        label="Raise Money"
        otherData={`$${currentValue} / $${targetValue}`}
      />
    </Box>
  </Box>
);
