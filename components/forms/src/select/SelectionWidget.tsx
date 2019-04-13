import React from 'react';

import { Box, Flex } from 'zbase';

import InputWithIcon from '../input-with-icon/InputWithIcon';
import { InputProps } from '../input/Input';
import { SelectOptions, SelectOptionsProps, SelectOptionSize } from './SelectOptions';

type SelectionWidgetProps = {
  inputProps?: InputProps;
  inputRef?: React.RefObject<HTMLInputElement>;
  s?: SelectOptionSize;
} & SelectOptionsProps;

class SelectionWidget extends React.Component<SelectionWidgetProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { children, inputProps, inputRef, s: size, ...wrapperProps } = this.props;
    return (
      <SelectOptions {...wrapperProps} s={size} position="static">
        <Flex direction="column" align="stretch">
          <Box m={2}>
            <InputWithIcon {...inputProps} elementRef={inputRef} s={size} leftIconName="search" />
          </Box>
          {children}
        </Flex>
      </SelectOptions>
    );
  }
}

export default SelectionWidget;
