import React from 'react';
import { cleanup, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import SwitchChecker from './SwitchChecker';
import SwitchProvider, { switchQuery } from './SwitchProvider';

const switchesData = {
  test_switch_on: true,
  test_switch_off: false,
};

const mocks = [
  {
    request: {
      query: switchQuery,
      variables: {},
    },
    result: {
      data: {
        dashboard: {
          id: 'me',
          switches: switchesData,
        },
      },
    },
  },
];

const mountWithSwitchProvider = (children: JSX.Element) => {
  return renderWithContext(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SwitchProvider>{children}</SwitchProvider>
    </MockedProvider>,
  );
};

describe('SwitchChecker', () => {
  afterEach(cleanup);

  const display = 'SwitchChecker content.';

  it('should render children when switch is on', async () => {
    const { getByText, queryByText } = mountWithSwitchProvider(
      <SwitchChecker switch="test_switch_on">
        <div>{display}</div>
      </SwitchChecker>,
    );

    // Switches have not been loaded.
    expect(queryByText(display)).toBeNull();

    await wait(() => {
      getByText(display);
    });
  });

  it('should not render children when switch is off', async () => {
    const { queryByText } = mountWithSwitchProvider(
      <SwitchChecker switch="test_switch_off">
        <div>{display}</div>
      </SwitchChecker>,
    );

    await wait(() => {
      expect(queryByText(display)).toBeNull();
    });
  });

  it('should render children when switch is off but isNegated is true', async () => {
    const { getByText } = mountWithSwitchProvider(
      <SwitchChecker switch="test_switch_off" isNegated>
        <div>{display}</div>
      </SwitchChecker>,
    );

    await wait(() => {
      getByText(display);
    });
  });

  it('should render children before switches loaded when showBeforeSwitchesLoad is true', async () => {
    const { getByText, queryByText } = mountWithSwitchProvider(
      <SwitchChecker switch="test_switch_off" showBeforeSwitchesLoad>
        <div>{display}</div>
      </SwitchChecker>,
    );

    getByText(display);

    // After switches loaded, display should be off.
    await wait(() => {
      expect(queryByText(display)).toBeNull();
    });
  });
});
