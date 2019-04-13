import React, { Component } from 'react';

import { Box, BoxProps, Heading } from 'zbase';

import TaskListItem from './TaskListItem';

type TaskListProps = {
  /**
   * Title of the list
   */
  title: string;
};

export default class TaskList extends Component<TaskListProps & BoxProps> {
  static Item = TaskListItem;
  render() {
    const { title, children, ...boxProps } = this.props;
    return (
      <Box {...boxProps}>
        <Heading fontStyle="headings.m" level={3} mb={3}>
          {title}
        </Heading>
        {children}
      </Box>
    );
  }
}
