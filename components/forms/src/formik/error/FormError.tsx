import React, { Component } from 'react';

import { TextBlock, TextBlockProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

type FormErrorProps = TextBlockProps & {
  /**
   * Error message to display.
   */
  textDefault: string;
};

const StyledTextBlock = styled(TextBlock)`
  border: 1px solid ${color('negation.c')};
`;

/** Informs the user of a form error, usually due to field validation. */
class FormError extends Component<FormErrorProps> {
  static defaultProps = {
    px: 3,
    py: 2,
  };

  render() {
    const { id, px, py, ...rest } = this.props;
    const textKey = this.props.textKey || `formError.${id || 'unspecified'}`; // needed for TextBlock
    return (
      <StyledTextBlock
        id={id}
        px={px}
        py={py}
        role="alert"
        bg="negation.d"
        color="negation.a"
        textKey={textKey}
        {...rest}
      />
    );
  }
}

export default FormError;
