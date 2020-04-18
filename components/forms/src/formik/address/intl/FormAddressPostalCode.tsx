import React, { Component } from 'react';

import FormTextInput from '../../text-input/FormTextInput';
import FormMaskedInput from '../../masked-input/FormMaskedInput';
import { postalCodes } from '../../masked-input/masks';

type FormAddressPostalCodeProps = {
  /** The name of the control, which is submitted with the control's value as part of the form data. */
  name: string;

  /** Country code used to determine which field label and format to use. */
  country: string;
};

const POSTAL_CODE_LABELS: { [key: string]: string } = {
  GB: 'Postcode',
  AU: 'Postcode',
  IN: 'PIN Code',
  US: 'ZIP Code',
  IE: 'Post Code/ZIP Code',
  BR: 'Post Code/ZIP Code',
  FR: 'Post Code',
  CA: 'Postal Code',
  TW: 'Postal Code',
  IS: 'Postal Code',
};

const fallbackLabel = 'Postal/ZIP Code';

class FormAddressPostalCode extends Component<FormAddressPostalCodeProps> {
  render() {
    const { country, ...rest } = this.props;
    const label = POSTAL_CODE_LABELS[country] ?? fallbackLabel;

    const mask = postalCodes[country];
    if (mask) {
      return <FormMaskedInput label={label} mask={mask} {...rest} />;
    }
    return <FormTextInput label={label} {...rest} />;
  }
}

export default FormAddressPostalCode;
