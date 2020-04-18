import React from 'react';
// @ts-ignore
import { number } from '@storybook/addon-knobs';

import { storiesOf } from '../../../.storybook/storyHelpers';
import CircularProgress from './CircularProgress';

storiesOf('layout|CircularProgress', module).add(
  'basic',
  () => (
    <>
      <CircularProgress percent={number('Percent', 0.9)} text="5" />
      <CircularProgress percent={number('Percent', 0.9)} />
      <CircularProgress percent={0.75} />
      <CircularProgress percent={0.5} />
      <CircularProgress percent={0.25} />
      <CircularProgress percent={0.5} text="12" radius={32} />
    </>
  ),
  {
    chromatic: {
      diffThreshold: 0.2, // increase from default of 0.063 to avoid flakiness in this test
    },
  },
);
