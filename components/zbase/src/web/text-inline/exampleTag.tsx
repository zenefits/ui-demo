import React from 'react';

import { Box, TextInline } from '../index';

export default () => (
  <Box>
    To approve a PR, leave a comment including{' '}
    <TextInline tag="abbr" bold title="Looks Good To Me">
      LGTM
    </TextInline>
    .<TextInline tag="small">Only after you review the changes, of course.</TextInline>
  </Box>
);
