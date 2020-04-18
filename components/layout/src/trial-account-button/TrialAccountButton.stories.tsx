import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';

import TrialAccountButton from './TrialAccountButton';

storiesOf('layout|TrialAccountButton', module)
  .addDecorator(paddedBox)
  .add('default', () => {
    const switches = { free_limited_trial_company: true };
    return <TrialAccountButton companyTypeIsDemo trialHasFreeLimitedCompany={false} switches={switches} />;
  });
