import React from 'react';
import { storiesOf } from '@storybook/react';

import { Flex } from 'zbase';

import ObscureToggle from './ObscureToggle';

const defaultText = '123456789';

storiesOf('ObscureToggle', module)
  .addDecorator(getStory => <Flex p={20}>{getStory()}</Flex>)
  .add('ssn', () => <ObscureToggle value={defaultText} valueType="ssn" />)
  .add('custom', () => <ObscureToggle value={defaultText} valueType="custom" visibleCount={2} />)
  .add('util props', () => <ObscureToggle value={defaultText} valueType="ssn" fontStyle="paragraphs.xxl" />);
