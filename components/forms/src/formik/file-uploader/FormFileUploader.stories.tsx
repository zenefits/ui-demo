import React from 'react';

import { Box, TextBlock } from 'zbase';
import { Button, Link } from 'z-frontend-elements';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormFileUploader } from '../../..';
import { fakeFetch } from '../../file-uploader/fakeFetchUtil';
import { FileResponse } from '../../file-uploader/fileUtil';

// File doesn't support spread operator
const existingFile: FileResponse = {
  file: new File(['This is my file content'], 'testFile.txt'),
  fileName: 'testFile',
  randomKey: 'foo',
  fileId: '123',
  fullFileUrl: 'http://localhost/foo',
  fileUrl: 'localhost/foo',
  uploadUrl: 'localhost/upload',
};

storiesOf('forms|Form.FileUploader', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <Form onSubmit={() => {}} initialValues={{ uploader: [] }}>
      <FormFileUploader name="uploader" label="Upload Your File" internalFetch={fakeFetch} />
    </Form>
  ))
  .add('with validation', () => (
    <Form
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          console.log(values);
        }, 1000);
      }}
      initialValues={{ uploader: [] }}
      validationSchema={{
        uploader: Form.Yup.array()
          .required('Please upload your documents')
          .min(3, 'Please upload at least 3 documents.'),
      }}
    >
      {props => (
        <>
          <FormFileUploader name="uploader" label="Upload Your File" internalFetch={fakeFetch} />
          <Button
            type="submit"
            mode="primary"
            inProgress={props.isSubmitting}
            // trigger validation immediately:
            autoFocus
            onFocus={() => props.submitForm()}
          >
            Continue
          </Button>
        </>
      )}
    </Form>
  ))
  .add('with additionalInformation prop', () => (
    <Form onSubmit={() => {}} initialValues={{ uploader: [] }}>
      <FormFileUploader
        name="uploader"
        label="Upload your file"
        internalFetch={fakeFetch}
        additionalInformation={
          <TextBlock>
            <Link
              href="https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf"
              download
            >
              Print document
            </Link>
            , sign it, and upload below
          </TextBlock>
        }
      />
    </Form>
  ))
  .add('with existing files', () => (
    <Form onSubmit={() => {}} initialValues={{ uploader: [existingFile] }}>
      <FormFileUploader name="uploader" label="Upload your file" internalFetch={fakeFetch} />
    </Form>
  ))
  .add('link', () => (
    <Form onSubmit={() => {}} initialValues={{ uploader: [] }}>
      <FormFileUploader name="uploader" label="Upload your file" internalFetch={fakeFetch} isLink />
    </Form>
  ));
