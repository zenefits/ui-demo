import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import Ellipsis, { EllipsisProps } from './Ellipsis';

const fullName = 'Inigo Montoya';

const longText = `That said, plenty of companies choose to create one because they can be useful in mitigating conflict among employees within the company. The exact point is different for each company, but if you think your small business is reaching a size where conflicts might start to crop up, it’s probably a good idea to whip up a handbook.

Beyond solving employee or culture issues, employee handbooks can also help new employees feel at home in their new environments. Learning about a company’s stories, missions, and core values can increase employee engagement and loyalty. It’s also a useful resource for employees to check dress codes, PTO policies, parking recommendations, etc. to help them feel acclimated to the company culture immediately. So, it’s beneficial to write one as soon as you have a mission statement, core values, and other details about your company you’d like to share.`;

const EllipsisExample = (props: EllipsisProps & { text?: string }) => (
  <Box w={70}>
    <Ellipsis mb={2} {...props}>
      {props.text || fullName}
    </Ellipsis>
    <Ellipsis mb={2} {...props}>
      {props.text || fullName}
    </Ellipsis>
    <Ellipsis {...props}>{props.text || fullName}</Ellipsis>
  </Box>
);

storiesOf('elements|Ellipsis', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <EllipsisExample />)
  .add('full text unnecessary', () => <EllipsisExample text="Inigo" />)
  .add('right placement', () => <EllipsisExample fullTextPlacement="right" />)
  .add('at bottom of screen', () => (
    <Box mt={300}>
      <EllipsisExample />
    </Box>
  ))
  .add('respects util props', () => (
    <Box>
      <Ellipsis mb={5} fontStyle="paragraphs.xl" bg="grayscale.g" p={2} fullTextPlacement="right">
        {longText}
      </Ellipsis>
      <Ellipsis fontStyle="paragraphs.xl" bg="grayscale.g" p={2}>
        Not long enough for ellipsis.
      </Ellipsis>
    </Box>
  ))
  .add('handles really long text', () => <EllipsisExample text={longText + longText + longText} />);
