import React, { Component } from 'react';
import { FormikConsumer } from 'formik';

import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';
import { Box, BoxProps } from 'zbase';

const StyledPropsDetails = styled.details`
  cursor: pointer;
  user-select: none;

  summary:focus {
    outline: none;
  }
`;

const DebugInfo = styled.pre`
  font-size: 10px;
  padding: ${space(2)};
  margin: 0;
  overflow-x: auto;
`;

class FormDebug extends Component<BoxProps> {
  render() {
    return __DEVELOPMENT__ ? (
      <StyledPropsDetails open>
        <summary>Formik State</summary>
        <Box bg="grayscale.g" color="text.dark" my={3}>
          <FormikConsumer>
            {({ validationSchema, validate, ...rest }) => <DebugInfo>{JSON.stringify(rest, null, 2)}</DebugInfo>}
          </FormikConsumer>
        </Box>
      </StyledPropsDetails>
    ) : null;
  }
}

export default FormDebug;
