import React, { Component } from 'react';

import Notification from './Notification';
import NotificationManager from './NotificationManager';

const passiveNotificationDelay = 6 * 1000;

/** Notification that self-closes after a set period. */
class PassiveNotification extends Component {
  render() {
    return (
      <NotificationManager>
        {({ notificationIsOpen, notification, closeNotification, processNextNotification }) => (
          <Notification
            key={notification.message}
            open={notificationIsOpen}
            onClose={closeNotification}
            onExited={processNextNotification}
            autoHideDuration={passiveNotificationDelay}
          >
            {notification.message}
          </Notification>
        )}
      </NotificationManager>
    );
  }
}

export default PassiveNotification;
