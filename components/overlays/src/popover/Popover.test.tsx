import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import Popover from './Popover';

describe('Popover', () => {
  beforeEach(cleanup);

  it('should mount without throwing an error', () => {
    const { getByText } = renderWithContext(<Popover event="click" targetBody={<h1>I am the target Body</h1>} />);
    getByText('I am the target Body');
  });

  it('should render the Popover content', () => {
    const wrapper = renderWithContext(
      <Popover targetBody={<h1 className="target">Target</h1>} event="click">
        <h1>I am the Popover</h1>
      </Popover>,
    );

    fireEvent.click(wrapper.getByText('Target'));

    wrapper.getByText('I am the Popover');
  });
});
