import React, { Component } from 'react';
import { Box } from 'zbase';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, reduxForm, InjectedFormProps } from 'redux-form';
import ConfirmationModal from './ConfirmationModal';
import { withDialog, WithDialogProps } from './DialogManager';
import { Button } from 'z-frontend-forms';

class SimpleModalContainer extends Component<WithDialogProps> {
  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      content: 'Please confirm that you have read this.',
      submitActionText: 'Confirm',
      onSubmit: action('Form submitted'),
    };

    return (
      <Box>
        <ConfirmationModal
          {...modalProps}
          isVisible={dialog.isVisible}
          onCancel={dialog.close}
          controlEl={dialog.controlEl}
        />
        <Button onClick={dialog.open}>Show modal</Button>
      </Box>
    );
  }
}

const SimpleModalWithDialog = withDialog<{}>()(SimpleModalContainer);

storiesOf('Confirmation Modal', module).add('basic', () => <SimpleModalWithDialog />);

class SubmitClaims extends Component<InjectedFormProps<any> & WithDialogProps, { showModal: boolean }> {
  submit = action('Claim confirmed - form submitted');

  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      content: 'Once you submit you will not be allowed to make any changes.',
      submitActionText: 'Submit',
      onSubmit: this.props.handleSubmit(this.submit),
    };

    return (
      <Box>
        <Form onSubmit={() => {}}>
          <ConfirmationModal
            {...modalProps}
            isVisible={dialog.isVisible}
            onCancel={dialog.close}
            controlEl={dialog.controlEl}
          />
          <Button onClick={dialog.open}>Show modal</Button>
        </Form>
      </Box>
    );
  }
}

const SubmitClaimsWithDialog = withDialog<{}>()(SubmitClaims);

const SubmitClaimsWithRedux = reduxForm<{}, {}>({ form: 'submitClaimsForm' })(SubmitClaimsWithDialog);
storiesOf('Confirmation Modal', module).add('in redux form', () => <SubmitClaimsWithRedux />);
