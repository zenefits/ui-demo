import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import TaskList from './TaskList';
import { TaskState } from './types';

const tasks = [
  { title: 'Set up your company profile', taskRoute: '', state: TaskState.completed, etaInMinutes: 10 },
  { title: 'Add your employees', taskRoute: '', state: TaskState.started, etaInMinutes: 5 },
  { title: 'Choose your health benefits provider', taskRoute: '', state: TaskState.ready, etaInMinutes: 10 },
  { title: 'Set up your contribution policy', taskRoute: '', state: TaskState.notReady, etaInMinutes: 10 },
];

storiesOf('composites|TaskList', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1, null, 768]} p={4}>
      {getStory()}
    </Box>
  ))
  .add('single list', () => (
    <TaskList title="3 Tasks Remaining">
      {tasks.map(task => (
        <TaskList.Item key={task.title} {...task} />
      ))}
    </TaskList>
  ))
  .add('Multiple lists', () => (
    <Box>
      <TaskList mb={4} title="Getting Started">
        <TaskList.Item {...tasks[0]} />
        <TaskList.Item {...tasks[1]} />
      </TaskList>
      <TaskList title="Next steps">
        <TaskList.Item {...tasks[2]} />
        <TaskList.Item {...tasks[3]} />
      </TaskList>
    </Box>
  ));
