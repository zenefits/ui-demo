import React, { useEffect, useState, Component } from 'react';
import {
  useFormikContext,
  FieldArray as FormikFieldArray,
  Form as FormikForm,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';

import FormError from './error/FormError';
import FormSection from './section/FormSection';
import FormFieldWrapper from './FormFieldWrapper';
import FormFooter from './footer/FormFooter';
import FormDebug from './FormDebug';
import FormRowGroup from './row-group/FormRowGroup';
import FormEffect, { FormOnChange } from './effect/Effect';
import FormContext from './FormContext';
import getErrorMessage from './utils/getErrorMessage';
import PreventTransition from './preventTransition/PreventTransition';

export interface FormProps<TValues> {
  /** Initial values of the form, eg when editing an employee. */
  initialValues: TValues;
  /** Action to take when submitting the form. If you return a promise, the submit status of the form is handled for you.  */
  onSubmit: (values: TValues, actions: FormikHelpers<TValues>) => Promise<any> | void;
  /** Contents of the form, such as inputs. Optionally a function that takes render props. */
  children: ((props: FormikProps<TValues>) => React.ReactNode[]) | React.ReactNode;
  /** Each value can optionally have a schema that includes error messages. */
  validationSchema?: { [V in keyof TValues]?: Yup.MixedSchema }; // TODO: this does not error on extras not in TValues
  validate?: (values: TValues) => FormikErrors<TValues> | Promise<any>;
  /**
   * Control whether Formik should reset the form if the wrapped component props change (using deep equality).
   * @default false
   */
  enableReinitialize?: boolean;
  /**
   * Enabling this will prevent transitions when the form is dirty
   * @default false
   */
  preventTransition?: boolean;
  /**
   * Custom message which gets rendered on the <Prompt />
   */
  preventTransitionMessage?: string;
  /**
   * Display internal formik state for debugging purposes. Not to be used in production!
   * @default false
   */
  debug?: boolean;
  /**
   * Trigger a side effect based on a state change. Please do not attempt to "sync" form state in elsewhere.
   */
  onChange?: FormOnChange<TValues>;
  /**
   * Optimizes all form field so that they only re-render when their value changes. Changes to values not in this slice of formik state,
   * will not trigger a re-render. This also means updating other props like `containerProps` will not trigger a re-render.
   * Under the covers setting this flag will use a Formik `<FastField>` component. Please read the FastField docs: https://jaredpalmer.com/formik/docs/api/fastfield before using.
   * This flag can be overridden at the field level.
   */
  limitRerender?: boolean;
}

const FormikValidate: React.FC<{}> = ({ children }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { values, validateForm } = useFormikContext();
  useEffect(() => {
    // Only run validation on updates not in initial mount
    if (!isInitialRender) {
      validateForm();
    }
    setIsInitialRender(false);
  }, [values]);
  return <>{children}</>;
};

class Form<TValues> extends Component<FormProps<TValues>> {
  // NOTE: this list must be kept in sync with formik/index.ts for docs
  // Form layout components
  static Footer = FormFooter;
  static Error = FormError;
  static Section = FormSection;
  static RowGroup = FormRowGroup;
  static Row = FormFieldWrapper;

  // Other library exports
  static Yup = Yup;

  render() {
    const {
      initialValues,
      onSubmit,
      validationSchema,
      validate,
      children,
      enableReinitialize,
      debug,
      onChange,
      preventTransition,
      preventTransitionMessage,
      limitRerender,
      ...rest
    } = this.props;
    const schema = validationSchema ? Yup.object().shape(validationSchema) : undefined;

    function handleSubmit(values: TValues, actions: FormikHelpers<TValues>) {
      const result: any = onSubmit(values, actions);
      if (result instanceof Promise) {
        const endSubmit = () => {
          actions.setSubmitting(false);
        };
        result.then(endSubmit).catch(errorObj => {
          // Formik provides setFieldError() to implicitly set the error
          // which we can consume in the renderProps as errors['onSubmitError']
          // (FormFooter does this by default)
          const error = getErrorMessage(errorObj);
          actions.setFieldError('onSubmitError', error);
          endSubmit();
        }); // Promise.finally is not universally supported yet
      }
    }

    return (
      <FormContext.Provider value={{ limitRerender }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
          validate={validate}
          enableReinitialize={enableReinitialize}
        >
          {(props: FormikProps<TValues>) => {
            return (
              // Temporary workaround to this bug https://github.com/jaredpalmer/formik/issues/2120
              // @ts-ignore
              <FormikForm
                noValidate // disable browser validation (which is not accessible nor theme-able)
                {...rest}
              >
                {onChange && <FormEffect onChange={onChange} />}
                {preventTransition && (
                  <PreventTransition dirty={props.dirty} preventTransitionMessage={preventTransitionMessage} />
                )}
                {debug && <FormDebug />}
                <FormikValidate>
                  {typeof children === 'function'
                    ? (children as (props: FormikProps<TValues>) => React.ReactNode[])(props)
                    : children}
                </FormikValidate>
              </FormikForm>
            );
          }}
        </Formik>
      </FormContext.Provider>
    );
  }
}

export { TimeInputValue } from './time-input/FormTimeInput';
export { TimeRangeValue } from './time-range/FormTimeRange';
export { DateRangeValue } from './date-range/FormDateRange';
export { MentionOption } from '../mention/MentionSelect';
export { AddressValue } from './address/addressUtils';
export { SignatureValue } from '../signature/Signature';
export { FormCheckboxProps } from './checkbox/FormCheckbox';
export { FormFieldFormat } from './FormFieldWrapper';
export { Form };
export { FormikFieldArray };
