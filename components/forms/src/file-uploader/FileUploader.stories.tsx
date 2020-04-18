import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import { fakeFetch, fakeFetchThatErrors } from './fakeFetchUtil';
import FileUploader from './FileUploader';
import FileComponentItem from './FileComponentItem';

const fakeFile = {
  name: 'my_file_test.png',
  size: 150 * 1000,
  progressPercent: 50,
};

const fakeFileWithError = {
  ...fakeFile,
  hasError: 'We were unable to upload this file.',
};

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
  .add('link', () => <FileUploader maxFiles={2} internalFetch={fakeFetch} isLink />)
  .add('file item - uploading', () => (
    <Box bg="grayscale.white" p={3}>
      <FileComponentItem file={fakeFile} removeFile={() => {}} isUploading />
    </Box>
  ))
  .add('file item - error', () => (
    <Box bg="grayscale.white" p={3}>
      <FileComponentItem file={fakeFileWithError} removeFile={() => {}} />
    </Box>
  ));
