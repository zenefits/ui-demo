import React, { Component } from 'react';
import { Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, reduxForm, InjectedFormProps } from 'redux-form';
import ConfirmationModal from './ConfirmationModal';
import Button from 'z-frontend-forms/src/Button';

class SimpleModalContainer extends Component<{}, { showModal: boolean }> {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  showModal = e => {
    this.setState({ showModal: true });
  };

  render() {
    const modalProps = {
      title: 'Submit claim',
      content: 'Please confirm that you have read this.',
      submitActionText: 'Confirm',
      onCancel: () => this.setState({ showModal: false }),
      onSubmit: action('Form submitted'),
    };

    return (
      <Box>
        <ConfirmationModal {...modalProps} isVisible={this.state.showModal} />
        <Button onClick={this.showModal} type="button">
          Show modal
        </Button>
      </Box>
    );
  }
}
storiesOf('Confirmation Modal', module).add('basic', () => <SimpleModalContainer />);

class SubmitClaims extends Component<InjectedFormProps<any>, { showModal: boolean }> {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  showModal = e => {
    this.setState({ showModal: true });
  };

  submit = action('Claim confirmed - form submitted');

  render() {
    const modalProps = {
      title: 'Submit claim',
      content: 'Once you submit you will not be allowed to make any changes.',
      submitActionText: 'Submit',
      onCancel: () => this.setState({ showModal: false }),
      onSubmit: this.props.handleSubmit(this.submit),
    };

    return (
      <Box>
        <Form>
          <ConfirmationModal {...modalProps} isVisible={this.state.showModal} />
          <Button onClick={this.showModal} type="button">
            Show modal
          </Button>
        </Form>
      </Box>
    );
  }
}

const SubmitClaimsWithRedux = reduxForm<{}, {}>({ form: 'submitClaimsForm' })(SubmitClaims);
storiesOf('Confirmation Modal', module).add('in redux form', () => <SubmitClaimsWithRedux />);
