import React from 'react';

import { Box, Flex } from 'zbase';

import InputWithIcon from '../input-with-icon/InputWithIcon';
import { InputProps } from '../input/Input';
import { SelectOptions, SelectOptionsProps, SelectOptionSize } from './SelectOptions';
import { KEY_CODES } from './utils';

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
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Pressing Enter should never submit form in the inner input of select
      if (e.keyCode === KEY_CODES.ENTER) {
        e.preventDefault();
      }
      inputProps.onKeyDown(e);
    };

    return (
      <SelectOptions {...wrapperProps} s={size} position="static">
        <Flex direction="column" align="stretch">
          <Box m={2}>
            <InputWithIcon
              {...inputProps}
              onKeyDown={onKeyDown}
              elementRef={inputRef}
              s={size}
              leftIconName="search"
              data-testid="select-input"
            />
          </Box>
          {children}
        </Flex>
      </SelectOptions>
    );
  }
}

export default SelectionWidget;
