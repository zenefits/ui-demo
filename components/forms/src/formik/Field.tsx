import React, { Component } from 'react';
import { getIn, Field as FormikField, FieldConfig, FieldProps, FormikProps } from 'formik';
import { isEqual } from 'lodash';

import FormContext from './FormContext';

type FormFieldRenderProps = FieldProps & { setFieldValueAndTouched: (fieldName: string, value: any) => void };

type FormFieldProps = {
  limitRerender?: boolean;
  limitRerenderWatched?: any;
  dependencies?: string[];
  children: (props: FormFieldRenderProps) => React.ReactNode;
} & FieldConfig;

type FieldRerenderBlockerProps = FieldProps & {
  dependencies?: string[];
  limitRerenderWatched: any;
  render: () => React.ReactNode;
};

class FieldRerenderBlocker extends React.Component<FieldRerenderBlockerProps> {
  hasWatchedFormikStateChanged = (
    nextProps: FieldRerenderBlockerProps,
    formikProperty: 'values' | 'errors' | 'touched',
  ) => {
    const watchedProps = [this.props.field.name].concat(this.props.dependencies || []);
    return watchedProps.some(
      propName => getIn(this.props.form[formikProperty], propName) !== getIn(nextProps.form[formikProperty], propName),
    );
  };

  shouldComponentUpdate(nextProps: FieldRerenderBlockerProps) {
    const haveValuesChanged = this.hasWatchedFormikStateChanged(nextProps, 'values');
    const haveErrorsChanged = this.hasWatchedFormikStateChanged(nextProps, 'errors');
    const hasTouchedChanged = this.hasWatchedFormikStateChanged(nextProps, 'touched');

    if (
      haveValuesChanged ||
      haveErrorsChanged ||
      hasTouchedChanged ||
      Object.keys(this.props).length !== Object.keys(nextProps).length ||
      this.props.form.isSubmitting !== nextProps.form.isSubmitting ||
      !isEqual(nextProps.limitRerenderWatched, this.props.limitRerenderWatched)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // Calling render in here to prevent field's render method from called in case where update is blocked
    return this.props.render();
  }
}

const setFieldValueAndTouched = (form: FormikProps<any>, fieldName: string, value: any) => {
  // In formik v2 we need to trigger validation on the setValue but not on setFieldTouched to avoid validating stale values https://github.com/jaredpalmer/formik/issues/2083#issuecomment-571259235
  form.setFieldValue(fieldName, value, true);
  form.setFieldTouched(fieldName, true, false);
};

export default class Field extends Component<FormFieldProps> {
  render() {
    return (
      <FormContext.Consumer>
        {({ limitRerender: formLimitRerender }) => {
          const { limitRerender: fieldLimitRerender, limitRerenderWatched, dependencies, ...fieldProps } = this.props;

          // Prefer field level prop over form level
          const limitRerender = typeof fieldLimitRerender !== 'undefined' ? fieldLimitRerender : formLimitRerender;

          if (limitRerender) {
            return (
              <FormikField {...fieldProps}>
                {(props: FieldProps<any>) => {
                  const renderProps = {
                    ...props,
                    setFieldValueAndTouched: (fieldName: string, value: any) =>
                      setFieldValueAndTouched(props.form, fieldName, value),
                  };
                  return (
                    <FieldRerenderBlocker
                      {...renderProps}
                      dependencies={dependencies}
                      limitRerenderWatched={limitRerenderWatched}
                      render={() => this.props.children(renderProps)}
                    />
                  );
                }}
              </FormikField>
            );
          }
          return (
            <FormikField {...fieldProps}>
              {(props: FieldProps<any>) =>
                this.props.children({
                  ...props,
                  setFieldValueAndTouched: (fieldName: string, value: any) =>
                    setFieldValueAndTouched(props.form, fieldName, value),
                })
              }
            </FormikField>
          );
        }}
      </FormContext.Consumer>
    );
  }
}
