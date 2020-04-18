import React from 'react';
import moment from 'moment';

import { cleanup, fireEvent, waitForDomChange } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import DateInput from './DateInput';
import { formatIsoString } from '../fields/DatePickerField';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

describe('DatePickerField#formatIsoString', () => {
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
  beforeEach(() => {
    cleanup();
  });

  it('should mount without throwing an error', () => {
    function tryRender() {
      renderWithContext(<DateInput />);
    }
    expect(tryRender).not.toThrow();
  });

  it('should show date picker on focus', () => {
    const { container } = renderWithContext(<DateInput />);
    triggerDateInput(container);
    expect(container.querySelectorAll('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should set value when clicked', () => {
    const { container } = renderWithContext(<DateInput />);
    triggerDateInput(container);
    expect(container.querySelectorAll('input[value]')).toHaveLength(1);
  });

  it('should close after clicking off', () => {
    const { container } = renderWithContext(<DateInput />);
    triggerDateInput(container);
    expect(container.querySelectorAll('.DayPicker-Caption')).toHaveLength(1);
    fireEvent.blur(container.querySelector('input'));
    expect(container.querySelectorAll('.DayPicker-Caption')).toHaveLength(0);
  });

  it('should close when clicking the customoverlay', () => {
    const { container } = renderWithContext(<DateInput />);
    triggerDateInput(container);
    expect(container.querySelectorAll('.DayPicker-Caption')).toHaveLength(1);
    fireEvent.click(container.querySelector('.DayPickerInput').children[1]); // custom overlay
    expect(container.querySelectorAll('.DayPicker-Caption')).toHaveLength(0);
  });

  it('should close after focusing inside the picker then clicking outside', () => {
    const wrapper = renderWithContext(<DateInput />);
    triggerDateInput(wrapper.container);
    expect(wrapper.container.querySelectorAll('.DayPicker-Caption')).toHaveLength(1);
    fireEvent.click(wrapper.container.querySelector('.DayPicker-NavButton--prev')); // click prev button
    fireEvent.click(wrapper.container.querySelector('.DayPickerInput').children[1]); // click outside
    expect(wrapper.container.querySelectorAll('.DayPicker-Caption')).toHaveLength(0);
  });

  it('should invoke callback on change', () => {
    const onDateInputChange = jest.fn();

    const { container } = renderWithContext(<DateInput onChange={onDateInputChange} />);
    triggerDateInput(container);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: '12/12/2012' } });

    expect(onDateInputChange).toBeCalled();
    expect(onDateInputChange.mock.calls[0][0]).toBeTruthy();
  });

  it('should keep focus on input after clicking date', async () => {
    const wrapper = renderWithContext(<DateInput />);
    triggerDateInput(wrapper.container);
    const input = wrapper.container.querySelector('input');

    const firstDay = wrapper.container.querySelector('.DayPicker-Day[role="gridcell"]');
    fireEvent.click(firstDay);
    await waitForDomChange(); // need to wait as handleClickOutside listens to the click event
    expect(wrapper.container.querySelectorAll('.DayPicker-Caption')).toHaveLength(0); // expect picker to close
    expect(document.activeElement).toBe(input); // verify that the input has focus
  });
});

function triggerDateInput(container: HTMLElement) {
  const input = container.querySelector('input');
  fireEvent.focus(input);
}
