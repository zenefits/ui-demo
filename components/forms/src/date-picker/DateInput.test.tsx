import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { ReactWrapper } from 'enzyme';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import DateInput from './DateInput';
import { formatIsoString } from '../fields/DatePickerField';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

const createPortal = ReactDOM.createPortal;
describe('DatePickerField#formatIsoString', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  it('handles date', () => {
    const januaryFirst = new Date(2018, 1 - 1, 1);
    expect(formatIsoString(januaryFirst)).toBe('2018-01-01');
  });
  it('strips time from date', () => {
    const hour = 5;
    const januaryFirst = new Date(2018, 1 - 1, 1, hour);
    expect(formatIsoString(januaryFirst)).toBe('2018-01-01');
  });
  it('handles moment', () => {
    const januaryFirst = moment([2018, 1 - 1, 1, 20]);
    expect(formatIsoString(januaryFirst)).toBe('2018-01-01');
  });
  it('handles string', () => {
    const januaryFirst = '2018-01-01';
    expect(formatIsoString(januaryFirst)).toBe('2018-01-01');
  });
  it('handles string (full ISO)', () => {
    const januaryFirst = '2018-01-01T20:35:24-08:00';
    expect(formatIsoString(januaryFirst)).toBe('2018-01-01');
  });
  it('handles string (en-US locale)', () => {
    expect(formatIsoString('01/01/2018')).toBe('2018-01-01');
  });
  it('returns null if invalid', () => {
    expect(formatIsoString('tomorrow')).toBeNull();
    expect(formatIsoString('January 1, 2018')).toBeNull();
    expect(formatIsoString(1203983290 as any)).toBeNull();
  });
  it('does not default to today', () => {
    expect(formatIsoString(undefined)).toBeFalsy();
  });
});

describe('DateInput', () => {
  beforeAll(() => {
    ReactDOM.createPortal = createPortal;
  });

  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<DateInput />)).toHaveLength(1);
  });

  it('should show date picker on focus', () => {
    const wrapper = mountWithTheme(<DateInput />);
    triggerDateInput(wrapper);
    expect(wrapper.find('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should set value when clicked', () => {
    const wrapper = mountWithTheme(<DateInput />);
    triggerDateInput(wrapper);
    clickDatePicker(wrapper);
    expect(wrapper.find('input[value]')).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onDateInputChange = jest.fn();

    const wrapper = mountWithTheme(<DateInput onChange={onDateInputChange} />);
    triggerDateInput(wrapper);
    wrapper.find('input').simulate('change', { target: { value: '12/12/2012' } });

    expect(onDateInputChange).toBeCalled();
    expect(onDateInputChange.mock.calls[0][0]).toBeTruthy();
  });
});

function clickDatePicker(wrapper: ReactWrapper) {
  wrapper
    .find('.DayPicker-Day')
    .first()
    .simulate('click');
}

function triggerDateInput(wrapper: ReactWrapper) {
  wrapper.find('input').simulate('focus');
}
