import React from 'react';

import { Box } from 'zbase';

import HtmlDocumentViewer from './HtmlDocumentViewer';

export default () => (
  <Box w={200} border p={2}>
    <HtmlDocumentViewer html="<h1>header</h1><div>test</div>" />
  </Box>
);
