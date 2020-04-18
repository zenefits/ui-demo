import React, { FunctionComponent } from 'react';

import { Box } from 'zbase';

import { Form } from '../../../..';
import { storiesOf } from '../../../../.storybook/storyHelpers';
import SupportedCountryExample from './exampleSupportedCountry';
import UnsupportedCountryExample from './exampleUnsupportedCountry';
import ValidationExample from './exampleValidation';
import ValidationTriggeredExample from './exampleValidationTriggered';
import NoStateExample from './exampleNoState';
import AutocompleteExample from './exampleAutocomplete';
import FormAddressIntl, { FormAddressIntlProps } from './FormAddressIntl';
// import OptionalFieldsExample from './exampleOptionalFields';

storiesOf('forms|Form.AddressIntl', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic', () => <DefaultExample />)
  .add('disabled', () => <DefaultExample disabled />)
  .add('autocomplete', AutocompleteExample)
  .add('with value (CA)', SupportedCountryExample)
  .add('with value (BH)', UnsupportedCountryExample)
  .add('with validation', ValidationExample)
  .add('with validation (state optional)', NoStateExample)
  .add('with validation (open)', ValidationTriggeredExample); // for visual regression
// .add('with name, without line 2', OptionalFieldsExample)

const DefaultExample: FunctionComponent<Partial<FormAddressIntlProps>> = props => (
  <Form
    onSubmit={(values, actions) => {
      actions.setSubmitting(false);
      console.log(values);
    }}
    initialValues={{
      address: FormAddressIntl.getEmptyValue(),
    }}
  >
    <FormAddressIntl name="address" {...props} />
    <Form.Footer primaryText="Save" />
  </Form>
);
