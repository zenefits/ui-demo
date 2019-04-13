import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Tooltip } from 'z-frontend-overlays';
import { Icon } from 'zbase';

import TableHeaderCell from './TableHeaderCell';

describe('AvatarCell', () => {
  it('should render text ', () => {
    const wrapper = mountWithTheme(<TableHeaderCell>Heading</TableHeaderCell>);

    expect(wrapper.text()).toBe('Heading');
  });

  it('should include an icon when applicable', () => {
    const wrapper = mountWithTheme(
      <TableHeaderCell iconProps={{ iconName: 'account-circle' }}>Heading</TableHeaderCell>,
    );

    expect(wrapper.find(Icon).prop('iconName')).toBe('account-circle');
  });

  it('should include a tooltip when applicable', () => {
    const wrapper = mountWithTheme(<TableHeaderCell tooltipBody="Tooltip content">Heading</TableHeaderCell>);

    expect(wrapper.find(Icon).prop('iconName')).toBe('help-outline');
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });
});
