import React from 'react';
// @ts-ignore
import { boolean, text } from '@storybook/addon-knobs';

import { Box, Button } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import OverviewHero from './OverviewHero';

const overviewTitle = 'Your feedback is valuable.';
const overviewSubtitle = 'This is a moderately long subtitle. Not that long, really.';
const buttonText = 'Provide Feedback';

storiesOf('layout|OverviewHero', module)
  .addDecorator((getStory: Function) => <Box p={20}>{getStory()}</Box>)
  .add('title only', () => {
    const title = text('title', overviewTitle);
    return <OverviewHero title={title} />;
  })
  .add('loading', () => {
    const title = text('title', overviewTitle);
    const isLoading = boolean('isLoading', true);
    return <OverviewHero title={title} isLoading={isLoading} />;
  })
  .add('title and subtitle', () => {
    const title = text('title', overviewTitle);
    const subtitle = text('subtitle', overviewSubtitle);
    return <OverviewHero title={title} subtitle={subtitle} />;
  })
  .add('title and content', () => {
    const title = text('title', overviewTitle);
    const button = text('button text', buttonText);
    return (
      <OverviewHero title={title}>
        <Button p={2}>{button}</Button>
      </OverviewHero>
    );
  })
  .add('title, subtitle and content', () => {
    const title = text('title', overviewTitle);
    const subtitle = text('subtitle', overviewSubtitle);
    const button = text('button text', buttonText);
    return (
      <OverviewHero title={title} subtitle={subtitle}>
        <Button p={2}>{button}</Button>
      </OverviewHero>
    );
  });
