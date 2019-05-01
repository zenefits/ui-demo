import React from 'react';

import { Box, TextBlock, TextBlockProps } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Mention from './Mention';

const MentionExample = (props: TextBlockProps) => (
  <TextBlock {...props}>
    Hey <Mention label="Meghan" />, can you take a look at this?
  </TextBlock>
);

storiesOf('forms|Mention', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <MentionExample />)
  .add('scales with text', () => (
    <Box>
      <MentionExample fontStyle="paragraphs.s" mb={3} />
      <MentionExample fontStyle="paragraphs.m" mb={3} />
      <MentionExample fontStyle="paragraphs.l" mb={3} />
      <MentionExample fontStyle="paragraphs.xl" mb={3} />
      <MentionExample fontStyle="paragraphs.xxl" mb={3} />
    </Box>
  ))
  .add('with tooltip', () => (
    <TextBlock>
      Hey <Mention label="Meghan" tooltipText={`Meghan\nmarklesparkle@zenefits.com`} showTooltip />, can you take a look
      at this?
    </TextBlock>
  ));
