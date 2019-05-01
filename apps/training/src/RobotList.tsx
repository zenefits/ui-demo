import React, { Component } from 'react';

import { Table } from 'z-frontend-tables';
// import { Box } from 'zbase';
// import { Link } from 'z-frontend-elements';

import { RobotAvatarProps } from './RobotAvatar';

interface RobotListProps {
  robots: RobotAvatarProps[];
}

const columnWidths = [2 / 10, 7 / 10, 1 / 10];

class RobotList extends Component<RobotListProps> {
  render() {
    // const { robots } = this.props;
    return (
      <Table columnWidths={columnWidths} width={[1, null, 7 / 10]}>
        {/* TODO: use robots.map and Table.Row to iterate... note we assume 3 columns above */}
      </Table>
    );
  }
}

export default RobotList;
