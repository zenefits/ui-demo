import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { DialogManager } from 'z-frontend-overlays';
import { Button } from 'zbase';

import ImageUploadModal, { ImageUploadModalProps } from './ImageUploadModal';

export const DefaultExample = (imageUploadModalProps?: Partial<ImageUploadModalProps>) => (
  <DialogManager
    openByDefault // for visual testing
    render={({ open, close, controlEl, isVisible }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Upload Photo',
        onCancel: close,
      };

      return (
        <>
          <ImageUploadModal
            fileUploadProps={{
              category: 'test',
            }}
            onSave={close}
            onDeleteExisting={close}
            modalProps={modalProps}
            {...imageUploadModalProps}
          />
          <Button onClick={open}>Show modal</Button>
        </>
      );
    }}
  />
);

describe('ImageUploadModal', () => {
  afterEach(cleanup);

  it('shows initial state (file upload)', () => {
    const { getByText, getByTestId } = renderWithContext(<DefaultExample />);

    const modalBody = getByTestId('ModalCard');
    expect(modalBody.querySelector('h5')).toHaveTextContent('Upload Photo');
    getByText('Drag your file', { exact: false }); // file uploader prompt

    const saveButton = getByText('Save');
    expect(saveButton).toBeDisabled(); // cannot save until file chosen
  });

  it.todo('save button works');

  it('delete button works', () => {
    const onDeleteExisting = jest.fn();
    const { getByText } = renderWithContext(<DefaultExample onDeleteExisting={onDeleteExisting} />);
    getByText('Delete Current Photo').click();
    expect(onDeleteExisting).toBeCalled();
  });
});
