import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { TextBlock } from 'zbase';
import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { getColor } from 'z-frontend-theme';

import DisplayMetric from './DisplayMetric';

describe('DisplayMetric', () => {
  it('should mount with correct label and value', () => {
    const wrapper = mountEnzymeWithTheme(<DisplayMetric label="Label">100</DisplayMetric>);
    expect(wrapper.find(TextBlock)).toHaveLength(2);
    expect(
      wrapper
        .find(TextBlock)
        .at(0)
        .text(),
    ).toBe('100');
    expect(
      wrapper
        .find(TextBlock)
        .at(1)
        .text(),
    ).toBe('Label');
  });

  it('accepts element as child', () => {
    const wrapper = mountEnzymeWithTheme(
      <DisplayMetric label="Label" color="secondary.a">
        <TextBlock>123</TextBlock>
      </DisplayMetric>,
    );
    expect(
      wrapper
        .find(TextBlock)
        .at(1)
        .text(),
    ).toBe('123');
  });

  it('should set value color', () => {
    const wrapper = mountEnzymeWithTheme(
      <DisplayMetric label="Label" color="secondary.a">
        100
      </DisplayMetric>,
    );
    expect(wrapper.find(TextBlock)).toHaveLength(2);
    expect(wrapper.find(TextBlock).at(0)).toHaveStyleRule('color', getColor('secondary.a'));
  });
});
