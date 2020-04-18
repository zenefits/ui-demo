import React, { Component } from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { styled, Render } from 'z-frontend-theme';

import Card from '../card/Card';
import TaskStatusIcon from './TaskStatusIcon';
import { TaskState } from './types';

export type TaskProps = {
  /**
   * Current progress state of the item
   */
  state: TaskState;
  /**
   * Number of minutes that the task is expected to take
   */
  etaInMinutes: number;
  /**
   * Title of the item
   */
  title: string;
  /**
   * Route to transition to when task "Start", "Resume" or "Review" button/link is clicked
   */
  taskRoute?: string;
  /**
   * URL to transition to when task "Start", "Resume" or "Review" button/link is clicked
   */
  taskUrl?: string;
  /**
   * Handler for when the button gets clicked
   */
  onEnter?: () => void;
};

const RightPositioned = styled(Flex)`
  margin-left: auto;
`;

const Title = styled(TextBlock)`
  line-height: 1.2;
`;

export default class TaskListItem extends Component<TaskProps> {
  getDescriptionText() {
    const { state, etaInMinutes } = this.props;
    if (state === TaskState.ready) {
      return `About ${etaInMinutes} min`;
    } else if (state === TaskState.notReady) {
      return 'Requires earlier section be completed first';
    } else if (state === TaskState.started) {
      return 'In progress';
    }
  }

  getAction() {
    const { state } = this.props;

    if (state === 'ready') {
      return this.props.taskRoute ? (
        <Button.RouteLink to={this.props.taskRoute} mode="primary" onClick={this.props.onEnter}>
          Start
        </Button.RouteLink>
      ) : (
        <Button.Link href={this.props.taskUrl} mode="primary" onClick={this.props.onEnter}>
          Start
        </Button.Link>
      );
    } else if (state === 'started') {
      return this.props.taskRoute ? (
        <Button.RouteLink to={this.props.taskRoute} mode="normal" onClick={this.props.onEnter}>
          Resume
        </Button.RouteLink>
      ) : (
        <Button.Link href={this.props.taskUrl} mode="normal" onClick={this.props.onEnter}>
          Resume
        </Button.Link>
      );
    } else if (state === 'completed') {
      return (
        <Link fontStyle="paragraphs.m" href={this.props.taskUrl} to={this.props.taskRoute} onClick={this.props.onEnter}>
          Review
        </Link>
      );
    }
    return null;
  }

  render() {
    const { state, title } = this.props;

    const descriptionText = this.getDescriptionText();
    const action = this.getAction();
    return (
      <Card p={4} mb={2}>
        <Flex align="center">
          <TaskStatusIcon state={state} />

          <Render forBreakpoints={[false, false, true, true, true]}>
            <Title fontStyle="headings.s">{title}</Title>

            <RightPositioned align="center">
              {descriptionText && (
                <TextBlock fontStyle="paragraphs.s" color="text.light">
                  {descriptionText}
                </TextBlock>
              )}
              <Box ml={3}>{action}</Box>
            </RightPositioned>
          </Render>

          <Render forBreakpoints={[true, true]}>
            <Box>
              <Title fontStyle="headings.s">{title}</Title>
              {descriptionText && (
                <TextBlock fontStyle="paragraphs.s" color="text.light" pr={action ? 3 : 0}>
                  {descriptionText}
                </TextBlock>
              )}
            </Box>

            <RightPositioned align="center">
              <Box ml={3}>{action}</Box>
            </RightPositioned>
          </Render>
        </Flex>
      </Card>
    );
  }
}
