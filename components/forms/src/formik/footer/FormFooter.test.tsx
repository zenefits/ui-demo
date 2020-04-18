import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';

class FormWrapper extends React.Component<{ showError: boolean }> {
  static defaultProps = {
    showError: false,
  };

  render() {
    return (
      <Form initialValues={{}} onSubmit={() => {}}>
        {({ errors }) => {
          if (this.props.showError) {
            (errors as any).onSubmitError = 'There was an error while talking to the server.';
          }
          return this.props.children;
        }}
      </Form>
    );
  }
}

describe('Form.Footer', () => {
  it('includes clickable buttons', () => {
    const primaryLabel = 'Finish';
    const primaryOnClick = jest.fn();

    const cancelLabel = 'Back';
    const cancelOnClick = jest.fn();

    const tertiaryLabel = 'Contact';
    const tertiaryOnClick = jest.fn();

    const { getAllByRole, getByText } = renderWithContext(
      <FormWrapper>
        <Form.Footer
          primaryText={primaryLabel}
          primaryOnClick={primaryOnClick}
          cancelText={cancelLabel}
          cancelOnClick={cancelOnClick}
          tertiaryShown
          tertiaryText={tertiaryLabel}
          tertiaryOnClick={tertiaryOnClick}
        />
      </FormWrapper>,
    );
    expect(getAllByRole('button')).toHaveLength(3);

    fireEvent.click(getByText(primaryLabel));
    expect(primaryOnClick).toHaveBeenCalled();

    fireEvent.click(getByText(cancelLabel));
    expect(cancelOnClick).toHaveBeenCalled();

    fireEvent.click(getByText(tertiaryLabel));
    expect(tertiaryOnClick).toHaveBeenCalled();
  });

  it('reads form state to set in progress and error', async () => {
    const { getByText } = renderWithContext(
      <Form
        initialValues={{}}
        onSubmit={() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('simulated error'));
            }, 200);
          });
        }}
      >
        <Form.Footer primaryText="Save" />
      </Form>,
    );

    fireEvent.click(getByText('Save'));
    getByText('Loading'); // in progress
    await waitForElement(() => getByText('There was an error while talking to the server.'));
  });
});
