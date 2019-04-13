import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { Box, PluralText } from '../index';

// see .storybook/config.js for externalized strings

storiesOf('zbase|PluralText', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('inline text', () =>
    [0, 1, 2, 10].map(count => (
      <Box key={count}>
        <PluralText none="No reviews" one="Found {count} review" other="Found {count} reviews" count={count} />
      </Box>
    )),
  )
  .add('localized text', () =>
    [0, 1, 2, 10].map(count => (
      <Box key={count}>
        <PluralText
          noneKey="reviews.assigned.none"
          oneKey="reviews.assigned.one"
          otherKey="reviews.assigned.other"
          count={count}
        />
      </Box>
    )),
  )
  .add('util props', () =>
    [0, 1, 2, 10].map(count => (
      <Box key={count}>
        <PluralText
          fontStyle="headings.l"
          bg="affirmation.c"
          none="No reviews"
          one="Found {count} review"
          other="Found {count} reviews"
          count={count}
        />
      </Box>
    )),
  );
