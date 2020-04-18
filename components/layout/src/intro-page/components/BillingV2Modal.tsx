import React, { Component } from 'react';
import gql from 'graphql-tag';
import { MutationFunction } from 'react-apollo';

import { Form, FormikHelpers, FormMaskedInput, FormTextInput } from 'z-frontend-forms';
import { Box, TextBlock } from 'zbase';
import { ActionModal, DialogProps, ModalButton } from 'z-frontend-overlays';
import { Mutation } from 'z-frontend-network';

import { SubmitProductInterestMutation } from '../../gqlTypes';

type FormData = {
  fullName: string;
  phoneNumber: string;
};

type Props = {
  productName: string;
  openNotification: (message: string) => void;
} & DialogProps;

export default class BillingV2Modal extends Component<Props> {
  onSubmit = async (
    values: FormData,
    actions: FormikHelpers<FormData>,
    closeDialog: () => void,
    submitProductInterest: MutationFunction<
      SubmitProductInterestMutation.Mutation,
      SubmitProductInterestMutation.Variables
    >,
  ) => {
    const phoneNumber = values.phoneNumber.replace(/\D/g, '');
    await submitProductInterest({
      variables: { phoneNumber, fullName: values.fullName, productName: this.props.productName },
    }).then(() => {
      closeDialog();
      actions.setSubmitting(false);
      this.props.openNotification('Thanks, we’ll be in touch with you soon!');
    });
  };

  render() {
    const { productName, isVisible, controlEl, close } = this.props;
    return (
      <Mutation<SubmitProductInterestMutation.Mutation, SubmitProductInterestMutation.Variables>
        mutation={submitProductInterestMutation}
      >
        {submitProductInterestMutation => (
          <Form<FormData>
            initialValues={{
              fullName: '',
              phoneNumber: '',
            }}
            onSubmit={(values, actions) => this.onSubmit(values, actions, close, submitProductInterestMutation)}
            validationSchema={{
              fullName: Form.Yup.string()
                .nullable(false)
                .required('Please enter your full name'),
              phoneNumber: Form.Yup.string()
                .matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, 'Please enter a valid phone number')
                .nullable(false)
                .required('Phone is required.'),
            }}
          >
            {formProps => {
              const modalProps = {
                isVisible,
                controlEl,
                fullScreenMobile: true,
                title: `Interested in ${productName}?`,
                onCancel: close,
                buttons: [
                  {
                    text: 'Send',
                    inProgress: formProps.isSubmitting,
                    type: 'submit',
                    disabled: !formProps.isValid,
                  },
                ] as ModalButton[],
              };

              return (
                <ActionModal {...modalProps}>
                  <TextBlock fontStyle="paragraphs.m">
                    Let us know the best phone number to reach you and we’ll get back to you shortly to share options to
                    build out your Zenefits value!
                  </TextBlock>
                  <Box mt={4}>
                    <FormTextInput name="fullName" label="First and Last Name" required />
                    <FormMaskedInput
                      name="phoneNumber"
                      label="Phone Number"
                      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    />
                  </Box>
                </ActionModal>
              );
            }}
          </Form>
        )}
      </Mutation>
    );
  }
}

const submitProductInterestMutation = gql`
  mutation SubmitProductInterestMutation($fullName: String!, $phoneNumber: String!, $productName: String!) {
    submitProductInterest(fullName: $fullName, phoneNumber: $phoneNumber, productName: $productName) {
      success
    }
  }
`;
