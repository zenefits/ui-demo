import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormSignature from './FormSignature';

// see also Signature.test.tsx

function drawOnCanvas(canvas: HTMLCanvasElement, startCoords: [number, number], endCoords: [number, number]) {
  const [startX, startY] = startCoords;
  const [endX, endY] = endCoords;
  fireEvent.mouseDown(canvas, {
    which: 1, // mouse button 1
    clientX: startX,
    clientY: startY,
  });
  fireEvent.mouseMove(canvas, {
    which: 1,
    clientX: endX,
    clientY: endY,
  });
  fireEvent.mouseUp(canvas, {
    which: 1,
    clientX: endX,
    clientY: endY,
  });
}

describe('FormSignature', () => {
  afterEach(cleanup);

  it('updates form state', async () => {
    const initialValue = FormSignature.getEmptyValue();
    const onSubmit = jest.fn(() => Promise.resolve());

    const fieldLabel = 'Your Signature';
    const { container, getByLabelText, getByText, getByRole, queryByRole } = renderWithContext(
      <Form
        onSubmit={onSubmit}
        validationSchema={{
          signature: FormSignature.getValidationSchema('Signature'),
        }}
        initialValues={{ signature: initialValue }}
      >
        {formikProps => (
          <>
            <FormSignature name="signature" label="Your Signature" />
            <Form.Footer primaryText="Save" cancelText="Reset" cancelOnClick={formikProps.handleReset} />
          </>
        )}
      </Form>,
    );

    // label shows
    getByLabelText(fieldLabel);

    // required validation shows on submit
    const saveButton = getByText('Save');
    userEvent.click(saveButton);
    await wait(() => {
      expect(getByRole('alert')).toHaveTextContent('is a required field');
    });

    // by default, canvas in jsdom has size 0 so make it bigger
    const canvas = container.querySelector('canvas');
    canvas.width = 300;
    canvas.height = 300;

    // draw line on canvas that is not long enough
    drawOnCanvas(canvas, [0, 0], [50, 50]);
    userEvent.click(saveButton);
    await wait(() => {
      expect(getByRole('alert')).toHaveTextContent('too small');
    });

    // draw longer line - now passes "too small" validation
    drawOnCanvas(canvas, [0, 0], [200, 200]);
    userEvent.click(saveButton);
    await wait(() => {
      expect(queryByRole('alert')).toBeNull();
      expect(onSubmit).toBeCalledTimes(1);
      expect(onSubmit).toBeCalledWith(
        {
          signature: {
            dataUrl: expect.stringMatching(/^data:image\/png;base64,/),
            date: expect.any(Date),
            valid: true,
          },
        },
        expect.anything(),
      );
    });
  });
});
