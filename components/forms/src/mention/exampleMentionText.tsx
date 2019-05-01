import React from 'react';

import MentionText from './MentionText';

const text = 'Hey [@234], can you take a look at this? [@11] will review once you are done.';

const mentions = {
  234: {
    label: 'Meghan',
    tooltipText: 'Meghan Markle\nmarklesparkle@zenefits.com',
  },
  11: {
    label: 'Elizabeth',
    tooltipText: 'Elizabeth Queen\nthequeen@zenefits.com',
  },
};

export default () => <MentionText text={text} mentions={mentions} />;
