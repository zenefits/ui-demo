import React from 'react';

import { Box } from 'zbase';

import ReadMore from './ReadMore';

const review =
  'Sally sets very high standards, aware that this will bring attention and promotion. When ideas are challenged by others, Sally listens to their view politely, but is able to maintain a position firmly and persuasively without aggression. Sets an example of bravery that inspires others. Always contributes vigorously to the efforts of the team, whether as a leader or a team member.';
export default () => (
  <Box w={1 / 2}>
    <ReadMore>{review}</ReadMore>
  </Box>
);
