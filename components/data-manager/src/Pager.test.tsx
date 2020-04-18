import React from 'react';
import { ReactWrapper } from 'enzyme';

import { Button } from 'z-frontend-elements';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Pager from './Pager';

describe('Pager', () => {
  let props;
  let wrapper: ReactWrapper;
  let onPageChange: jest.Mock;

  beforeEach(() => {
    props = { totalItemsCount: 50, currentPage: 1, pageSize: 20, s: 'large' as any };
    onPageChange = jest.fn();
    wrapper = mountEnzymeWithTheme(<Pager {...props} onPageChange={onPageChange} />);
  });

  it('should mount without throwing an error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have two buttons', () => {
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should call callback on button clicks', () => {
    wrapper
      .find(Button)
      .at(1)
      .simulate('click');
    expect(onPageChange).toBeCalled();
    expect(onPageChange.mock.calls[0][0]).toBeTruthy();
  });

  it('should not call callback if button is disabled', () => {
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(onPageChange).not.toBeCalled();
  });

  it('should give the size prop to the button', () => {
    expect(
      wrapper
        .find(Button)
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
    const wrapper = renderEnzymeWithTheme(<Pager {...props} onPageChange={null} />);
    expect(wrapper.text()).toEqual('1-20 (of 50)');
  });

  it('should correctly handle empty', () => {
    const wrapper = renderEnzymeWithTheme(<Pager {...props} totalItemsCount={0} onPageChange={null} />);
    expect(wrapper.text()).toEqual('0 (of 0)');
  });

  it('should end on the correct end despite page size', () => {
    const newProps = {
      ...props,
      currentPage: 3,
    };
    const wrapper = renderEnzymeWithTheme(<Pager {...newProps} onPageChange={null} />);
    expect(wrapper.text()).toEqual('41-50 (of 50)');
  });
});
