import React from 'react';
import { fireEvent } from '@testing-library/react';

import { mountEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Card } from 'z-frontend-composites';
import { Form, FormRadio, FormRadioGroup, FormSignature, FormTextInput } from 'z-frontend-forms';
import { Button } from 'z-frontend-elements';

import DocumentSignatureLayout from './DocumentSignatureLayout';

const PDF_LINK =
  'https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf';

function getWrapper(props: any, mountFn = mountEnzymeWithThemeIntl) {
  const { pdfDocumentViewerProps, onSubmit, ...rest } = props;
  const fallback = () => {};
  return mountEnzymeWithThemeIntl(
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

    const formRadioGroup = wrapper.find(FormRadioGroup);
    expect(formRadioGroup).toHaveLength(1);

    expect(formRadioGroup.find(FormRadio)).toHaveLength(2);
    const onlineRadio = formRadioGroup.find(FormRadio).first();
    const uploadRadio = formRadioGroup.find(FormRadio).last();
    expect(onlineRadio.text().trim()).toEqual('Sign online');
    expect(uploadRadio.text().trim()).toEqual('Upload signed copy');
  });

  it('should show the correct form field if online radio button is checked', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find(FormTextInput)).toHaveLength(2);
    const nameTextInput = wrapper.find(FormTextInput).first();
    const titleTextInput = wrapper.find(FormTextInput).last();
    expect(nameTextInput.text().trim()).toEqual('Full Name');
    expect(titleTextInput.text().trim()).toEqual('Title');

    expect(wrapper.find(FormSignature)).toHaveLength(1);
    expect(
      wrapper
        .find(FormSignature)
        .text()
        .trim(),
    ).toEqual('Signature');
  });

  it('should show the correct form field if upload radio button is checked', () => {
    const wrapper = renderWithContext(
      <DocumentSignatureLayout pdfDocumentViewerProps={{ pdf: PDF_LINK }} onSubmit={() => {}} fileUploaderProps={{}} />,
    );

    fireEvent.click(wrapper.getByLabelText('Upload signed copy'));

    wrapper.findByText('Upload File');
  });
});
