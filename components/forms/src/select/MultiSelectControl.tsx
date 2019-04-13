import React from 'react';

import { styled, IconNameString } from 'z-frontend-theme';
import { radius, space } from 'z-frontend-theme/utils';
import { IconButton } from 'z-frontend-elements';
import { Box, Flex, Icon } from 'zbase';

import { SelectOptionSize } from './SelectOptions';
import { PlaceholderText, SelectControlContainer } from './SelectControl';
import { KEY_CODES } from './utils';

export const sizeMap: { [size in SelectOptionSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};

SelectControlContainer.defaultProps = {
  fontStyle: 'paragraphs.m',
};

type MultiSelectControlProps = {
  placeholder: string;
  selections?: string[];
  selectIconName?: IconNameString;
  leftIconName?: IconNameString;
  onClick?: (e?: any) => void;
  onFocus?: (e?: any) => void;
  onKeyDown?: (e?: any) => void;
  onClearAll?: () => void;
  onClearItem?: (i: number) => void;
  s?: SelectOptionSize;
  hasError?: boolean;
  removeSelection?: (i: number, selections: string[]) => void;
  innerRef?: React.RefObject<any>;
  autoFocus?: boolean;
  disabled?: boolean;
};

const SelectionPill = styled(Flex.extendProps<{ disabled: boolean }>())`
  margin: 2px;
  border-radius: ${radius()};
  padding-right: ${props => props.disabled && space(2)};
`;

SelectionPill.defaultProps = {
  mr: 2,
  py: '2px',
  pl: 2,
  border: true,
  justify: 'center',
  align: 'center',
  bg: 'secondary.c',
};

const SelectionsContainer = styled(Flex)`
  flex-wrap: wrap;
`;

SelectionsContainer.defaultProps = {
  align: 'center',
  flex: '1',
};

const SELECT_ICON_NAME = 'chevron-down';

export default class MultiSelectControl extends React.Component<MultiSelectControlProps> {
  static defaultProps = {
    s: 'medium',
    selections: [] as string[],
  };

  componentDidMount() {
    if (this.props.autoFocus && this.props.innerRef) {
      this.props.innerRef.current.focus();
    }
  }

  render() {
    const {
      selections,
      s: size,
      hasError,
      onClick,
      onFocus,
      onKeyDown,
      onClearItem,
      onClearAll,
      placeholder,
      innerRef,
      disabled,
    } = this.props;
    const hasSelections = selections.length > 0;

    return (
      <SelectControlContainer
        s={size}
        hasError={hasError}
        role="button"
        onClick={disabled ? () => {} : onClick}
        onFocus={disabled ? () => {} : onFocus}
        tabIndex={!disabled && 0}
        onKeyDown={disabled ? () => {} : onKeyDown}
        elementRef={innerRef}
        disabled={disabled}
      >
        <SelectionsContainer pl={hasSelections ? 2 : 3}>
          {hasSelections ? (
            selections.map((selection, i) => (
              <SelectionPill key={i} disabled={disabled}>
                {selection}
                {!disabled && (
                  <IconButton
                    iconName="close"
                    s="small"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onClearItem && onClearItem(i);
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      e.stopPropagation();
                      if (e.keyCode === KEY_CODES.ENTER && onClearItem) {
                        onClearItem(i);
                      }
                    }}
                  />
                )}
              </SelectionPill>
            ))
          ) : (
            <PlaceholderText>{placeholder}</PlaceholderText>
          )}
        </SelectionsContainer>
        {hasSelections && !disabled && (
          <Box>
            <IconButton
              iconName="close"
              s={size}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onClearAll && onClearAll();
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                e.stopPropagation();
                if (e.keyCode === KEY_CODES.ENTER && onClearAll) {
                  onClearAll();
                }
              }}
              p={0}
            />
          </Box>
        )}

        <Box py={2} pl={0} pr={3}>
          <Icon iconName={SELECT_ICON_NAME} s={size} />
        </Box>
      </SelectControlContainer>
    );
  }
}
