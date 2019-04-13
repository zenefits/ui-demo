import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import TaskListProgress from './TaskListProgress';

storiesOf('composites|TaskListProgress', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1, 360]} p={4}>
      {getStory()}
    </Box>
  ))
  .add('not started', () => <TaskListProgress total={5} completed={0} />)
  .add('in progress', () => <TaskListProgress total={5} completed={1} />)
  .add('custom description', () => <TaskListProgress total={5} completed={1} description="Almost done!" />);
