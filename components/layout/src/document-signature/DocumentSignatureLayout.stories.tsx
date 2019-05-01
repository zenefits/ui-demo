import React from 'react';

import { Box, Flex } from 'zbase';
import { fakeFetch } from 'z-frontend-forms';

import { storiesOf } from '../../.storybook/storyHelpers';
import DocumentSignatureLayout from './DocumentSignatureLayout';

const PDF_LINK =
  'https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf';

storiesOf('layout|DocumentSignatureLayout', module)
  .addDecorator((getStory: Function) => <Flex>{getStory()}</Flex>)
  .add('default', () => (
    <Box w={[1, 1 / 2]} mx={50}>
      <DocumentSignatureLayout
        pdfDocumentViewerProps={{ pdf: PDF_LINK, height: '300px' }}
        onSubmit={(values, actions) =>
          setTimeout(() => {
            console.log(values, 'Values from DocumentSignatureLayout');
            // simulating network being slow (let the button spin)
            actions.setSubmitting(false);
          }, 1000)
        }
        onCancel={() => {}}
        fileUploaderProps={{ category: 'uncategorized', internalFetch: fakeFetch, employeeId: '1' }}
      />
    </Box>
  ));
