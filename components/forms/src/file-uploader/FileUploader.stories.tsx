import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import { fakeFetch, fakeFetchThatErrors } from './fakeFetchUtil';
import FileUploader from './FileUploader';

storiesOf('forms|FileUploader', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1 / 4}>
      {getStory()}
    </Box>
  ))
  .add('default', () => <FileUploader internalFetch={fakeFetch} />)
  .add('single file only', () => <FileUploader internalFetch={fakeFetch} maxFiles={1} />)
  .add('image only', () => <FileUploader internalFetch={fakeFetch} acceptedFileTypes={['image']} />)
  .add('max file size', () => <FileUploader internalFetch={fakeFetch} maxFileSize={2} />)
  .add('error', () => <FileUploader internalFetch={fakeFetchThatErrors} maxFileSize={2} />)
  .add('link', () => <FileUploader internalFetch={fakeFetch} isLink />);
