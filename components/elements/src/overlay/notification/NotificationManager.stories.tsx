import React, { Component } from 'react';
import faker from 'faker';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Button } from '../../../index';
import NotificationManager from './NotificationManager';

// set the seed so results will be consistent
faker.seed(123);

class SomeComponentThatNeedsNotifications extends Component {
  render() {
    return (
      <NotificationManager>
        {notificationProps => (
          <Box p={3}>
            <Button onClick={() => notificationProps.openNotification(`Task assigned to ${faker.name.findName()}.`)}>
              Assign task
            </Button>
          </Box>
        )}
      </NotificationManager>
    );
  }
}

storiesOf('elements|NotificationManager', module).add('default', () => <SomeComponentThatNeedsNotifications />);
