import React from 'react';

import { Box, Flex } from 'zbase';
import { Example } from 'z-frontend-storybook-config';

import { Form, FormRowGroupProps, FormTextInput } from '../../..';
import { storiesOf } from '../../../.storybook/storyHelpers';

storiesOf('forms|Form.RowGroup', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('states', () => (
    <>
      <Example label="default">
        <RowGroupExample />
      </Example>
      <Example label="with helpText">
        <RowGroupExample helpText="Full name is composed of first name and last name" />
      </Example>
      <Example label="with validation">
        <RowGroupExample showValidation fieldNames={['first', 'last']} />
      </Example>
    </>
  ));

const RowGroupExample = (props: Partial<FormRowGroupProps> & { showValidation?: boolean }) => (
  <Form
    onSubmit={() => {}}
    initialValues={{}}
    validationSchema={
      props.showValidation
        ? {
            first: Form.Yup.string()
              .label('First Name')
              .required(),
            last: Form.Yup.string()
              .label('Last Name')
              .required(),
          }
        : {}
    }
  >
    {formikProps => {
      const inputProps = {} as any;
      if (props.showValidation) {
        // trigger validation immediately for visual regression tests
        inputProps.autoFocus = true;
        inputProps.onFocus = () => formikProps.setFieldTouched('first');
      }

      return (
        <Form.RowGroup label="Full Name" {...props}>
          <Flex>
            <FormTextInput
              mr={2}
              name="first"
              placeholder="First Name"
              label="First Name"
              format="raw"
              {...inputProps}
            />
            <FormTextInput name="last" placeholder="Last Name" label="Last Name" format="raw" />
          </Flex>
        </Form.RowGroup>
      );
    }}
  </Form>
);
