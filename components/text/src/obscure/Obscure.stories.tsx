import React from 'react';
import { storiesOf } from '@storybook/react';

import { Flex } from 'zbase';

import Obscure from './Obscure';

const defaultText = '123456789';

storiesOf('Obscure', module)
  .addDecorator(getStory => <Flex p={20}>{getStory()}</Flex>)
  .add('default', () => <Obscure value={defaultText} />)
  .add('visibleCount', () => <Obscure value={defaultText} visibleCount={2} />)
  .add('util props', () => <Obscure value={defaultText} fontStyle="paragraphs.xxl" visibleCount={2} />);
