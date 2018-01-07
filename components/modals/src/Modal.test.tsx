import React from 'react';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import Modal from './Modal';
import Button from 'z-frontend-forms/src/Button';

describe('Modal', () => {
  it('toggling isVisible prop should toggle modal content', () => {
    const wrapper = mountWithTheme(
      <Modal title="Foo" isVisible={false} onCancel={() => {}}>
        Bar
      </Modal>,
    );

    expect(wrapper.render().text()).toBe('');

    wrapper.setProps({ isVisible: true });
    const renderedText = wrapper.render().text();
    expect(renderedText).toContain('Foo');
    expect(renderedText).toContain('Bar');
  });

  it('all buttons should work correctly', () => {
    const cancel = jest.fn();
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    const buttonList = [{ text: 'Button 1', onClick: onClick1 }, { text: 'Button 2', onClick: onClick2 }];

    const expectedLabels = ['Cancel', 'Button 1', 'Button 2'];
    const expectedCallbacks = [cancel, onClick1, onClick2];

    const wrapper = mountWithTheme(
      <Modal title="Title" isVisible onCancel={cancel} buttons={buttonList}>
        Test Content
      </Modal>,
    );

    expect.assertions(7);
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(3);
    buttons.forEach((buttonWrapper, i) => {
      expect(buttonWrapper.render().text()).toBe(expectedLabels[i]);
      const button = buttonWrapper.instance();
      expect(button.props.onClick).toBe(expectedCallbacks[i]);
    });
  });
});
