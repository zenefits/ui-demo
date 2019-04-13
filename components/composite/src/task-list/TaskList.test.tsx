import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { stubWindowSize } from 'z-frontend-theme/test-utils/responsive';

import TaskList from './TaskList';
import { TaskState } from './types';

describe('MyComponent', () => {
  const tasks = [
    { title: 'Set Up Your Company Profile', taskRoute: '', state: TaskState.completed, etaInMinutes: 10 },
    { title: 'Add Your Employees', taskRoute: '', state: TaskState.started, etaInMinutes: 5 },
    { title: 'Choose Your Health Benefits Provider', taskRoute: '', state: TaskState.ready, etaInMinutes: 10 },
    { title: 'Set Up Your Contribution Policy', taskRoute: '', state: TaskState.notReady, etaInMinutes: 10 },
  ];

  it('should render tasks', () => {
    stubWindowSize(1024);
    const wrapper = renderWithContext(
      <BrowserRouter>
        <TaskList title="3 Tasks Remaining">
          {tasks.map(task => (
            <TaskList.Item key={task.title} {...task} />
          ))}
        </TaskList>
      </BrowserRouter>,
    );
    wrapper.getByText('3 Tasks Remaining');
    tasks.forEach(task => {
      wrapper.getByText(task.title, { exact: false });
    });
  });
});
