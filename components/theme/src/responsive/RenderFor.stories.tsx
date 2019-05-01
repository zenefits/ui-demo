import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import RenderExample from './exampleRender';

storiesOf('theme|RenderFor', module)
  .addDecorator((getStory: Function) => <div style={{ background: 'white', padding: 20 }}>{getStory()}</div>)
  .add('default', RenderExample);
