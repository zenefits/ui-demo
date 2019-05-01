import React, { createContext, Component, ConsumerProps } from 'react';

export interface Notification {
  message?: string;
  // later: type?: 'passive' | 'system'
}

export enum CloseReason {
  Clickaway = 'clickaway',
  Timeout = 'timeout',
}

export interface NotificationContextProps {
  notification: Notification;
  processNextNotification: () => void;
  openNotification: (message: string) => void;
  closeNotification: (event: any, reason?: CloseReason) => void;
  notificationIsOpen: boolean;
}

const NotificationContext = createContext<NotificationContextProps>(null as any);

type NotificationManagerProps = ConsumerProps<NotificationContextProps>;

// wrap in component for documentation purposes
class NotificationManager extends Component<NotificationManagerProps> {
  render() {
    return <NotificationContext.Consumer {...this.props} />;
  }
}

export default NotificationManager;

export { NotificationContext };
