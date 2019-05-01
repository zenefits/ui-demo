import React from 'react';
import { cleanup, waitForElement } from 'react-testing-library';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

import { Box, Label } from 'zbase';
import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import TimeInput, { getClosestTimeIndex, getTimes, parseTimeString } from './TimeInput';

describe('Time Input', () => {
  describe('Search unit tests', () => {
    it('should get list of time options', () => {
      const times = getTimes(30);
      expect(times.length).toBe(48);
    });

    it('should find closest time option to input string', () => {
      const testCasesInterval30 = [
        { input: '1', expected: { closestTimeIndex: 2, match: true, valid: true } },
        { input: '1:', expected: { closestTimeIndex: 2, match: true, valid: true } },
        { input: '1:1', expected: { closestTimeIndex: 2, match: false, valid: true } },
        { input: '1:3', expected: { closestTimeIndex: 3, match: true, valid: true } },
        { input: '11', expected: { closestTimeIndex: 22, match: true, valid: true } },
        { input: '11:', expected: { closestTimeIndex: 22, match: true, valid: true } },
        { input: '11:1', expected: { closestTimeIndex: 22, match: false, valid: true } },
        { input: '1:11', expected: { closestTimeIndex: 2, match: false, valid: true } },
        { input: '11:11', expected: { closestTimeIndex: 22, match: false, valid: true } },
        { input: '01:11', expected: { closestTimeIndex: 2, match: false, valid: true } },
        { input: '111', expected: { closestTimeIndex: 2, match: false, valid: true } },
        { input: '1111', expected: { closestTimeIndex: 22, match: false, valid: true } },
        { input: '0111', expected: { closestTimeIndex: 2, match: false, valid: true } },
        { input: '2:1', expected: { closestTimeIndex: 4, match: false, valid: true } },
        { input: '21', expected: { closestTimeIndex: 42, match: true, valid: true } },
        { input: '210', expected: { closestTimeIndex: 4, match: false, valid: true } },
      ];
      testCasesInterval30.forEach(testCase => {
        const inputTime = parseTimeString(testCase.input);
        expect(getClosestTimeIndex(inputTime, 30)).toEqual(testCase.expected);
      });
    });
  });

  describe('Search component tests', () => {
    const TimeInputWithLabel = () => (
      <Box>
        <Label htmlFor="time">time</Label>
        <TimeInput name="time" disableTethering />
      </Box>
    );
    afterEach(cleanup);

    it('should render a labelled input', () => {
      const wrapper = renderWithContext(<TimeInputWithLabel />);
      wrapper.getByLabelText('time');
    });

    it('should open dropdown when input is clicked', async () => {
      const wrapper = renderWithContext(<TimeInputWithLabel />);
      ReactTestUtils.Simulate.focus(wrapper.getByLabelText('time'));
      await waitForElement(() => wrapper.getByText('12:00 AM'));
    });

    describe('autocompletion', () => {
      const checkAutocompletedTime = async (time: string, autocompleted: string) => {
        const wrapper = renderWithContext(<TimeInputWithLabel />);
        const input = wrapper.getByLabelText('time') as any;
        input.value = time;
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
        await waitForElement(() => wrapper.getByText(autocompleted));
      };
      it('should autocomplete "2" correctly', () => checkAutocompletedTime('2', '2:00 AM'));
      it('should autocomplete "3:" correctly', () => checkAutocompletedTime('3:', '3:00 AM'));
      it('should autocomplete "4:3" correctly', () => checkAutocompletedTime('4:3', '4:30 AM'));
      it('should autocomplete "530" correctly', () => checkAutocompletedTime('530', '5:30 AM'));
      it('should autocomplete "630P" correctly', () => checkAutocompletedTime('630P', '6:30 PM'));
      it('should autocomplete "23" correctly', () => checkAutocompletedTime('23', '11:00 PM'));
      it('should autocomplete "237" correctly', () => checkAutocompletedTime('237', '2:37 AM'));
      it('should autocomplete "invalid" correctly', () => checkAutocompletedTime('invalid', 'invalid'));
    });
  });
});
