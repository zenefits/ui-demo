import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';
import FormMentionTextarea from './FormMentionTextarea';

const optionSet1 = [
  {
    id: '234',
    menuLabel: `Meghan Markle — marklesparkle@zenefits.com`,
    tagLabel: 'Meghan',
  },
];

const optionSet2 = [
  {
    id: '234',
    menuLabel: `Meghan, Duchess of Sussex -- meghan@gov.uk`,
    tagLabel: 'Duchess of Sussex',
  },
];

type LoadingExampleState = {
  optionSetId: 0 | 1;
};

class LoadingExample extends React.Component<{}, LoadingExampleState> {
  state: LoadingExampleState = {
    optionSetId: 0,
  };

  render() {
    const initialValues = { comment: 'Hey [@234], can you take a look at this?' };
    return (
      <div>
        <Form onSubmit={() => {}} initialValues={initialValues}>
          <FormMentionTextarea name="comment" options={this.state.optionSetId === 0 ? optionSet1 : optionSet2} mt={0} />
        </Form>
        <button
          onClick={() => {
            this.setState({ optionSetId: 1 });
          }}
        >
          Crown Meghan
        </button>
      </div>
    );
  }
}

describe('FormMentionTextArea', () => {
  it('will rerender text and mentions when new options are passed', () => {
    const { getByText } = renderWithContext(<LoadingExample />);
    getByText('@Meghan');
    fireEvent.click(getByText('Crown Meghan'));
    getByText('@Duchess of Sussex');
  });
});
