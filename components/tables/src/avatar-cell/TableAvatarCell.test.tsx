import React from 'react';

import { Avatar } from 'z-frontend-composites';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import TableAvatarCell from './TableAvatarCell';

describe('AvatarCell', () => {
  it('should render text and avatar', () => {
    const wrapper = mountWithTheme(
      <TableAvatarCell avatarProps={{ photoUrl: 'img.png' }} firstName="Walter" lastName="White" />,
    );

    expect(wrapper.text()).toBe('Walter White');
    expect(wrapper.find(Avatar).props()).toMatchObject({ firstName: 'Walter', lastName: 'White', photoUrl: 'img.png' });
  });

  it('should include metadata', () => {
    const wrapper = mountWithTheme(
      <TableAvatarCell avatarProps={{ photoUrl: 'img.png' }} firstName="Walter" lastName="White" metadata="engineer" />,
    );

    expect(wrapper.text()).toBe('Walter Whiteengineer');
  });
});
