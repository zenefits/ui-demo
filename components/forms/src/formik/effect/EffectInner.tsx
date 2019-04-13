import * as React from 'react';
import { FormikContext } from 'formik';

export type FormOnChange<Values> = (
  params: { updatedValues?: Values; previousValues?: Values; isValid?: boolean },
) => void;

type EffectInnerProps<Values = {}> = {
  onChange: FormOnChange<Values>;
  formikProps: FormikContext<Values>;
};

class EffectInner<Values = {}> extends React.Component<EffectInnerProps, {}> {
  componentDidUpdate(prevProps: EffectInnerProps<Values>) {
    if (this.props.formikProps.values !== prevProps.formikProps.values) {
      const handleChangeAsync = async () => {
        // Reading isValid doesn't work in this case because (as of Formik v1.3.x) the re-render that updates values
        // happens before validation is run.
        const validationErrors = await this.props.formikProps.validateForm(this.props.formikProps.values);

        this.props.onChange({
          updatedValues: this.props.formikProps.values,
          previousValues: prevProps.formikProps.values,
          isValid: Object.keys(validationErrors).length === 0,
        });
      };
      handleChangeAsync();
    }
  }

  // @ts-ignore
  render() {
    return null;
  }
}

export default EffectInner;
