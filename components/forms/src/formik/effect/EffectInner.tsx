import * as React from 'react';
import { FormikContextType } from 'formik';

export type FormOnChange<Values> = (params: {
  updatedValues?: Values;
  previousValues?: Values;
  isValid?: boolean;
}) => void;

type EffectInnerProps<Values = {}> = {
  onChange: FormOnChange<Values>;
  formikProps: FormikContextType<Values>;
};

class EffectInner<Values = {}> extends React.Component<EffectInnerProps, {}> {
  componentDidUpdate(prevProps: EffectInnerProps<Values>) {
    if (this.props.formikProps.values !== prevProps.formikProps.values) {
      const handleChangeAsync = async () => {
        // Simplifying reading `formikProps.isValid` doesn't work in this case because (as of Formik v1.5.1)
        // the re-render that updates values happens before validation is run. So we call `validateForm` manually.
        // `isValidating` is also unreliable at this point
        const validationErrors = await this.props.formikProps.validateForm(this.props.formikProps.values);

        this.props.onChange({
          updatedValues: this.props.formikProps.values,
          previousValues: prevProps.formikProps.values,
          isValid: Object.keys(validationErrors).length === 0,
        });
      };
      // setTimeout to avoid validateForm being cancelled by Formik; see https://github.com/jaredpalmer/formik/issues/1218
      setTimeout(() => handleChangeAsync());
    }
  }

  // @ts-ignore
  render() {
    return null;
  }
}

export default EffectInner;
