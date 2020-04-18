import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Render } from '../..';
import ExampleRender from './exampleRender';

storiesOf('theme|Render', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => <div style={{ background: 'white', padding: 20 }}>{getStory()}</div>)
  .add('respects breakpoints', ExampleRender)
  .add('respects breakpoints (mobile)', ExampleRender, { viewport: 'iphone6', chromatic: { viewports: [320] } }) // mobile viewport width
  .add('hidden on desktop', () => {
    window.ZENEFITS_MOBILE_INTEGRATION = {};

    return (
      <>
        <div>should not see text below</div>
        <Render inEmbeddedNativeView>
          <span style={{ color: 'red' }}>should not see this text</span>
        </Render>
      </>
    );
  })
  .add('visible on native embedded', () => {
    window.ZENEFITS_MOBILE_INTEGRATION = { isEmbeddedNativeView: true };

    return (
      <>
        <div>should see text below</div>
        <Render inEmbeddedNativeView>
          <span style={{ color: 'red' }}>should see this text</span>
        </Render>
      </>
    );
  });
