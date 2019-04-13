import React from 'react';

import { mountWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { Card } from 'z-frontend-composites';
import { Form } from 'z-frontend-forms';
import { Button } from 'z-frontend-elements';

import DocumentSignatureLayout from './DocumentSignatureLayout';
const PDF_LINK =
  'https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf';

function getWrapper(props: any) {
  const { pdfDocumentViewerProps, onSubmit, ...rest } = props;
  const fallback = () => {};
  return mountWithThemeIntl(
    <DocumentSignatureLayout
      pdfDocumentViewerProps={pdfDocumentViewerProps || { pdf: PDF_LINK }}
      onSubmit={onSubmit || fallback}
      {...rest}
    />,
  );
}

describe('DocumentSignatureLayout', () => {
  it('should mount without throwing an error', () => {
    const wrapper = getWrapper({});
    expect(wrapper).toHaveLength(1);
  });

  it('should have a Card.Header', () => {
    const wrapper = getWrapper({});
    const cardHeader = wrapper.find(Card.Header);
    expect(cardHeader).toHaveLength(1);
    expect(cardHeader.text().trim()).toEqual('Review & Sign');
  });

  it('should have a Card.Footer and Form.Footer', () => {
    const wrapper = getWrapper({});
    const cardFooter = wrapper.find(Card.Footer);
    expect(cardFooter).toHaveLength(1);
    const formFooter = wrapper.find(Form.Footer);
    expect(formFooter).toHaveLength(1);
  });

  it('should show the cancel button if there is an onCancel prop', () => {
    const onCancel = jest.fn();
    const wrapperWithCancel = getWrapper({ onCancel });
    const formFooter = wrapperWithCancel.find(Form.Footer);
    expect(formFooter.find(Button)).toHaveLength(2);
    const cancelButton = formFooter.find(Button).first();
    const saveButton = formFooter.find(Button).last();
    expect(cancelButton.text().trim()).toEqual('Cancel');
    expect(saveButton.text().trim()).toEqual('Save');

    cancelButton.simulate('click');
    expect(onCancel).toBeCalled();
    expect(onCancel.mock.calls[0][0]).toBeTruthy();
  });

  it('should omit the cancel button if ther is no onCancel prop', () => {
    const wrapperWithoutCancel = getWrapper({});
    const formFooter = wrapperWithoutCancel.find(Form.Footer);
    expect(formFooter.find(Button)).toHaveLength(1);
    const saveButton = formFooter.find(Button).first();
    expect(saveButton.text().trim()).toEqual('Save');
  });

  it('should contain two radio buttons for the signing method', () => {
    const wrapper = getWrapper({});

    const formRadioGroup = wrapper.find(Form.RadioGroup);
    expect(formRadioGroup).toHaveLength(1);

    expect(formRadioGroup.find(Form.Radio)).toHaveLength(2);
    const onlineRadio = formRadioGroup.find(Form.Radio).first();
    const uploadRadio = formRadioGroup.find(Form.Radio).last();
    expect(onlineRadio.text().trim()).toEqual('Sign online');
    expect(uploadRadio.text().trim()).toEqual('Upload signed copy');
  });

  it('should show the correct form field if online radio button is checked', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find(Form.TextInput)).toHaveLength(2);
    const nameTextInput = wrapper.find(Form.TextInput).first();
    const titleTextInput = wrapper.find(Form.TextInput).last();
    expect(nameTextInput.text().trim()).toEqual('Full Name');
    expect(titleTextInput.text().trim()).toEqual('Title');

    expect(wrapper.find(Form.Signature)).toHaveLength(1);
    expect(
      wrapper
        .find(Form.Signature)
        .text()
        .trim(),
    ).toEqual('Signature');
  });

  it('should show the correct form field if upload radio button is checked', () => {
    const wrapper = getWrapper({ fileUploaderProps: {} });
    const newStateValues: any = {
      signingMethod: 'upload',
      name: '',
      title: '',
      signature: '',
      uploader: [],
    };

    // a bit of a hack, but simulates the radio button click for upload choice
    const formikInstance = wrapper.find('Formik').instance();
    formikInstance.setState({
      values: newStateValues,
    });
    expect(formikInstance.state.values).toEqual(newStateValues);

    const formFileUploader = wrapper.update().find(Form.FileUploader);
    expect(formFileUploader).toHaveLength(1);
  });
});
