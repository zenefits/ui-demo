import React, { Component } from 'react';
import { connect, FormikContext } from 'formik';
import { get } from 'lodash';

import { Flex, FlexProps } from 'zbase';
import { Button } from 'z-frontend-elements';

type FormFooterProps = {
  /** Primary button label. */
  primaryText: string;
  /** Action to take on primary button click. By default, button will submit the form. */
  primaryOnClick?: any;
  /** Disable primary button. By default, will happen while form is submitting only. */
  primaryDisabled?: boolean;
  /** Arbitrary props to pass through to primary button. Useful for attributes like `data-testid`. */
  primaryProps?: Object;
  /**
   * Is cancel button shown?
   * @default true
   */
  cancelShown?: boolean;
  /**
   * Cancel button label.
   * @default 'Cancel'
   */
  cancelText?: string;
  /** Action to take on cancel button click. */
  cancelOnClick?: any;
  /** Arbitrary props to pass through to cancel button. Useful for attributes like `data-testid`. */
  cancelProps?: Object;
} & FlexProps;

type FormFooterAllProps = FormFooterProps & { formik: FormikContext<any> };

class FormFooter extends Component<FormFooterAllProps> {
  static defaultProps = {
    cancelShown: true,
    cancelText: 'Cancel',
  };

  shouldComponentUpdate(nextProps: FormFooterAllProps) {
    // only re-render when necessary, not on any formik prop change
    const relevantPropChanges = [
      'formik.isSubmitting',
      'primaryText',
      'primaryOnClick',
      'primaryDisabled',
      'primaryProps',
      'cancelShown',
      'cancelText',
      'cancelOnClick',
      'cancelProps',
    ];
    const shouldUpdate = relevantPropChanges.some(prop => {
      return get(this.props, prop) !== get(nextProps, prop);
    });
    return shouldUpdate;
  }

  render() {
    const {
      primaryText,
      primaryOnClick,
      primaryDisabled,
      primaryProps,
      cancelShown,
      cancelText,
      cancelOnClick,
      cancelProps,
      formik,
      ...flexProps
    } = this.props;

    const cancelButton = cancelShown ? (
      <Button
        type="button"
        mode="normal"
        disabled={formik.isSubmitting}
        onClick={cancelOnClick}
        w={[1 / 2, 'auto']}
        mr={3}
        {...cancelProps}
      >
        {cancelText}
      </Button>
    ) : null;
    const submitMobileWidth = cancelShown ? 1 / 2 : 1;
    const submitProps = {
      ...(primaryDisabled && { disabled: primaryDisabled }),
      ...(primaryOnClick && { onClick: primaryOnClick }),
      ...primaryProps,
    };
    const submitButton = (
      <Button
        className="js-walkme-form-submit"
        type={primaryOnClick ? 'button' : 'submit'}
        mode="primary"
        w={[submitMobileWidth, 'auto']}
        inProgress={formik.isSubmitting}
        {...submitProps}
      >
        {primaryText}
      </Button>
    );

    return (
      <Flex justify="flex-end" align="center" {...flexProps}>
        {cancelButton}
        {submitButton}
      </Flex>
    );
  }
}

export default connect<FormFooterProps, any>(FormFooter);
