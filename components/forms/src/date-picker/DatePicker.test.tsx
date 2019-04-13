import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import DatePicker from './DatePicker';
import { clickADay } from '../testUtils';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

describe('DatePicker', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<DatePicker />)).toHaveLength(1);
  });

  it('should show caption', () => {
    const wrapper = mountWithTheme(<DatePicker />);
    expect(wrapper.find('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onDayClick = jest.fn();

    const wrapper = mountWithTheme(<DatePicker onDayClick={onDayClick} />);

    clickADay(wrapper);

    expect(onDayClick).toBeCalled();
    expect(onDayClick.mock.calls[0][0]).toBeTruthy();
  });
});
