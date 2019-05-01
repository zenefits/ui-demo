import React from 'react';
// @ts-ignore
import { date, number, select, text } from '@storybook/addon-knobs';

import { colorsMap } from 'z-frontend-theme';
import { Box, Flex, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Timeline from './Timeline';

const defaultStartDate = new Date('1/1/2018');
const defaultEndDate = new Date('12/31/2018');
const lessValueDate = new Date('4/3/2018');
const greatValueDate = new Date('9/23/2018');
const middleValueDate = new Date('7/2/2018');

storiesOf('charts|Timeline', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('Default', () => {
    const startDate = new Date(date('startDate', defaultStartDate));
    const endDate = new Date(date('endDate', defaultEndDate));
    const valueDate = new Date(date('valueDate', middleValueDate));
    return (
      <Box w={1}>
        <TextBlock mt={4} mb={2}>
          Default
        </TextBlock>
        <Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />
      </Box>
    );
  })
  .add('Less than 50%', () => {
    const startDate = new Date(date('startDate', defaultStartDate));
    const endDate = new Date(date('endDate', defaultEndDate));
    const valueDate = new Date(date('valueDate', lessValueDate));
    return (
      <Box w={1}>
        <TextBlock mt={4} mb={2}>
          Less Than 50%
        </TextBlock>
        <Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />
        <TextBlock mt={4} mb={2}>
          Less Than 50%, Long Date format
        </TextBlock>
        <Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />
      </Box>
    );
  })
  .add('Greater than 50%', () => {
    const startDate = new Date(date('startDate', defaultStartDate));
    const endDate = new Date(date('endDate', defaultEndDate));
    const valueDate = new Date(date('valueDate', greatValueDate));
    return (
      <Box w={1}>
        <TextBlock mt={4} mb={2}>
          Greater Than 50%
        </TextBlock>
        <Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />
        <TextBlock mt={4} mb={2}>
          Greater Than 50%, Long Date format
        </TextBlock>
        <Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />
      </Box>
    );
  })
  .add('With Label and other Data', () => {
    const startDate = new Date(date('startDate', defaultStartDate));
    const endDate = new Date(date('endDate', defaultEndDate));
    const valueDate = new Date(date('valueDate', middleValueDate));
    const dynamicOtherData = text('otherData', '89 days');
    const dyanmicLabel = text('label', 'Due in');
    return (
      <Box w={1}>
        <Timeline
          startDate={startDate}
          endDate={endDate}
          valueDate={valueDate}
          otherData={dynamicOtherData}
          label={dyanmicLabel}
        />
      </Box>
    );
  })
  .add('With ProgressColor and ProgressValue', () => {
    const progressValueOptions = {
      range: true,
      min: 0,
      max: 1.0,
      step: 0.1,
    };
    const startDate = new Date(date('startDate', defaultStartDate));
    const endDate = new Date(date('endDate', defaultEndDate));
    const valueDate = new Date(date('valueDate', middleValueDate));
    const dynamicProgressColor = select('progressColor', Object.keys(colorsMap));
    const dynamicProgressValue = number('progressValue', 0.2, progressValueOptions);
    return (
      <Box w={1}>
        <Timeline
          startDate={startDate}
          endDate={endDate}
          valueDate={valueDate}
          progressColor={dynamicProgressColor}
          progressValue={dynamicProgressValue}
        />
      </Box>
    );
  });
