import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import PdfDocumentViewer from './PdfDocumentViewer';

const PDF_LINK =
  'https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf';

storiesOf('elements|PdfDocumentViewer', module)
  .addDecorator((getStory: Function) => <Flex p={20}>{getStory()}</Flex>)
  .add('default', () => (
    <Box w={[1 / 2, 1]} border p={2}>
      <PdfDocumentViewer pdf={PDF_LINK} height="300px" fallback={<TextBlock>Custom Fallback</TextBlock>} />
    </Box>
  ))
  .add('isLoading', () => (
    <Box w={[1 / 2, 1]} border p={2}>
      <PdfDocumentViewer isLoading pdf={PDF_LINK} border height="300px" />
    </Box>
  ));
