import React from 'react';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import NumberInput from './NumberInput';

// TODO: update these tests to use @testing-library/react

describe('NumberInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<NumberInput />)).toHaveLength(1);
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
    let wrapper = mountEnzymeWithTheme(<NumberInput allowNegative defaultValue="-222" />);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('-222');

    wrapper = mountEnzymeWithTheme(<NumberInput allowNegative={false} defaultValue="-222" />);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('222');
  });

  it('should support integerLimit prop', () => {
    const integerLimit = 5;
    const wrapper = mountEnzymeWithTheme(<NumberInput integerLimit={integerLimit} defaultValue="1234567" />);
    // expect(getProps(wrapper)).toHaveProperty('integerLimit', integerLimit);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('12,345');
  });

  it('should support allowDecimal prop', () => {
    let wrapper = mountEnzymeWithTheme(<NumberInput allowDecimal defaultValue="1.22" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('1.22');

    wrapper = mountEnzymeWithTheme(<NumberInput allowDecimal={false} defaultValue="1.22" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', false);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('122');
  });

  it('should support includeThousandsSeparator prop', () => {
    let wrapper = mountEnzymeWithTheme(<NumberInput includeThousandsSeparator defaultValue="100000" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('100,000');

    wrapper = mountEnzymeWithTheme(<NumberInput includeThousandsSeparator={false} defaultValue="100000" />);
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', false);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('100000');
  });
});
