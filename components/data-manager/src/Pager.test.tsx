import React from 'react';
import Pager from './Pager';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

describe('Pager', () => {
  let props;
  let wrapper;
  let onPageChange;

  beforeEach(() => {
    props = { totalItemsCount: 50, currentPage: 1, pageSize: 20, s: 'large' };
    onPageChange = jest.fn();
    wrapper = mountWithTheme(<Pager {...props} onPageChange={onPageChange} />);
  });

  it('should mount without throwing an error', () => {
    expect(wrapper.find('Pager')).toHaveLength(1);
  });

  it('should have two buttons', () => {
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should call callback on button clicks', () => {
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(onPageChange).toBeCalled();
    expect(onPageChange.mock.calls[0][0]).toBeTruthy();
  });

  it('should not call callback if button is disabled', () => {
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(onPageChange).not.toBeCalled();
  });

  it('should give the size prop to the button', () => {
    expect(
      wrapper
        .find('button')
        .first()
        .props(),
    ).toHaveProperty('s', 'large');
  });
});

describe('range of items', () => {
  const props = {
    totalItemsCount: 50,
    currentPage: 1,
    pageSize: 20,
  };

  it('should display the correct range of items', () => {
    const wrapper = renderWithTheme(<Pager {...props} onPageChange={null} />);
    expect(wrapper.text()).toEqual('1-20 (of 50)');
  });

  it('should end on the correct end despite page size', () => {
    const newProps = {
      ...props,
      currentPage: 3,
    };
    const wrapper = renderWithTheme(<Pager {...newProps} onPageChange={null} />);
    expect(wrapper.text()).toEqual('41-50 (of 50)');
  });
});
