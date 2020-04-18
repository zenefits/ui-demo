import React from 'react';
import { cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import FormTimeRange from './FormTimeRange';
import { Form } from '../Form';

const fieldLabel = 'Time Range';
const formFooterPrimaryText = 'Submit';
const startTime = '12:00 PM';
const endTime = '1:30 PM';

describe('FormTimeRange', () => {
  afterEach(cleanup);

  it('takes start and end time inputs and submits', async () => {
    const submitStub = jest.fn();
    const { getAllByText, getByText, getAllByLabelText } = renderWithContext(
      <Form
        onSubmit={submitStub}
        initialValues={{ timeRange: FormTimeRange.getEmptyValue() }}
        validationSchema={{
          timeRange: FormTimeRange.validationSchema,
        }}
      >
        <FormTimeRange name="timeRange" label={fieldLabel} />
        <Form.Footer primaryText={formFooterPrimaryText} />
      </Form>,
    );

    // Label shows
    expect(getAllByText(fieldLabel)).toHaveLength(3);
    // Enter inputs
    const labelledElements = getAllByLabelText('Time Range');

    userEvent.click(labelledElements.find(elem => elem.id === 'timeRange-start'));
    getByText(startTime).click();

    userEvent.click(labelledElements.find(elem => elem.id === 'timeRange-end'));
    getByText(endTime).click();

    // Submit form
    userEvent.click(getByText(formFooterPrimaryText));

    await wait(() => {
      expect(submitStub).toHaveBeenCalledTimes(1);
      expect(submitStub).toHaveBeenCalledWith(
        {
          timeRange: {
            startTime: {
              timeString: startTime,
              time: {
                hours: 12,
                minutes: 0,
              },
            },
            endTime: {
              timeString: endTime,
              time: {
                hours: 13,
                minutes: 30,
              },
            },
          },
        },
        expect.anything(),
      );
    });
  });
});
