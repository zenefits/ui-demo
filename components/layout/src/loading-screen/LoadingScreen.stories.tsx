import React from 'react';

import { storiesOf } from '../../.storybook/storyHelpers';

import LoadingScreen from './LoadingScreen';

storiesOf('layout|LoadingScreen', module).add('default', () => <LoadingScreen />);
