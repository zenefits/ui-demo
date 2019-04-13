import React from 'react';
import 'jest-styled-components';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Box, TextBlock } from 'zbase';
import { Tooltip } from 'z-frontend-overlays';

import AvatarTooltip from './AvatarTooltip';

describe('AvatarTooltip', () => {
  it('Defaults a tooltip with first/last name', () => {
    const wrapper = mountWithTheme(
      <AvatarTooltip firstName="Papa" lastName="John" tooltipProps={{ showPopover: true }}>
        <Box />
      </AvatarTooltip>,
    );

    const textBlocks = wrapper.find(TextBlock);

    expect(textBlocks.at(0).text()).toBe('Papa John');
  });

  it('No tooltip added to avatar if falsy value provided', () => {
    const wrapper = mountWithTheme(
      <AvatarTooltip
        firstName="Papa"
        lastName="John"
        badge="contingent"
        tooltipBody=""
        tooltipProps={{ showPopover: true }}
      >
        <Box />
      </AvatarTooltip>,
    );
    expect(wrapper.find(Tooltip)).toHaveLength(0);
  });

  it('Adds email is applicable', () => {
    const wrapper = mountWithTheme(
      <AvatarTooltip firstName="Papa" lastName="John" email="pjohn@zenefits.com" tooltipProps={{ showPopover: true }}>
        <Box />
      </AvatarTooltip>,
    );

    const textBlocks = wrapper.find(TextBlock);
    expect(textBlocks.at(0).text()).toBe('Papa John');
    expect(textBlocks.at(1).text()).toBe('pjohn@zenefits.com');
  });

  it('Adds Contingent worker label', () => {
    const wrapper = mountWithTheme(
      <AvatarTooltip
        tooltipProps={{ showPopover: true }}
        firstName="Papa"
        lastName="John"
        badge="contingent"
        workerType="Temp Worker"
        email="pjohn@zenefits.com"
      >
        <Box />
      </AvatarTooltip>,
    );

    const textBlocks = wrapper.find(TextBlock);
    expect(textBlocks.at(0).text()).toBe('Papa John');
    expect(textBlocks.at(1).text()).toBe('Contingent Worker - Temp Worker');
    expect(textBlocks.at(2).text()).toBe('pjohn@zenefits.com');
  });
});
