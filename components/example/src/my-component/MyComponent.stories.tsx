import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';

import MyComponent from './MyComponent';

storiesOf('MyPackage|MyComponent', module)
  .addDecorator(paddedBox)
  .add('default', () => <MyComponent>Hello</MyComponent>);
