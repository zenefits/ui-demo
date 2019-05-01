import React, { ReactElement, StatelessComponent } from 'react';

import { Flex, Icon } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/utils';

import { TaskState } from './types';

type TaskStatusIconProps = {
  state: TaskState;
};

const CircleWithBorder = styled(Flex.extendProps<TaskStatusIconProps>())`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: ${space(3)};
  flex-shrink: 0;
  background-color: ${props => (props.state === 'completed' ? color('affirmation.b') : color('grayscale.g'))};
  border: ${props => (props.state === 'completed' ? "1px solid ${color('grayscale.f')" : 'none')};
`;

const CircleWithLock: StatelessComponent<{}> = () => (
  <CircleWithBorder state={TaskState.notReady} align="center" justify="center">
    <Icon s="medium" iconName="lock" color="grayscale.e" />
  </CircleWithBorder>
);

const CircleWithCheckbox: StatelessComponent<{}> = props => (
  <CircleWithBorder state={TaskState.completed} align="center" justify="center">
    <Icon s="medium" iconName="check" color="grayscale.white" />
  </CircleWithBorder>
);

const ICON_MAP: { [key in TaskState]: ReactElement<any> } = {
  notReady: <CircleWithLock />,
  ready: <CircleWithBorder state={TaskState.notReady} />,
  started: <CircleWithBorder state={TaskState.started} />,
  completed: <CircleWithCheckbox />,
};

const TaskStatusIcon: StatelessComponent<TaskStatusIconProps> = ({ state }) => ICON_MAP[state];

export default TaskStatusIcon;
