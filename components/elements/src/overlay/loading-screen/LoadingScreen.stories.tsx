import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import LoadingScreen from './LoadingScreen';

const loadingText = 'Setting up your data. This may take a few moments.';

storiesOf('elements|LoadingScreen', module)
  .addDecorator(paddedBox)
  .add('default', () => <LoadingScreen />)
  .add('loading text', () => <LoadingScreen loadingText={loadingText} />);
