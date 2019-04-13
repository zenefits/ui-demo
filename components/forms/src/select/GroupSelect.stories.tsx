import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import GroupSelect from './GroupSelect';

const groups = [
  {
    groupName: 'Warriors',
    options: [
      { value: 30, label: 'Steph' },
      { value: 35, label: 'Kevin' },
      { value: 11, label: 'Klay' },
      { value: 23, label: 'Draymond' },
    ],
  },
  {
    groupName: 'Celtics',
    options: [
      { value: 11, label: 'Kyrie' },
      { value: 0, label: 'Jayson' },
      { value: 7, label: 'Jaylen' },
      { value: 20, label: 'Gordon' },
      { value: 42, label: 'Al' },
    ],
  },
];

storiesOf('forms|GroupSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <GroupSelect groups={groups} name="Groups" />)
  .add('tethered', () => <GroupSelect groups={groups} name="Groups" isTethered />, skipVisualTest)
  .add('disabled', () => <GroupSelect groups={groups} name="Groups" disabled />)
  .add('placeholder', () => <GroupSelect groups={groups} name="Groups" placeholder="Select a player..." />);
