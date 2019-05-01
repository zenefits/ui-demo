import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import WeekPickerDropdown from './WeekPickerDropdown';
import { clickADay, clickButton } from '../testUtils';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

window.cancelAnimationFrame = () => {};

const dateString = '2018-07-17T03:24:00';
const date = new Date(dateString);

describe('WeekPickerDropdown', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<WeekPickerDropdown />)).toHaveLength(1);
  });

  it('should show caption', () => {
    const wrapper = mountWithTheme(<WeekPickerDropdown />);

    clickButton(wrapper);

    expect(wrapper.find('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should invoke callback on week select', () => {
    const weekSelectHandler = jest.fn();

    const wrapper = mountWithTheme(<WeekPickerDropdown selectedWeek={date} onWeekSelect={weekSelectHandler} />);

    clickButton(wrapper);

    // WeekPicker needs the mouseenter event to calculate the week range.
    wrapper
      .find('.DayPicker-Day')
      .first()
      .simulate('mouseenter');

    clickADay(wrapper);

    expect(weekSelectHandler).toBeCalled();
    expect(weekSelectHandler.mock.calls[0][0]).toBeTruthy();
  });
});
