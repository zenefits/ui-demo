import React from 'react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import TrialAccountButton from './TrialAccountButton';

describe('TrialAccountButton', () => {
  it('displays Start Free Trial', () => {
    const switches = { free_limited_trial_company: true };
    const { getByText } = renderWithContext(
      <TrialAccountButton companyTypeIsDemo trialHasFreeLimitedCompany={false} switches={switches} />,
    );
    getByText('Start Free Trial');
  });
});
