import React, { FunctionComponent } from 'react';

import { Modal, ModalProps } from 'z-frontend-overlays';
import { TextBlock } from 'zbase';

import { FileResponse, Form, FormFileUploader, ImageCropper } from '../..';
import { uploadFileToS3, FileFetch, FileUploadMetadata } from '../file-uploader/fileUtil';

export type ImageUploadModalProps = {
  /** Callback fired when user wants to save cropped image. */
  onSave: (cropped: FileResponse) => void;

  /** Callback fired when user wants to delete existing image. */
  onDeleteExisting: () => void;

  /** Modal props controlling visibility etc. Typically from DialogManager. */
  modalProps: ModalProps;

  /** File metadata for the cropper upload. */
  fileUploadProps?: FileUploadMetadata;

  /**
   * Label for image to upload and crop. Should be capitalized.
   * @default "Photo"
   */
  imageLabel?: string;

  /**
   * This is just used to mock a backend
   * @ignore
   */
  internalFetch?: FileFetch;
};

type ModalFormValues = {
  upload: FileResponse[];
  cropped: File;
};

const ImageUploadModal: FunctionComponent<ImageUploadModalProps> = props => {
  const { modalProps, onSave, onDeleteExisting, fileUploadProps, internalFetch, imageLabel = 'Photo' } = props;

  const uploadOptions = {
    internalFetch,
  };
  const fileMetadata = {
    category: fileUploadProps?.category,
    companyId: fileUploadProps?.companyId,
    employeeId: fileUploadProps?.employeeId,
  };
  return (
    <Form<ModalFormValues>
      initialValues={{
        upload: [],
        cropped: null,
      }}
      onSubmit={async (values: ModalFormValues) => {
        try {
          const response = await uploadFileToS3(values.cropped, 0, fileMetadata, uploadOptions);
          onSave(response);
        } catch (error) {
          console.error(error);
          throw error; // user will see sanitized message
        }
      }}
    >
      {formProps => {
        const imageToCrop = formProps.values.upload.length ? formProps.values.upload[0].fileUrl : null;
        return (
          <Modal size="medium" title={`Upload ${imageLabel}`} {...modalProps}>
            {imageToCrop ? (
              <>
                <Modal.Body p={0}>
                  <ImageCropper
                    src={imageToCrop}
                    onSuccess={cropped => {
                      // console.log('updating form state', cropped);
                      formProps.setFieldValue('cropped', cropped);
                      formProps.setFieldTouched('cropped', true, false);
                    }}
                    cropperProps={{
                      crossorigin: 'anonymous', // allow localhost
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Form.Footer
                    primaryText="Save"
                    cancelOnClick={modalProps.onCancel}
                    tertiaryShown
                    tertiaryText={`Upload New ${imageLabel}`}
                    tertiaryOnClick={() => {
                      formProps.resetForm({ values: { upload: [], cropped: null } });
                    }}
                  />
                </Modal.Footer>
              </>
            ) : (
              <>
                <Modal.Body>
                  <TextBlock mb={4}>Upload a .JPG, .GIF or .PNG</TextBlock>
                  <FormFileUploader
                    name="upload"
                    label={`Upload ${imageLabel}`}
                    maxFiles={1}
                    acceptedFileTypes={['image']}
                    employeeId={fileUploadProps?.employeeId}
                    companyId={fileUploadProps?.companyId}
                    category={fileUploadProps?.category}
                    format="raw"
                    internalFetch={internalFetch}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Form.Footer
                    primaryText="Save"
                    primaryDisabled={imageToCrop === null}
                    cancelOnClick={modalProps.onCancel}
                    tertiaryShown
                    tertiaryText={`Delete Current ${imageLabel}`}
                    tertiaryOnClick={onDeleteExisting}
                  />
                </Modal.Footer>
              </>
            )}
          </Modal>
        );
      }}
    </Form>
  );
};

export default ImageUploadModal;
