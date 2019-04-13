import React from 'react';
import moment from 'moment';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import WeekPicker from './WeekPicker';
import { getWeekRange } from './utils';
import { clickADay } from '../testUtils';

jest.mock('react-day-picker/lib/style.css', () => jest.fn());

describe('WeekPicker', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<WeekPicker />)).toHaveLength(1);
  });

  it('should show caption', () => {
    const wrapper = mountWithTheme(<WeekPicker />);
    expect(wrapper.find('.DayPicker-Caption')).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onDayClick = jest.fn();

    const wrapper = mountWithTheme(<WeekPicker onDayClick={onDayClick} />);

    clickADay(wrapper);

    expect(onDayClick).toBeCalled();
    expect(onDayClick.mock.calls[0][0]).toBeTruthy();
  });

  describe('getWeekRange function', () => {
    it('should return a date range', () => {
      const date = new Date(2018, 8 - 1, 21);

      const testCases = [
        {
          input: { firstDayOfWeek: 0 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 19))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 25))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 1 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 20))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 26))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 2 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 21))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 27))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 3 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 15))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 21))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 4 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 16))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 22))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 5 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 17))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 23))
              .endOf('day')
              .toDate(),
          },
        },
        {
          input: { firstDayOfWeek: 6 },
          expected: {
            from: moment(new Date(2018, 8 - 1, 18))
              .startOf('day')
              .toDate(),
            to: moment(new Date(2018, 8 - 1, 24))
              .endOf('day')
              .toDate(),
          },
        },
      ];

      testCases.forEach(testCase => {
        const input = Object.assign(testCase.input, { date });
        expect(getWeekRange(input)).toEqual(testCase.expected);
      });
    });
  });
});
