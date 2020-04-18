import React from 'react';
import { range } from 'lodash';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form, FormCircleButton, FormCircleButtonSelect } from '../../..';
import { CircleButtonSelectProps } from './FormCircleButtonSelect';

type ExampleProps = Partial<CircleButtonSelectProps>;

const buttonCount = 5;
const formValues = {
  checkbox: { numbers: [false, false, true, false, false] },
  radio: { numbers: 3 },
};

const CircleButtonSelectExample = (props: ExampleProps) => {
  const { behavior, disabled } = props;
  return (
    <Form onSubmit={() => {}} initialValues={formValues[behavior]}>
      <FormCircleButtonSelect
        name="numbers"
        label="Numbers"
        behavior={behavior}
        numOptions={buttonCount}
        disabled={disabled}
      >
        {range(buttonCount).map(integer => (
          <FormCircleButton key={integer.toString()} aria-label={integer.toString()}>
            {integer}
          </FormCircleButton>
        ))}
      </FormCircleButtonSelect>
    </Form>
  );
};

describe('Form.CircleButtonSelect', () => {
  afterEach(cleanup);

  function assertCorrectIndicesSelected(indices: number[], elArray: HTMLElement[]) {
    elArray.forEach((el, index) => {
      expect(el.getAttribute('aria-checked')).toBe(indices.includes(index) ? 'true' : 'false');
    });
  }

  it('renders all subcomponents correctly', () => {
    const { getByLabelText, getAllByRole } = renderWithContext(<CircleButtonSelectExample behavior="checkbox" />);
    getByLabelText('Numbers');
    range(buttonCount).forEach(i => {
      getByLabelText(i.toString());
    });
    expect(getAllByRole('checkbox')).toHaveLength(buttonCount);
  });

  it('works as checkbox', () => {
    const { getByLabelText, getAllByRole } = renderWithContext(<CircleButtonSelectExample behavior="checkbox" />);
    const buttons = getAllByRole('checkbox');
    assertCorrectIndicesSelected([2], buttons); // initial value

    getByLabelText('3').click();
    assertCorrectIndicesSelected([2, 3], buttons);

    getByLabelText('2').click();
    assertCorrectIndicesSelected([3], buttons);
  });

  it('works as radio', () => {
    const { getByLabelText, getAllByRole } = renderWithContext(<CircleButtonSelectExample behavior="radio" />);
    const buttons = getAllByRole('radio');
    assertCorrectIndicesSelected([3], buttons); // initial value

    getByLabelText('2').click();
    assertCorrectIndicesSelected([2], buttons);

    getByLabelText('2').click();
    assertCorrectIndicesSelected([2], buttons);
  });

  it('can be disabled', () => {
    const { getByLabelText, getAllByRole } = renderWithContext(
      <CircleButtonSelectExample behavior="checkbox" disabled />,
    );
    const buttons = getAllByRole('checkbox');
    assertCorrectIndicesSelected([2], buttons);

    getByLabelText('3').click();
    assertCorrectIndicesSelected([2], buttons);
  });
});
