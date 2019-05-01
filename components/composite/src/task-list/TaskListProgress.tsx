import React, { Component, ReactNode } from 'react';

import { ProgressBar } from 'z-frontend-elements';
import { Heading, NumberText, TextBlock, TextInline } from 'zbase';

import Card from '../card/Card';

type TaskListProgressProps = {
  completed: number;
  total: number;
  description?: ReactNode;
};

export default class TaskListProgress extends Component<TaskListProgressProps> {
  getDescription() {
    const { completed, total, description } = this.props;
    if (description) {
      return description;
    }
    return completed ? (
      <TextInline bold>
        You are <NumberText value={completed / total} style="percent" /> done!
      </TextInline>
    ) : (
      "We'll keep a check on your progress as you start"
    );
  }

  render() {
    const { completed, total } = this.props;
    return (
      <Card>
        <Card.Row>
          <Heading level={3} fontStyle="headings.m" mb={3}>
            Set Up Progress
          </Heading>
          <ProgressBar w={1} value={completed / total} />
          <TextBlock fontStyle="paragraphs.s" mt={2}>
            {this.getDescription()}
          </TextBlock>
        </Card.Row>
      </Card>
    );
  }
}
