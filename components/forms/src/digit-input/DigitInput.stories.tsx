import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';

import DigitInput from './DigitInput';

storiesOf('forms|DigitInput', module)
  .addDecorator(paddedBox)
  .add('default', () => <DigitInput />);
