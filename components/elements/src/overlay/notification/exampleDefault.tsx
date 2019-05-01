import React from 'react';

import { Box } from 'zbase';

import { Button } from '../../../index';
import NotificationManager from './NotificationManager';

class ComponentWithNotifications extends React.Component {
  render() {
    return (
      <NotificationManager>
        {notificationProps => (
          <Box>
            <Button onClick={() => notificationProps.openNotification('Task assigned to Marlene.')} mr={3}>
              Assign to Marlene
            </Button>
            <Button onClick={() => notificationProps.openNotification('Task assigned to Joe.')}>Assign to Joe</Button>
          </Box>
        )}
      </NotificationManager>
    );
  }
}

export default () => <ComponentWithNotifications />;
