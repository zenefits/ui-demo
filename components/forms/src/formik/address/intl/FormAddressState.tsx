import React, { Component } from 'react';

import FormSelectDeprecated from '../../select/FormSelectDeprecated';
import FormTextInput from '../../text-input/FormTextInput';
import { COUNTRIES_WITH_NO_STATE, STATE_LABELS, SUPPORTED_STATES } from '../states';

type FormAddressStateProps = {
  /** The name of the control, which is submitted with the control's value as part of the form data. */
  name: string;

  /** Country code used to determine which field label and options to provide. */
  country: string;
};

const fallbackLabel = 'State/Province'; // most countries use one of these labels - do not assume "State"

class FormAddressState extends Component<FormAddressStateProps> {
  render() {
    const { country, ...rest } = this.props;
    const stateLabel = STATE_LABELS[country] || fallbackLabel;

    // we could hide the input entirely, but popular sites like Amazon leave it visible but optional
    const optional = COUNTRIES_WITH_NO_STATE.includes(country);

    const availableStates = SUPPORTED_STATES[country];
    if (!availableStates) {
      return <FormTextInput label={stateLabel} optional={optional} {...rest} />;
    }

    return (
      // use FormSimpleSelect (once available)
      <FormSelectDeprecated
        label={stateLabel}
        optional={optional}
        options={availableStates}
        openOnFocus
        clearable={false}
        {...rest}
      />
    );
  }
}

export default FormAddressState;
