import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Example from './exampleDefault';

storiesOf('layout|DrawerWindow', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={1}>
      <Router>{getStory()}</Router>
    </Flex>
  ))
  .add('default', () => <Example />);
