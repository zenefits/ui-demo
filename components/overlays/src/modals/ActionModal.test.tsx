import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Button } from 'z-frontend-elements';

import ActionModal from './ActionModal';

describe('ActionModal', () => {
  it('toggling isVisible prop should toggle modal content', () => {
    const wrapper = mountWithTheme(
      <ActionModal title="Foo" isVisible={false} onCancel={() => {}}>
        Bar
      </ActionModal>,
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
    const expectedCallbacks = [cancel, cancel, onClick1, onClick2];

    const wrapper = mountWithTheme(
      <ActionModal title="Title" isVisible onCancel={cancel} buttons={buttonList}>
        Test Content
      </ActionModal>,
    );

    expect.assertions(8);
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(4);
    buttons.forEach((buttonWrapper, i) => {
      if (i > 0) {
        // the first button will be cancel icon button, so no label text
        expect(buttonWrapper.render().text()).toBe(expectedLabels[i - 1]);
      }
      const button = buttonWrapper.instance();
      expect(button.props.onClick).toBe(expectedCallbacks[i]);
    });
  });
});
