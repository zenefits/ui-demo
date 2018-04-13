import React from 'react';
import { mount } from 'enzyme';

import { ThemeProvider } from 'z-frontend-theme';

import NumberInput from './NumberInput';

// function getProps(wrapper) {
//   return wrapper
//     .find('input')
//     .first()
//     .props();
// }

describe('NumberInput', () => {
  it('should mount without throwing an error', () => {
    expect(
      mount(
        <ThemeProvider>
          <NumberInput />
        </ThemeProvider>,
      ).find('NumberInput'),
    ).toHaveLength(1);
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
    let wrapper = mount(
      <ThemeProvider>
        <NumberInput allowNegative value="-222" />
      </ThemeProvider>,
    );
    // expect(getProps(wrapper)).toHaveProperty('allowNegative', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('-222');

    wrapper = mount(
      <ThemeProvider>
        <NumberInput allowNegative={false} value="-222" />
      </ThemeProvider>,
    );
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('222');
  });

  it('should support integerLimit prop', () => {
    const integerLimit = 5;
    const wrapper = mount(
      <ThemeProvider>
        <NumberInput integerLimit={integerLimit} value="1234567" />
      </ThemeProvider>,
    );
    // expect(getProps(wrapper)).toHaveProperty('integerLimit', integerLimit);
    const input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('12,345');
  });

  it('should support allowDecimal prop', () => {
    let wrapper = mount(
      <ThemeProvider>
        <NumberInput allowDecimal value="1.22" />
      </ThemeProvider>,
    );
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', true);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('1.22');

    wrapper = mount(
      <ThemeProvider>
        <NumberInput allowDecimal={false} value="1.22" />
      </ThemeProvider>,
    );
    // expect(getProps(wrapper)).toHaveProperty('allowDecimal', false);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('122');
  });
});
