import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ThemeProvider from 'z-frontend-theme/src/ThemeProvider';
import Button from './Button';

describe('Button', () => {
  it('should render without throwing an error', () => {
    expect(
      render(
        <ThemeProvider>
          <Button>Hi</Button>
        </ThemeProvider>,
      ).text(),
    ).toEqual('Hi');
  });

  it('should mount without throwing an error', () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(
      <ThemeProvider>
        <Button onClick={onButtonClick}>Hi</Button>
      </ThemeProvider>,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toBeCalled();
  });

  it('should show ellipsis with text when inProgress is true', () => {
    expect(
      render(
        <ThemeProvider>
          <Button inProgress>Hi</Button>
        </ThemeProvider>,
      ).text(),
    ).toEqual('Hi...');
  });

  it('should be disabled when inProgress is true', () => {
    expect(
      mount(
        <ThemeProvider>
          <Button inProgress>Hi</Button>
        </ThemeProvider>,
      )
        .find('button')
        .prop('disabled'),
    ).toBeTruthy();
  });

  it('should not trigger onClick when disabled', () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(
      <ThemeProvider>
        <Button onClick={onButtonClick} disabled>
          Hi
        </Button>
      </ThemeProvider>,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
  });
});
