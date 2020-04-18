import React from 'react';

import { TextInline } from 'zbase';
import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import Notification from './Notification';

storiesOf('elements|Notification', module)
  .addDecorator(paddedBox)
  .add('default', () => <Notification open>Task assigned.</Notification>)
  .add('formatted content', () => (
    <Notification open>
      <TextInline>
        Task{' '}
        <TextInline bold color="tertiary.b">
          123
        </TextInline>{' '}
        assigned.
      </TextInline>
    </Notification>
  ))
  .add('wraps to two lines', () => (
    <Notification open>
      This message is quite long. You should stick to about 75 characters because of mobile. But this is longer to force
      a wrap.
    </Notification>
  ));
