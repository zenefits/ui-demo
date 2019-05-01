import React from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Card } from 'z-frontend-composites';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import PageLayout, { rowSpacing } from './PageLayout';

const NavContent = () => <Card p={5}>nav</Card>;
const MainContent = () => <Card p={5}>main</Card>;
const AsideContent = () => <Card p={5}>aside</Card>;

const ComplexMainContent = () => (
  <Box>
    <Box pb={[0, 0, rowSpacing]}>
      <Card p={5}>main1</Card>
    </Box>
    <Card p={5}>main2</Card>
  </Box>
);

storiesOf('layout|PageLayout', module)
  .addDecorator(withViewport())
  .add('loading', () => <PageLayout mode="fluid" columns="12" isLoading />)
  .add('fluid 12', () => (
    <PageLayout mode="fluid" columns="12">
      <PageLayout.Main>
        <MainContent />
      </PageLayout.Main>
    </PageLayout>
  ))
  .add('fixed 12', () => (
    <PageLayout mode="fixed" columns="12">
      <PageLayout.Main>
        <MainContent />
      </PageLayout.Main>
    </PageLayout>
  ))
  .add(
    'fixed 2-8-2 (responsive)',
    () => (
      <PageLayout mode="fixed" columns="2-8-2">
        <PageLayout.Nav>
          <NavContent />
        </PageLayout.Nav>
        <PageLayout.Main>
          <ComplexMainContent />
        </PageLayout.Main>
        <PageLayout.Aside>
          <AsideContent />
        </PageLayout.Aside>
      </PageLayout>
    ),
    setViewports([0, 3]),
  )
  .add(
    'fixed 8-4 (responsive)',
    () => (
      <PageLayout mode="fixed" columns="8-4">
        <PageLayout.Main>
          <ComplexMainContent />
        </PageLayout.Main>
        <PageLayout.Aside>
          <AsideContent />
        </PageLayout.Aside>
      </PageLayout>
    ),
    setViewports([0, 3]),
  );
