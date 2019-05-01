import React from 'react';

import { storiesOf } from '../.storybook/storyHelpers';

import MyComponent from './MyComponent';

storiesOf('component-example|MyComponent', module).add('default', () => <MyComponent>Hello</MyComponent>);
