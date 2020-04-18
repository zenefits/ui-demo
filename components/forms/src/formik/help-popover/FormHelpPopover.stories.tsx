import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import FormHelpPopover from './FormHelpPopover';

const helpText = 'Your Social Security Number is a nine digit number issued by the US government.';

storiesOf('forms|FormHelpPopover', module)
  .addDecorator(paddedBox)
  .add('default', () => <FormHelpPopover title="SSN">{helpText}</FormHelpPopover>)
  .add('visible (for testing)', () => (
    <FormHelpPopover title="SSN" popoverProps={{ showPopover: true }}>
      {helpText}
    </FormHelpPopover>
  ));
