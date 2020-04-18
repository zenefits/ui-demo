import React, { Component } from 'react';

import { Card } from 'z-frontend-composites';
import {
  FileUploaderProps,
  Form,
  FormikHelpers,
  FormFileUploader,
  FormRadio,
  FormRadioGroup,
  FormSignature,
  FormTextInput,
} from 'z-frontend-forms';
import { hasAdobeReader, isBrowserIe, Link, PdfDocumentViewer, PdfDocumentViewerProps } from 'z-frontend-elements';
import { TextBlock } from 'zbase';

interface DocumentSignatureValues {
  signingMethod?: 'online' | 'upload';
  title?: string;
  name?: string;
  uploader?: [];
  signature?: string;
}

interface DocumentSignatureFileUploaderOnlyValues {
  uploader?: [];
}

type Props = {
  /**
   * Props for the PdfDocumentViewer.
   * @see See [PdfDocumentViewer](#!/PdfDocumentViewer) for details
   */
  pdfDocumentViewerProps: PdfDocumentViewerProps;
  /**
   * callback for when the form is submitted
   */
  onSubmit: (values: DocumentSignatureValues | DocumentSignatureFileUploaderOnlyValues, actions: any) => void;
  /**
   * callback for when the form is canceled. If this isnt included, the cancel button will be omitted
   */
  onCancel?: () => void;
  /**
   * Props for the FileUploader.
   * @see See [Form.FileUploader](#!/Form.FileUploader) for details.
   * Note: for this component, maxFiles defaults to `1` and acceptedFileTypes defaults to `['pdf']`
   */
  fileUploaderProps?: FileUploaderProps;
};

class DocumentSignatureLayout extends Component<Props> {
  signatureOptions = [
    { value: 'online', label: 'Sign online' },
    { value: 'upload', label: 'Upload signed copy' },
  ];

  getOnlineSignatureOption = () => {
    return (
      <Card.Row>
        <FormTextInput name="name" label="Full Name" />
        <FormTextInput name="title" label="Title" />
        <FormSignature name="signature" label="Signature" />
      </Card.Row>
    );
  };

  getFileUploaderOption = (fileUploaderProps: FileUploaderProps) => {
    const { acceptedFileTypes, maxFiles, ...rest } = fileUploaderProps;
    const { pdf } = this.props.pdfDocumentViewerProps;

    return (
      <Card.Row>
        <FormFileUploader
          name="uploader"
          label="Upload File"
          additionalInformation={
            <TextBlock>
              <Link href={pdf} download>
                Download
              </Link>
              , sign, and upload it below
            </TextBlock>
          }
          acceptedFileTypes={acceptedFileTypes || ['pdf']}
          maxFiles={maxFiles || 1}
          {...rest}
        />
      </Card.Row>
    );
  };

  onSubmit = (values: DocumentSignatureValues, actions: FormikHelpers<DocumentSignatureValues>) => {
    this.props.onSubmit(values, actions);
  };

  onFileUploaderOnlySubmit = (
    values: DocumentSignatureFileUploaderOnlyValues,
    actions: FormikHelpers<DocumentSignatureFileUploaderOnlyValues>,
  ) => {
    this.props.onSubmit(values, actions);
  };

  shouldHidePdf = () => {
    return isBrowserIe() && !hasAdobeReader();
  };

  getCardHeader = () => {
    return <Card.Header>Review & Sign</Card.Header>;
  };

  getCardFooter = () => {
    return (
      <Card.Footer>
        <Form.Footer
          primaryText="Save"
          cancelShown={Boolean(this.props.onCancel)}
          cancelOnClick={this.props.onCancel}
        />
      </Card.Footer>
    );
  };

  render() {
    const { fileUploaderProps, pdfDocumentViewerProps } = this.props;
    if (this.shouldHidePdf()) {
      // separated since cant use when validation schema since radio buttons dont exist in this case
      return (
        <Form<DocumentSignatureFileUploaderOnlyValues>
          initialValues={{
            uploader: [],
          }}
          validationSchema={{
            uploader: Form.Yup.string().required('Please upload a file.'),
          }}
          onSubmit={this.onFileUploaderOnlySubmit}
        >
          {(props: any) => (
            <Card>
              {this.getCardHeader()}
              {this.getFileUploaderOption(fileUploaderProps)}
              {this.getCardFooter()}
            </Card>
          )}
        </Form>
      );
    }

    return (
      <Form<DocumentSignatureValues>
        initialValues={{ signingMethod: 'online', name: '', title: '', signature: '', uploader: [] }}
        validationSchema={{
          signingMethod: Form.Yup.string().required('Please choose a signing method.'),
          name: Form.Yup.string().when('signingMethod', {
            is: 'online',
            then: Form.Yup.string().required('Please enter your name.'),
          }),
          title: Form.Yup.string().when('signingMethod', {
            is: 'online',
            then: Form.Yup.string().required('Please enter your title.'),
          }),
          signature: Form.Yup.string().when('signingMethod', {
            is: 'online',
            then: Form.Yup.string().required('Please add your signature.'),
          }),
          uploader: Form.Yup.string().when('signingMethod', {
            is: 'upload',
            then: Form.Yup.string().required('Please upload a file.'),
          }),
        }}
        onSubmit={this.onSubmit}
      >
        {props => {
          return (
            <Card>
              {this.getCardHeader()}
              <Card.Row>
                <PdfDocumentViewer {...pdfDocumentViewerProps} border />
              </Card.Row>
              <Card.Row>
                <FormRadioGroup name="signingMethod" label="Signing Method">
                  {this.signatureOptions.map(option => (
                    <FormRadio
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      disabled={props.isSubmitting}
                    />
                  ))}
                </FormRadioGroup>
              </Card.Row>
              {props.values.signingMethod === 'online'
                ? this.getOnlineSignatureOption()
                : this.getFileUploaderOption(fileUploaderProps)}
              {this.getCardFooter()}
            </Card>
          );
        }}
      </Form>
    );
  }
}

export default DocumentSignatureLayout;
