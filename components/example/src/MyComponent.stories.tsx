import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MyComponent from './MyComponent';

storiesOf('MyComponent', module).add('example story', () => <MyComponent>Hello</MyComponent>);
