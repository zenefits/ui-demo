import React from 'react';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleAvatar from './exampleAvatar';

storiesOf('tables|Table.AvatarCell', module).add('row with avatar cell', () => <ExampleAvatar />);
