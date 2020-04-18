import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Flex, Icon, TextBlock } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { ButtonDropdown } from 'z-frontend-elements';

export type SortableColumnOption = {
  title: string;
  order: string;
  field: string;
};

export type SortableColumnHeaderProps = {
  title: string;
  isSortable: boolean;
  sortOptions: SortableColumnOption[];
  customComponent?: any;
};

interface InternalProps {
  header: SortableColumnHeaderProps;
  onHeaderSortClicked: (sortOption: SortableColumnOption) => void;
}

type Props = RouteComponentProps<{}> & InternalProps;

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
      <TextBlock fontStyle="controls.s" color={sortOrder ? 'grayscale.b' : 'grayscale.d'}>
        {this.props.header.title}
      </TextBlock>
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
          {this.props.header.sortOptions.map(sortOption => (
            <ButtonDropdown.ItemButton
              key={sortOption.title}
              onClick={() => this.props.onHeaderSortClicked(sortOption)}
            >
              <TextBlock color="text.light" fontStyle="controls.m">
                {sortOption.title}
              </TextBlock>
            </ButtonDropdown.ItemButton>
          ))}
        </ButtonDropdown>
      </Flex>
    );
  }
}

export default withRouter<InternalProps>(SortableHeaderCell);
