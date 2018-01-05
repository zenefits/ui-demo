import React from 'react';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import DatePicker from './DatePicker';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

describe('DatePicker', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<DatePicker />).find('DatePicker')).toHaveLength(1);
  });

  it('should support initial value', () => {
    const newYearsEve = new Date(2017, 12 - 1, 31);
    const wrapper = mountWithTheme(<DatePicker date={newYearsEve} />);
    expect(wrapper.find('input[value]')).toHaveLength(1);
  });

  it('should display formatted value', () => {
    const newYearsEve = new Date(2017, 12 - 1, 31);
    const wrapper = mountWithTheme(<DatePicker date={newYearsEve} />);
    const inputValue = wrapper
      .find('input')
      .first()
      .prop('value');
    expect(inputValue).toBe('12/31/2017');
  });

  it('should show date picker on focus', () => {
    const wrapper = mountWithTheme(<DatePicker />);
    triggerDatePicker(wrapper);
    expect(wrapper.find('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should set value when clicked', () => {
    const wrapper = mountWithTheme(<DatePicker />);
    triggerDatePicker(wrapper);
    clickDatePicker(wrapper);
    expect(wrapper.find('input[value]')).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onDatePickerChange = jest.fn();

    const wrapper = mountWithTheme(<DatePicker onChange={onDatePickerChange} />);
    triggerDatePicker(wrapper);
    wrapper.find('input').simulate('change', { target: { value: '12/12/2012' } });

    expect(onDatePickerChange).toBeCalled();
    expect(onDatePickerChange.mock.calls[0][0]).toBeTruthy();
  });
});

function clickDatePicker(wrapper) {
  wrapper
    .find('.DayPicker-Day')
    .first()
    .simulate('click');
}

function triggerDatePicker(wrapper) {
  wrapper.find('input').simulate('focus');
}
