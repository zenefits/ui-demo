import React, { Component } from 'react';

import { ResponsiveUtilProp, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { ScreenReaderOnly } from 'z-frontend-elements';

type FormSectionProps = {
  /**
   * Section heading label. To reveal only for screen readers, combine with `visuallyHidden`.
   */
  label: string;
  /**
   * Identifier for anchor links.
   */
  id?: string;
  /**
   * Hide the label visually so that only screen readers can recognize it.
   * @default false
   */
  visuallyHidden?: boolean;
  /**
   * Padding bottom.
   * @default 4
   */
  pb?: ResponsiveUtilProp;
};

const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
`;

const SectionHeading = styled(TextBlock)`
  letter-spacing: 0.5px;
  font-weight: normal;
`;

class FormSection extends Component<FormSectionProps> {
  static defaultProps = {
    pb: 4,
    visuallyHidden: false,
  };

  render() {
    const { label, visuallyHidden, children, ...rest } = this.props;
    const headingBlock = (
      <SectionHeading tag="legend" fontStyle="headings.xs" color="grayscale.d" {...rest}>
        {label}
      </SectionHeading>
    );
    const totalChildren = React.Children.count(children);
    return (
      <StyledFieldset>
        {visuallyHidden ? <ScreenReaderOnly>{headingBlock}</ScreenReaderOnly> : headingBlock}
        {React.Children.map(children, (child, i) => {
          // remove mb on final child in a section
          // TODO: this doesn't work for multi-field components like Form.AddressUS
          const extraChildProps = i === totalChildren - 1 ? { containerProps: { mb: 0 } } : {};
          return React.cloneElement(child as React.ReactElement<any>, extraChildProps);
        })}
      </StyledFieldset>
    );
  }
}

export default FormSection;
