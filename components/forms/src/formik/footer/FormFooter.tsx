import React, { Component } from 'react';
import { connect, FormikContextType } from 'formik';
import { get } from 'lodash';

import { Box, Flex, FlexProps } from 'zbase';
import { Button, LinkButton } from 'z-frontend-elements';

import FormError from '../error/FormError';

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

  /**
   * Is tertiary button shown?
   * @default false
   */
  tertiaryShown?: boolean;
  /** Tertiary button label. */
  tertiaryText?: string;
  /** Action to take on tertiary button click. */
  tertiaryOnClick?: any;
  /** Arbitrary props to pass through to tertiary button. Useful for attributes like `data-testid`. */
  tertiaryProps?: Object;
} & FlexProps;

type FormFooterAllProps = FormFooterProps & { formik: FormikContextType<any> };

export class FormFooter extends Component<FormFooterAllProps> {
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

      'tertiaryShown',
      'tertiaryText',
      'tertiaryOnClick',
      'tertiaryProps',
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

      tertiaryShown,
      tertiaryText,
      tertiaryOnClick,
      tertiaryProps,

      // Default to empty object to support cases like DataLayout where the footer is not wrapped in a form.
      formik = {} as FormikContextType<any>,
      ...flexProps
    } = this.props;

    const tertiaryButton = tertiaryShown ? (
      <LinkButton
        s="medium"
        disabled={formik.isSubmitting}
        onClick={tertiaryOnClick}
        mt={[3, 0]}
        mr={[0, 3]}
        {...tertiaryProps}
      >
        {tertiaryText}
      </LinkButton>
    ) : null;

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
      <>
        {Object.keys(formik).length > 0 && formik.errors['onSubmitError'] && (
          <FormError mb={2} textDefault={formik.errors['onSubmitError'] as string} />
        )}
        <Flex justify={[null, 'space-between']} direction={['column', 'row']} align="center" {...flexProps}>
          <Box order={[2, 'initial']}>{tertiaryButton}</Box>
          <Flex w={[1, 'auto']}>
            {cancelButton}
            {submitButton}
          </Flex>
        </Flex>
      </>
    );
  }
}

export default connect<FormFooterProps, any>(FormFooter);
