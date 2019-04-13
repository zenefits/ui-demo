import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { getColor } from 'z-frontend-theme';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithTheme(<ProgressBar />);
    expect(wrapper.find('progress')).toHaveLength(1);
  });

  it('should support standard button attributes', () => {
    const rendered = renderWithTheme(<ProgressBar id="foo" value={50} max={100} />);
    expect(rendered.attr('id')).toBe('foo');
    expect(rendered.attr('value')).toBe('50');
    expect(rendered.attr('max')).toBe('100');
  });

  describe('should support util props', () => {
    it('width prop', () => {
      const rendered = mountWithTheme(<ProgressBar value={50} max={100} w={123} />);
      expect(rendered).toHaveStyleRule('width', '123px');
    });

    it('color prop', () => {
      const rendered = mountWithTheme(<ProgressBar value={50} max={100} color="secondary.a" />);
      expect(rendered).toHaveStyleRule('color', getColor('secondary.a'));
    });

    it('bg prop', () => {
      const rendered = mountWithTheme(<ProgressBar value={50} max={100} bg="grayscale.g" />);
      expect(rendered).toHaveStyleRule('background-color', getColor('grayscale.g'));
    });
  });

  it('should invoke callback onChange', () => {
    const onProgressChange = jest.fn();
    const wrapper = mountWithTheme(<ProgressBar onChange={onProgressChange} />);
    wrapper.simulate('change', 25);
    expect(onProgressChange).toBeCalled();
  });
});
