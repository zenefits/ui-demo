import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { cleanup } from 'react-testing-library';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Button } from 'z-frontend-elements';

import { DialogManager, DialogProps } from '../dialog/DialogManager';
import Modal from './Modal';

describe('Modal', () => {
  const DialogManagerWithModal = () => (
    <DialogManager
      render={({ isVisible, open, close, controlEl }: DialogProps) => (
        <>
          <Modal isVisible={isVisible} title="Test Modal" onCancel={close} controlEl={controlEl}>
            Modal Content
            <Button onClick={close}>Close Modal</Button>
          </Modal>
          <Button onClick={open}>Open Modal</Button>
        </>
      )}
    />
  );

  afterEach(cleanup);

  it('can be toggled using DialogManager context methods', async () => {
    const wrapper = renderWithContext(<DialogManagerWithModal />);
    expect(wrapper.queryByText('Modal Content')).toBe(null);
    ReactTestUtils.Simulate.click(wrapper.getByText('Open Modal'));
    wrapper.getByText('Modal Content');
    ReactTestUtils.Simulate.click(wrapper.getByText('Close Modal'));
    expect(wrapper.queryByText('Modal Content')).toBe(null);
  });
});
