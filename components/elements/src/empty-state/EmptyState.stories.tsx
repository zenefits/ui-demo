import React from 'react';

import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import EmptyState from './EmptyState';
import { Link } from '../..';

storiesOf('elements|EmptyState', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <EmptyState />)
  .add('ask to reload', () => <EmptyState askToReload />)
  .add('custom message', () => <EmptyState message="You're all caught up." iconName="check" />)
  .add('custom message (with link)', () => (
    <EmptyState
      message={
        <TextBlock>
          You have no friends yet. <Link href="https://google.com">Invite friends</Link>
        </TextBlock>
      }
      iconName="account-circle"
      askToReload={false}
    />
  ))
  .add('util props', () => <EmptyState py={3} color="secondary.a" bg="secondary.c" />);
