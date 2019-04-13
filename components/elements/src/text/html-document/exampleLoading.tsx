import React from 'react';

import { Box } from 'zbase';

import HtmlDocumentViewer from './HtmlDocumentViewer';

export default () => (
  <Box w={200} border p={2}>
    <HtmlDocumentViewer isLoading html="<div>test</div>" />
  </Box>
);
