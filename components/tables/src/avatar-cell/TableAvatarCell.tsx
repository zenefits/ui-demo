import React, { Component, ReactNode, StatelessComponent } from 'react';

import { Box, Flex, TextBlock, TextBlockProps } from 'zbase';
import { Avatar, AvatarProps } from 'z-frontend-composites';

type RowHeaderProps = TextBlockProps & {
  heading: ReactNode;
  metadata?: string;
};
const RowHeader: StatelessComponent<RowHeaderProps> = ({ heading, metadata, ...props }) => (
  <Box>
    <TextBlock color="text.dark" fontStyle="controls.m">
      {heading}
    </TextBlock>
    {metadata && <TextBlock color="text.light">{metadata}</TextBlock>}
  </Box>
);

type AvatarCellProps = {
  /** First name rendered in the cell. Also used for avatar initial if no image is passed in avatarProps*/
  firstName: string;
  /** Last name rendered in the cell. Also used for avatar initial if no image is passed in avatarProps*/
  lastName: string;
  /** Metadata which is rendered below the name in the call ex: department of an employee */
  metadata?: string;
  /** Avatar passed to the underlying avatar component */
  avatarProps?: AvatarProps;
};

class TableAvatarCell extends Component<AvatarCellProps> {
  render() {
    return (
      <Flex justify="flex-start" align="center">
        <Avatar
          mr={this.props.metadata ? 2 : 3}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          tooltipBody=""
          {...this.props.avatarProps}
        />
        <RowHeader heading={`${this.props.firstName} ${this.props.lastName}`} metadata={this.props.metadata} />
      </Flex>
    );
  }
}

export default TableAvatarCell;
