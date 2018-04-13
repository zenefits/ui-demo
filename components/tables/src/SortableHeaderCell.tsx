import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Flex, Icon, P } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { ButtonDropdown } from 'z-frontend-forms';

interface InternalProps {
  header: SortableColumnHeaderProps;
  onHeaderSortClicked: (sortOption) => void;
}

declare type SortableColumnOptionProps = {
  title: string;
  order: string;
  field: string;
};

export declare type SortableColumnHeaderProps = {
  title: string;
  isSortable: boolean;
  sortOptions: SortableColumnOptionProps[];
  customComponent?: any;
};

declare type Props = RouteComponentProps<{}> & InternalProps;

const TargetContainer = styled(Flex)`
  cursor: pointer;
`;

class SortableHeaderCell extends Component<Props> {
  getSortParamFromUrl = () => {
    const params = new URLSearchParams(this.props.location.search);
    const sortOrder = params.get('sort');
    const header = this.props.header.sortOptions.find(option => {
      return option.field === sortOrder;
    });
    return header ? header.order : null;
  };

  render() {
    const iconColor: ColorString = 'grayscale.d';
    const sortOrder = this.getSortParamFromUrl();
    const iconName =
      sortOrder === 'ascending' ? 'long-arrow-up' : sortOrder === 'descending' ? 'long-arrow-down' : null;
    const sortOrderIcon = iconName ? <Icon iconName={iconName} w={16} s="medium" color={iconColor} /> : null;

    const headerTitle = (
      <P fontStyle="controls.s" color="grayscale.d">
        {this.props.header.title}
      </P>
    );
    if (!this.props.header.isSortable) {
      return headerTitle;
    }

    return (
      <Flex align="center">
        <ButtonDropdown
          fontSize__deprecated__doNotUse={1}
          target={
            <TargetContainer align="center">
              {sortOrderIcon}
              {headerTitle}
              <Icon iconName="caret-down" ml={2} color={iconColor} />
            </TargetContainer>
          }
        >
          {this.props.header.sortOptions.map((sortOption, index) => (
            <ButtonDropdown.ItemButton key={index} onClick={() => this.props.onHeaderSortClicked(sortOption)}>
              <P color="grayscale.d" fontStyle="controls.m">
                {sortOption.title}
              </P>
            </ButtonDropdown.ItemButton>
          ))}
        </ButtonDropdown>
      </Flex>
    );
  }
}

export default withRouter<InternalProps>(SortableHeaderCell);
