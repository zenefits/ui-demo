import React from 'react';

import { Box, Button, Heading, TextBlock } from 'zbase';
import { Card, TaskList, TaskListProgress, TaskState } from 'z-frontend-composites';

import ProductPageContainer from '../product-page-container/ProductPageContainer';
import OverviewLayout from './OverviewLayout';
import { storiesOf } from '../../.storybook/storyHelpers';

const title = 'Your feedback is valuable.';
const subtitle = 'This is a moderately long subtitle. Not that long, really.';
const heroRender = () => <Button p={2}>Provide Feedback</Button>;

const mainRender = () => <Card p={5}>main</Card>;
const sideRender = () => <Card p={5}>side</Card>;

const complexMainRender = () => (
  <Box>
    <Box pb={3}>
      <Card p={5} mb={3}>
        main1
      </Card>
    </Box>
    <Card p={5}>main2</Card>
  </Box>
);

storiesOf('layout|OverviewLayout', module)
  .addDecorator((getStory: Function) => <Box p={20}>{getStory()}</Box>)
  .add('hero only', () => <OverviewLayout heroTitle={title} heroSubtitle={subtitle} heroRender={heroRender} />)
  .add('loading', () => (
    <OverviewLayout isHeroLoading heroTitle={title} heroSubtitle={subtitle} heroRender={heroRender} />
  ))
  .add('hero and main', () => (
    <OverviewLayout heroTitle={title} heroSubtitle={subtitle} heroRender={heroRender} mainRender={mainRender} />
  ))
  .add('hero and complex main', () => (
    <OverviewLayout heroTitle={title} heroSubtitle={subtitle} heroRender={heroRender} mainRender={complexMainRender} />
  ))
  .add('hero and side', () => (
    <OverviewLayout heroTitle={title} heroSubtitle={subtitle} heroRender={heroRender} sideRender={sideRender} />
  ))
  .add('hero, main and side', () => (
    <OverviewLayout
      heroTitle={title}
      heroSubtitle={subtitle}
      heroRender={heroRender}
      mainRender={mainRender}
      sideRender={sideRender}
    />
  ))
  .add('hero, complex main and side', () => (
    <OverviewLayout
      heroTitle={title}
      heroSubtitle={subtitle}
      heroRender={heroRender}
      mainRender={complexMainRender}
      sideRender={sideRender}
    />
  ))
  .add('task list pattern', () => {
    const tasks = [
      { title: 'Set up your company profile', taskRoute: '', state: TaskState.completed, etaInMinutes: 10 },
      { title: 'Add your employees', taskRoute: '', state: TaskState.started, etaInMinutes: 5 },
      { title: 'Choose your health benefits provider', taskRoute: '', state: TaskState.ready, etaInMinutes: 10 },
      { title: 'Set up your contribution policy', taskRoute: '', state: TaskState.notReady, etaInMinutes: 10 },
    ];

    const heroTitle = "Welcome, let's get started";
    const heroSubtitle =
      "We've got a list of tasks that will help you get up and running with Zenefits. Once you are done, you'll have the ability to set up additional features at your leisure.";
    const mainRender = () => (
      <Box>
        <TaskList mb={4} title="Getting Started">
          <TaskList.Item {...tasks[0]} />
          <TaskList.Item {...tasks[1]} />
        </TaskList>
        <TaskList title="Next steps">
          <TaskList.Item {...tasks[2]} />
          <TaskList.Item {...tasks[3]} />
        </TaskList>
      </Box>
    );

    const sideRender = () => (
      <Box>
        <TaskListProgress completed={1} total={4} />
        <Card>
          <Card.Row>
            <Heading level={3} fontStyle="headings.m" mb={3}>
              Enroll or decline by January 30
            </Heading>
            <TextBlock>
              You need to enroll or decline insurance coverage by January 30th, 2019, at 23:50 p.m. PST.
            </TextBlock>
          </Card.Row>
        </Card>
      </Box>
    );
    return (
      <ProductPageContainer>
        <OverviewLayout
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          mainRender={mainRender}
          sideRender={sideRender}
        />
      </ProductPageContainer>
    );
  });
