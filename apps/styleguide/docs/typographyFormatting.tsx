import React from 'react';

import { Box, TextBlock, TextInline } from 'zbase';

export default () => (
  <Box>
    <TextBlock mb={1}>
      <TextInline bold>Bold</TextInline>: Communicates clickables and specific locations within Zenefits apps.
    </TextBlock>
    <TextBlock mb={1}>
      <TextInline style={{ fontStyle: 'italic' }}>Italics</TextInline>: Used exclusively for citation, communicating
      precise inputs or outputs.
    </TextBlock>
    <TextBlock>
      <TextInline style={{ textDecoration: 'underline' }}>Underline</TextInline>: Reserved strictly for hyperlinked
      text, and nothing else!
    </TextBlock>
  </Box>
);
