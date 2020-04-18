import React from 'react';

import { paddedBox } from 'z-frontend-storybook-config';
import { DialogManager } from 'z-frontend-overlays';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import ImageUploadModal from './ImageUploadModal';
import { fakeFetch } from '../..';

storiesOf('forms|ImageUploadModal', module)
  .addDecorator(paddedBox)
  .add('default', () => <DefaultExample />);

export const DefaultExample = () => (
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
            onSave={() => {
              alert('todo: save cropped file name');
              close();
            }}
            onDeleteExisting={() => {
              alert('todo: delete existing photo');
              close();
            }}
            modalProps={modalProps}
            internalFetch={fakeFetch}
          />
          <Button onClick={open}>Show modal</Button>
        </>
      );
    }}
  />
);
