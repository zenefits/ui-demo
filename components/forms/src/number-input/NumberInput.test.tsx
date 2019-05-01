import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import NumberInput from './NumberInput';

// function getProps(wrapper) {
//   return wrapper
//     .find('input')
//     .first()
//     .props();
// }

describe('NumberInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<NumberInput />)).toHaveLength(1);
  });

  // it('should support suffix and prefix props', () => {
  //   const prefix = 'testPrefix';
  //   const suffix = 'testSuffix';
  //   const wrapper = mount(
  //     <ThemeProvider>
  //       <NumberInput suffix={suffix} prefix={prefix} />
  //     </ThemeProvider>,
  //   );
  //   expect(getProps(wrapper)).toHaveProperty('suffix', suffix);
  //   expect(getProps(wrapper)).toHaveProperty('prefix', prefix);
  // });

  it('should support allowNegative prop', () => {
    let wrapper = mountWithTheme(<NumberInput allowNegative defaultValue="-222" />);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('-222');

    wrapper = mountWithTheme(<NumberInput allowNegative={false} defaultValue="-222" />);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('222');
  });

  it('should support integerLimit prop', () => {
    const integerLimit = 5;
    const wrapper = mountWithTheme(<NumberInput integerLimit={integerLimit} defaultValue="1234567" />);
    // expect(getProps(wrapper)).toHaveProperty('integerLimit', integerLimit);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('12,345');
  });

  it('should support allowDecimal prop', () => {
    let wrapper = mountWithTheme(<NumberInput allowDecimal defaultValue="1.22" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('1.22');

    wrapper = mountWithTheme(<NumberInput allowDecimal={false} defaultValue="1.22" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', false);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('122');
  });

  it('should support allowCommaSeparator prop', () => {
    let wrapper = mountWithTheme(<NumberInput allowCommaSeparator defaultValue="100000" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('100,000');

    wrapper = mountWithTheme(<NumberInput allowCommaSeparator={false} defaultValue="100000" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', false);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('100000');
  });
});
