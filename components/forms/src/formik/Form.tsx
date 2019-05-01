import React, { Component } from 'react';
import { FieldArray as FormikFieldArray, Form as FormikForm, Formik, FormikActions, FormikProps } from 'formik';

import * as Yup from 'yup';

import FormDateInput from './date-input/FormDateInput';
import FormTextInput from './text-input/FormTextInput';
import FormMentionTextarea from './mention-text-area/FormMentionTextarea';
import FormCheckbox from './checkbox/FormCheckbox';
import FormCheckboxGroupDeprecated from './checkbox/FormCheckboxGroupDeprecated';
import FormCheckboxGroup from './checkbox/FormCheckboxGroup';
import FormRadio from './radio/FormRadio';
import FormRadioGroup from './radio/FormRadioGroup';
import FormSelect from './select/FormSelect';
import FormMultiSelect from './select/FormMultiSelect';
import FormSelectDeprecated from './select/FormSelectDeprecated';
import FormSimpleSelect from './select/FormSimpleSelect';
import FormError from './error/FormError';
import FormTimeInput from './time-input/FormTimeInput';
import FormTimeRange from './time-range/FormTimeRange';
import FormTextarea from './text-area/FormTextarea';
import FormGroupSelect from './group-select/FormGroupSelect';
import FormWeekPicker from './week-picker/FormWeekPicker';
import FormMaskedInput from './masked-input/FormMaskedInput';
import FormNumberInput from './number-input/FormNumberInput';
import FormMoneyInput from './money-input/FormMoneyInput';
import FormPercentageInput from './percentage-input/FormPercentageInput';
import FormCustomTileInput from './custom-tile-input/FormCustomTileInput';
import FormCustomTileInputGroup from './custom-tile-input/FormCustomTileInputGroup';
import FormOpenListSelect from './open-list-select/FormOpenListSelect';
import FormSearchSelect from './search-select/FormSearchSelect';
import FormSignature from './signature/FormSignature';
import FormDateRange from './date-range/FormDateRange';
import FormAddressUS from './address/FormAddressUS';
import FormAddressIntl from './address/intl/FormAddressIntl';
import FormSection from './section/FormSection';
import FormFieldWrapper from './FormFieldWrapper';
import FormDaysOfWeekSelect from './days-of-week-select/FormDaysOfWeekSelect';
import FormCircleButtonSelect from './circle-button-select/FormCircleButtonSelect';
import { CircleButton } from '../circle-button-array/CircleButtonArray';
import FormFileUploader from './file-uploader/FormFileUploader';
import { GenericSelectOptionInterface, NewOptionInterface, SelectGroupInterface } from '../select/SelectOptions';
import FormFooter from './footer/FormFooter';
import FormTextareaTypeahead from './textarea-typeahead/FormTextareaTypeahead';
import FormDebug from './FormDebug';
import FormEffect, { FormOnChange } from './effect/Effect';

interface FormProps<TValues> {
  /** Initial values of the form, eg when editing an employee. */
  initialValues: TValues;
  /** Action to take when submitting the form. If you return a promise, the submit status of the form is handled for you.  */
  onSubmit: (values: TValues, actions: FormikActions<TValues>) => Promise<any> | void;
  /** Contents of the form, such as inputs. Optionally a function that takes render props. */
  children: ((props: FormikProps<TValues>) => React.ReactNode[]) | React.ReactNode;
  /** Each value can optionally have a schema that includes error messages. */
  validationSchema?: { [V in keyof TValues]?: Yup.MixedSchema }; // TODO: this does not error on extras not in TValues
  /**
   * Control whether Formik should reset the form if the wrapped component props change (using deep equality).
   * @default false
   */
  enableReinitialize?: boolean;
  /**
   * Display internal formik state for debugging purposes. Not to be used in production!
   * @default false
   */
  debug?: boolean;
  /**
   * Trigger a side effect based on a state change. Please do not attempt to "sync" form state in elsewhere.
   */
  onChange?: FormOnChange<TValues>;
}

class Form<TValues> extends Component<FormProps<TValues>> {
  // NOTE: this list must be kept in sync with formik/index.ts for docs
  // Basic form fields
  static Checkbox = FormCheckbox;
  static CheckboxGroupDeprecated = FormCheckboxGroupDeprecated;
  static CheckboxGroup = FormCheckboxGroup;
  static Error = FormError;
  static Radio = FormRadio;
  static RadioGroup = FormRadioGroup;
  static Select = FormSelect;
  static MultiSelect = FormMultiSelect;
  static SelectDeprecated = FormSelectDeprecated;
  static SimpleSelect = FormSimpleSelect;
  static Textarea = FormTextarea;
  static TextInput = FormTextInput;

  // Derived form fields
  static MentionTextarea = FormMentionTextarea;
  static TimeInput = FormTimeInput;
  static TimeRange = FormTimeRange;
  static DateRange = FormDateRange;
  static DateInput = FormDateInput;
  static GroupSelect = FormGroupSelect;
  static WeekPicker = FormWeekPicker;
  static MaskedInput = FormMaskedInput;
  static NumberInput = FormNumberInput;
  static MoneyInput = FormMoneyInput;
  static PercentageInput = FormPercentageInput;
  static CustomTileInput = FormCustomTileInput;
  static CustomTileInputGroup = FormCustomTileInputGroup;
  static OpenListSelect = FormOpenListSelect;
  static SearchSelect = FormSearchSelect;
  static SelectOption = GenericSelectOptionInterface;
  static SelectGroup = SelectGroupInterface;
  static NewOption = NewOptionInterface;
  static Signature = FormSignature;
  static AddressUS = FormAddressUS;
  static AddressIntl = FormAddressIntl;
  static Section = FormSection;
  static Row = FormFieldWrapper;
  static CircleButtonSelect = FormCircleButtonSelect;
  static CircleButton = CircleButton;
  static DaysOfWeekSelect = FormDaysOfWeekSelect;
  static FileUploader = FormFileUploader;
  static Footer = FormFooter;
  static TextareaTypeahead = FormTextareaTypeahead;

  // Formik exports
  static FieldArray = FormikFieldArray;

  // Other library exports
  static Yup = Yup;

  render() {
    const {
      initialValues,
      onSubmit,
      validationSchema,
      children,
      enableReinitialize,
      debug,
      onChange,
      ...rest
    } = this.props;
    const schema = validationSchema ? Yup.object().shape(validationSchema) : undefined;

    function handleSubmit(values: TValues, actions: FormikActions<TValues>) {
      const result: any = onSubmit(values, actions);
      if (result instanceof Promise) {
        const endSubmit = () => {
          actions.setSubmitting(false);
        };
        result.then(endSubmit).catch(endSubmit); // Promise.finally is not universally supported yet
        // later: add default handling for errors as well
        // currently, formik has no notion of global form errors https://github.com/jaredpalmer/formik/issues/711
      }
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize={enableReinitialize}
        render={(props: FormikProps<TValues>) => {
          return (
            <FormikForm
              noValidate // disable browser validation (which is not accessible nor theme-able)
              {...rest}
            >
              {onChange && <FormEffect onChange={onChange} />}
              {debug && <FormDebug />}
              {typeof children === 'function'
                ? (children as ((props: FormikProps<TValues>) => React.ReactNode[]))(props)
                : children}
            </FormikForm>
          );
        }}
      />
    );
  }
}

export { TimeInputValue } from './time-input/FormTimeInput';
export { TimeRangeValue } from './time-range/FormTimeRange';
export { DateRangeValue } from './date-range/FormDateRange';
export { MentionOption } from '../mention/MentionSelect';
export { AddressValue } from './address/addressUtils';
export { SignatureValue } from './signature/FormSignature';
export { FormCheckboxProps } from './checkbox/FormCheckbox';
export { FormFieldFormat } from './FormFieldWrapper';
export { Form };
