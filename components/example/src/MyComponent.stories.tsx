import React from 'react';
import { storiesOf } from '@storybook/react';
import MyComponent from './MyComponent';

storiesOf('MyComponent', module).add('example story', () => <MyComponent>Hello</MyComponent>);
