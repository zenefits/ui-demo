import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { TextInline } from 'zbase';

import StatusTag from '../../src/status-tag/StatusTag';

describe('StatusTag', () => {
  it('includes text', () => {
    mount(<StatusTag mode="affirmation">Approved</StatusTag>);
    cy.findByText('Approved');
  });

  it('allows nested elements', () => {
    mount(
      <StatusTag mode="negation">
        <TextInline textKey="foo.bar" textDefault="Rejected" />
      </StatusTag>,
    );
    cy.findByText('Rejected');
  });
});
