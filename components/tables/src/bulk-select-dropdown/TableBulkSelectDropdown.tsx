import React, { Component, MouseEvent } from 'react';

import { Box, Flex, Icon } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/utils';
import { ButtonDropdown } from 'z-frontend-elements';
import { Checkbox } from 'z-frontend-forms';

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

type TableBulkSelectDropdownProps = {
  /** Function called when unselect all is clicked */
  unselectAll: () => void;
  /** Function called when select all is clicked */
  selectAll: () => void;
  /** The current number of rows in the table which are selected */
  numberOfSelected: number;
  /** The total number of rows in the table */
  numberOfAll: number;
};

class TableBulkSelectDropdown extends Component<TableBulkSelectDropdownProps, {}> {
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

  onClickMinusSquare = () => {
    if (this.props.unselectAll) {
      this.props.unselectAll();
    }
  };

  onClickCheckbox = (e: MouseEvent<any>) => {
    e.stopPropagation();
    const checkboxStatus = this.getCheckboxStatus(this.props.numberOfSelected, this.props.numberOfAll);
    if (checkboxStatus === 'none') {
      this.props.selectAll();
    }
    if (checkboxStatus === 'all') {
      this.props.unselectAll();
    }
  };

  onClickDropdownAll = (e: MouseEvent<any>) => {
    this.props.selectAll();
  };

  onClickDropdownNone = (e: MouseEvent<any>) => {
    this.props.unselectAll();
  };

  render() {
    const { numberOfSelected, numberOfAll } = this.props;
    const checkboxStatus = this.getCheckboxStatus(numberOfSelected, numberOfAll);
    const showCheckbox = checkboxStatus === 'all' || checkboxStatus === 'none';
    return (
      <ButtonDropdown
        fontSize__deprecated__doNotUse={1}
        target={
          <BulkSelectDropdownContainer px={2} border justify="center" align="center">
            {showCheckbox ? (
              <Checkbox
                mr={checkboxStatus === 'all' ? 3 : 0}
                mb={0}
                checked={checkboxStatus === 'all'}
                onClick={this.onClickCheckbox}
                onChange={(e: any) => e.stopPropagation()}
                label={checkboxStatus === 'all' ? `${numberOfAll} selected` : ''}
              />
            ) : (
              <Flex align="center">
                <MinusSquareIcon
                  fontStyle="controls.xl"
                  color="tertiary.a"
                  iconName="minus-square"
                  mr={2}
                  onClick={() => this.onClickMinusSquare()}
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

export default TableBulkSelectDropdown;
