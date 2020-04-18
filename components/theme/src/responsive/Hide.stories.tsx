import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Hide } from '../..';
import ExampleHide from './exampleHide';

storiesOf('theme|Hide', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => <div style={{ background: 'white', padding: 20 }}>{getStory()}</div>)
  .add('respects breakpoints', ExampleHide)
  .add('respects breakpoints (mobile)', ExampleHide, { viewport: 'iphone6', chromatic: { viewports: [320] } }) // mobile viewport width
  .add('visible on desktop', () => {
    window.ZENEFITS_MOBILE_INTEGRATION = {};

    return (
      <>
        <div>should see text below</div>
        <Hide inEmbeddedNativeView>
          <span style={{ color: 'red' }}>should see this text</span>
        </Hide>
      </>
    );
  })
  .add('hidden on native embedded', () => {
    window.ZENEFITS_MOBILE_INTEGRATION = { isEmbeddedNativeView: true };

    return (
      <>
        <div>should not see text below</div>
        <Hide inEmbeddedNativeView>
          <span style={{ color: 'red' }}>should not see this text</span>
        </Hide>
      </>
    );
  });
