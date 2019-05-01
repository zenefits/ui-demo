import React, { Component } from 'react';

import { CloseReason, Notification, NotificationContext, NotificationContextProps } from './NotificationManager';
import PassiveNotification from './PassiveNotification';

interface NotificationProviderState {
  isOpen: boolean;
  notification: Notification;
}

class NotificationProvider extends Component<{}, NotificationProviderState> {
  queue: Notification[] = [];

  constructor(props: {}) {
    super(props);

    this.state = {
      isOpen: false,
      notification: {},
    };
  }

  openNotification = (message: string) => {
    this.queue.push({
      message,
    });

    if (this.state.isOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ isOpen: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        notification: this.queue.shift() as Notification,
        isOpen: true,
      });
    }
  };

  closeNotification = (event: any, reason: CloseReason) => {
    if (reason === CloseReason.Clickaway) {
      return;
    }

    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    const value: NotificationContextProps = {
      notification: this.state.notification,
      processNextNotification: this.processQueue,
      openNotification: this.openNotification,
      closeNotification: this.closeNotification,
      notificationIsOpen: this.state.isOpen,
    };
    return (
      <NotificationContext.Provider value={value}>
        <PassiveNotification />
        {children}
      </NotificationContext.Provider>
    );
  }
}

export default NotificationProvider;
