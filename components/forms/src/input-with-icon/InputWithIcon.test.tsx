import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { IconNameString } from 'z-frontend-theme';

import InputWithIcon from '../input-with-icon/InputWithIcon';

describe('InputWithIcon', () => {
  afterEach(cleanup);

  it('has placeholder and icons', () => {
    const { getByPlaceholderText, container } = renderWithContext(
      <InputWithIcon leftIconName="search" rightIconName="close" placeholder="Search" />,
    );
    getByPlaceholderText('Search');
    expect(container.querySelectorAll('i')).toHaveLength(2);
  });

  it('takes input unless disabled', () => {
    const { getByPlaceholderText, findByDisplayValue } = renderWithContext(
      <>
        <InputWithIcon placeholder="Search" />,
        <InputWithIcon placeholder="Find" disabled />
      </>,
    );

    userEvent.type(getByPlaceholderText('Search'), 'Inigo');
    findByDisplayValue('Inigo');

    expect(getByPlaceholderText('Find')).toBeDisabled();
  });

  it('supports data-testid and aria-label', () => {
    const { getByTestId, getByLabelText } = renderWithContext(
      <InputWithIcon
        leftIconName="search"
        rightIconName="close"
        data-testid="search-input"
        aria-label="Superhero search"
        placeholder="Search"
      />,
    );
    getByTestId('search-input');
    getByLabelText('Superhero search');
  });

  it('should trigger events only when not disabled', () => {
    const leftOnClick = jest.fn();
    const rightOnClick = jest.fn();
    const onChange = jest.fn();

    const disabledLeftOnClick = jest.fn();
    const disabledRightOnClick = jest.fn();

    const commonProps = {
      leftIconName: 'search' as IconNameString,
      rightIconName: 'close' as IconNameString,
    };
    const { getByTestId } = renderWithContext(
      <>
        <div data-testid="container">
          <InputWithIcon
            data-testid="search-input"
            {...commonProps}
            onLeftIconClick={leftOnClick}
            onRightIconClick={rightOnClick}
            onChange={onChange}
          />
        </div>
        <div data-testid="disabled-container">
          <InputWithIcon
            data-testid="search-input-disabled"
            disabled
            {...commonProps}
            onLeftIconClick={disabledLeftOnClick}
            onRightIconClick={disabledRightOnClick}
          />
        </div>
      </>,
    );
    userEvent.type(getByTestId('search-input'), 'hello');
    expect(onChange).toHaveBeenCalled();

    const icons = getByTestId('container').querySelectorAll('i');
    userEvent.click(icons[0]);
    userEvent.click(icons[1]);
    expect(leftOnClick).toHaveBeenCalled();
    expect(rightOnClick).toHaveBeenCalled();

    expect(getByTestId('search-input-disabled')).toBeDisabled();

    const disabledIcons = getByTestId('disabled-container').querySelectorAll('i');
    userEvent.click(disabledIcons[0]);
    userEvent.click(disabledIcons[1]);
    expect(disabledLeftOnClick).not.toHaveBeenCalled();
    expect(disabledRightOnClick).not.toHaveBeenCalled();
  });
});
