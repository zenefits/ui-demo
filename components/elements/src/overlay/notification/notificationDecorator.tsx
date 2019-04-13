import React from 'react';

import NotificationProvider from './NotificationProvider';

export default function notificationDecorator(storyFn: Function) {
  return <NotificationProvider>{storyFn()}</NotificationProvider>;
}
