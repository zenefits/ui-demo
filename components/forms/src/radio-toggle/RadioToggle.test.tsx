import React from 'react';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import RadioToggle from './RadioToggle';

describe('RadioToggle', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountEnzymeWithTheme(<RadioToggle onLabel="On" offLabel="Off" />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render 2 radio inputs', () => {
    const rendered = renderEnzymeWithTheme(<RadioToggle onLabel="On" offLabel="Off" />);
    expect(rendered.find('input')).toHaveLength(2);
    expect(rendered.find('input').attr().type).toBe('radio');
  });

  it('should include labels', () => {
    const rendered = renderEnzymeWithTheme(<RadioToggle onLabel="On" offLabel="Off" />);
    expect(rendered.text().trim()).toBe('OnOff');
  });
});
