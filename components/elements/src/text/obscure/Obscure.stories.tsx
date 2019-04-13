import React from 'react';

import { Flex } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import Obscure from './Obscure';

const defaultText = '123456789';

storiesOf('elements|Obscure', module)
  .addDecorator((getStory: Function) => <Flex p={20}>{getStory()}</Flex>)
  .add('default', () => <Obscure value={defaultText} />)
  .add('visibleCount', () => <Obscure value={defaultText} visibleCount={2} />)
  .add('util props', () => <Obscure value={defaultText} fontStyle="paragraphs.xxl" visibleCount={2} />);
