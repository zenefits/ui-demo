import React from 'react';

import { Box, BoxProps, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

type ExampleProps = {
  label?: string;
} & BoxProps;

const ExampleContainer = styled(Box)`
  box-shadow: -5px 0px 0px 0px ${color('grayscale.white')}, -10px 0px 0px 0px ${color('secondary.b')};
`;

class Example extends React.Component<ExampleProps> {
  render() {
    const { label, children, ...rest } = this.props;
    return (
      <ExampleContainer mb={5} {...rest}>
        {label && <TextBlock pb={1}>{label}:</TextBlock>}
        {children}
      </ExampleContainer>
    );
  }
}

export default Example;
