import React, { Component } from 'react';

import FormSelectDeprecated from '../../select/FormSelectDeprecated';
import { ALL_COUNTRIES } from '../countries';

type FormAddressCountryProps = {
  /** The name of the control, which is submitted with the control's value as part of the form data. */
  name: string;
  /** Override the default country label */
  label?: string;
};

class FormAddressCountry extends Component<FormAddressCountryProps> {
  render() {
    return (
      // NOTE-DZH: not using FormSelect until its performance issues have been resolved (lots of countries)
      <FormSelectDeprecated label="Country" options={ALL_COUNTRIES} openOnFocus clearable={false} {...this.props} />
    );
  }
}

export default FormAddressCountry;
