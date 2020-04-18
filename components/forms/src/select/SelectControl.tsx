import React from 'react';

import { styled, ColorString } from 'z-frontend-theme';
import { IconButton } from 'z-frontend-elements';
import { color, fontSizes, radius } from 'z-frontend-theme/utils';
import { Box, Flex, FlexProps, Icon, TextInline } from 'zbase';

import { SelectOptionSize } from './SelectOptions';
import { KEY_CODES } from './utils';

export const sizeMap: { [size in SelectOptionSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};

type SelectControlContainerProps = {
  s: SelectOptionSize;
  hasError?: boolean;
  disabled?: boolean;
};

const getBorderColor = (props: SelectControlContainerProps, defaultColor: ColorString) => {
  if (props.disabled) {
    return color('grayscale.g');
  } else if (props.hasError) {
    return color('negation.a');
  }
  return color(defaultColor);
};

export const SelectControlContainer = styled(Flex)<SelectControlContainerProps>`
  font-size: ${(props: SelectControlContainerProps) => fontSizes(sizeMap[props.s])};
  border: 1px solid ${props => getBorderColor(props, 'grayscale.f')};
  border-radius: ${radius()};
  background-color: ${props => (props.disabled ? color('grayscale.g') : color('grayscale.white'))};
  color: ${props => (props.disabled ? color('text.light') : color('text.dark'))};

  :hover,
  :active {
    border-color: ${props => getBorderColor(props, 'grayscale.e')};
  }

  :focus {
    border-color: ${props => getBorderColor(props, 'tertiary.a')};
    box-shadow: 0 0 0 1px ${color('tertiary.a', 0.5)};
    outline: none;
  }
`;

SelectControlContainer.defaultProps = {
  fontStyle: 'paragraphs.m',
};

export const PlaceholderText = styled(TextInline)`
  color: ${color('grayscale.d')};
`;

const SelectionContainer = styled(Flex)`
  overflow: hidden;
`;

const Selection = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

type SelectControlProps = {
  placeholder: string;
  disabled?: boolean;
  selection?: string;
  onCloseIconClick?: () => void;
  s?: SelectOptionSize;
  hasError?: boolean;
  innerRef?: React.RefObject<any>;
  autoFocus?: boolean;
  clearable?: boolean;

  /** Test ID to find the element in tests */
  'data-testid'?: string;
} & FlexProps;

const SELECT_ICON_NAME = 'chevron-down';

class SelectControl extends React.Component<SelectControlProps> {
  static defaultProps = {
    s: 'medium',
    clearable: true,
  };

  componentDidMount() {
    if (this.props.autoFocus && this.props.innerRef) {
      this.props.innerRef.current.focus();
    }
  }

  render() {
    const {
      s: size,
      hasError,
      onClick,
      onFocus,
      onKeyDown,
      selection,
      placeholder,
      onCloseIconClick,
      innerRef,
      disabled,
      clearable,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
    } = this.props;
    return (
      <SelectControlContainer
        s={size}
        hasError={hasError}
        role="button"
        onClick={disabled ? () => {} : onClick}
        onFocus={disabled ? () => {} : onFocus}
        tabIndex={disabled ? null : 0}
        onKeyDown={disabled ? () => {} : onKeyDown}
        elementRef={innerRef}
        disabled={disabled}
        aria-label={ariaLabel}
        data-testid={dataTestId}
      >
        <SelectionContainer align="center" flex="1" pl={3}>
          {selection ? (
            // We need a separate container here since `text-overflow` doesn't work with flex elements https://bugzilla.mozilla.org/show_bug.cgi?id=912434
            <Selection>{selection}</Selection>
          ) : (
            <PlaceholderText>{placeholder}</PlaceholderText>
          )}
        </SelectionContainer>

        {selection && clearable && !disabled && (
          <Box>
            <IconButton
              iconName="close"
              s={size}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onCloseIconClick && onCloseIconClick();
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                e.stopPropagation();
                if (e.keyCode === KEY_CODES.ENTER && onCloseIconClick) {
                  onCloseIconClick();
                }
              }}
            />
          </Box>
        )}
        <Box py={2} pl={0} pr={3} color="grayscale.e">
          <Icon iconName={SELECT_ICON_NAME} s={size} />
        </Box>
      </SelectControlContainer>
    );
  }
}

export default SelectControl;
