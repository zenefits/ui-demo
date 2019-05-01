import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import { IconButton } from 'z-frontend-elements';

import Signature from './Signature';
import { signatureInitials } from './signatureData';

// NOTE-DZH: a test verifying canvas gets updated would be good, but signature_pad is not receiving events via simulate
describe('Signature', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Signature />)).toHaveLength(1);
  });

  it('should show default signature', () => {
    const wrapper = mountWithTheme(<Signature defaultSignatureImage={signatureInitials} />);
    const instance = wrapper.instance() as Signature;
    expect(instance.isEmpty()).toBe(false);
  });

  it('should hide reset button when disabled', () => {
    const wrapper = mountWithTheme(<Signature />);
    expect(wrapper.find(IconButton)).toHaveLength(1);
    wrapper.setProps({ disabled: true });
    expect(wrapper.find(IconButton)).toHaveLength(0);
  });

  it('should clear the signature when clicking refresh', () => {
    const clearFn = jest.fn();
    const changeFn = jest.fn();
    const wrapper = mountWithTheme(
      <Signature defaultSignatureImage={signatureInitials} onSignatureClear={clearFn} onSignatureChange={changeFn} />,
    );
    const instance = wrapper.instance() as Signature;
    expect(instance.isEmpty()).toBe(false);
    wrapper.find(IconButton).simulate('click'); // clear button
    expect(instance.isEmpty()).toBe(true);
    expect(clearFn).toHaveBeenCalled();
    expect(changeFn).toHaveBeenCalled();
  });
});
