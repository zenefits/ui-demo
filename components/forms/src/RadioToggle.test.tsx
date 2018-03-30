import React from 'react';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import RadioToggle from './RadioToggle';

describe('RadioToggle', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<RadioToggle onLabel="On" offLabel="Off" />).find('RadioToggle');
    expect(wrapper).toHaveLength(1);
  });

  it('should render 2 radio inputs', () => {
    const rendered = renderWithTheme(<RadioToggle onLabel="On" offLabel="Off" />);
    expect(rendered.find('input')).toHaveLength(2);
    expect(rendered.find('input').attr().type).toBe('radio');
  });

  it('should include labels', () => {
    const rendered = renderWithTheme(<RadioToggle onLabel="On" offLabel="Off" />);
    expect(rendered.text().trim()).toBe('OnOff');
  });
});
