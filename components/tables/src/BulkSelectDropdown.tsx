import React, { Component } from 'react';

import { Box, Flex, Icon } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/utils';
import { Checkbox, ButtonDropdown } from 'z-frontend-forms';

type CheckboxStatus = 'none' | 'partial' | 'all';

const BulkSelectDropdownContainer = styled(Flex)`
  height: ${space(5)};
  border-radius: 2px;
`;

const MinusSquareIcon = styled(Icon)`
  :hover {
    color: ${color('link.normal')};
  }
`;

class BulkSelectDropdown extends Component<
  {
    unselectAll: () => void;
    selectAll: () => void;
    numberOfSelected: number;
    numberOfAll: number;
  },
  {}
> {
  getCheckboxStatus: (numberOfSelected: number, numberOfAll: number) => CheckboxStatus = (
    numberOfSelected,
    numberOfAll,
  ) => {
    let checkboxStatus: CheckboxStatus = 'none';
    if (this.props.numberOfSelected) {
      if (this.props.numberOfSelected === this.props.numberOfAll) {
        checkboxStatus = 'all';
      } else {
        checkboxStatus = 'partial';
      }
    }
    return checkboxStatus;
  };

  onClickMinusSquare = e => {
    if (this.props.unselectAll) {
      this.props.unselectAll();
    }
  };

  onClickCheckbox = e => {
    e.stopPropagation();
    const checkboxStatus = this.getCheckboxStatus(this.props.numberOfSelected, this.props.numberOfAll);
    if (checkboxStatus === 'none') {
      this.props.selectAll();
    }
    if (checkboxStatus === 'all') {
      this.props.unselectAll();
    }
  };

  onClickDropdownAll = e => {
    this.props.selectAll();
  };

  onClickDropdownNone = e => {
    this.props.unselectAll();
  };

  render() {
    const { numberOfSelected, numberOfAll } = this.props;
    const checkboxStatus = this.getCheckboxStatus(numberOfSelected, numberOfAll);
    const showCheckbox = checkboxStatus === 'all' || checkboxStatus === 'none';
    return (
      <ButtonDropdown
        fontSize={1}
        target={
          <BulkSelectDropdownContainer px={2} border justify="center" align="center">
            {showCheckbox ? (
              <Checkbox
                mr={checkboxStatus === 'all' ? 3 : 0}
                mb={0}
                checked={checkboxStatus === 'all'}
                onClick={this.onClickCheckbox}
                onChange={e => e.stopPropagation()}
                label={checkboxStatus === 'all' ? `${numberOfAll} selected` : ''}
              />
            ) : (
              <Flex align="center">
                <MinusSquareIcon
                  fontStyle="controls.xl"
                  color="tertiary.a"
                  iconName="minus-square"
                  mr={2}
                  onClick={this.onClickMinusSquare}
                />
                <Box color="grayscale.c" mr={3}>
                  {numberOfSelected} selected
                </Box>
              </Flex>
            )}
            <Icon iconName="chevron-down" color="grayscale.d" fontStyle="controls.xl" />
          </BulkSelectDropdownContainer>
        }
      >
        <ButtonDropdown.ItemButton onClick={this.onClickDropdownAll}>
          All {this.props.numberOfAll}
        </ButtonDropdown.ItemButton>
        <ButtonDropdown.ItemButton onClick={this.onClickDropdownNone}>None</ButtonDropdown.ItemButton>
      </ButtonDropdown>
    );
  }
}

export default BulkSelectDropdown;
