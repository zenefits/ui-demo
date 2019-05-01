import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MentionText, { MentionProps } from './MentionText';

const text = 'Hey [@234], can you take a look at this? [@4321] and [@11] will review once you are done.';

const mentions = {
  234: {
    label: 'Meghan',
    tooltipText: 'Meghan Markle\nmarklesparkle@zenefits.com',
  },
  11: {
    label: 'Elizabeth',
    tooltipText: 'Elizabeth Queen\nthequeen@zenefits.com',
  },
  4321: {
    label: 'Juniper',
    tooltipText: 'Juniper Stottle\njuniper@zenefits.com',
  },
};

const MentionTextExample = (props: Partial<MentionProps>) => <MentionText text={text} mentions={mentions} {...props} />;

storiesOf('forms|MentionText', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <MentionTextExample />)
  .add('without mention', () => <MentionTextExample mentions={{}} />)
  .add('with util props', () => <MentionTextExample fontStyle="paragraphs.xl" color="text.dark" />);
