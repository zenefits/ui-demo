import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import HideExample from './exampleHide';

storiesOf('theme|HideFor', module)
  .addDecorator((getStory: Function) => <div style={{ background: 'white', padding: 20 }}>{getStory()}</div>)
  .add('default', HideExample);
