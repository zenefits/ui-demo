import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ConnectionManager from '../../src/ConnectionManager';
import { NavigatorInterface } from '../../src/windowTypes';
import ConnectionErrorBanner, { DEFAULT_LOST_CONNECTION_MESSAGE } from '../../src/ConnectionErrorBanner';

describe('ConnectionErrorBanner', () => {
  let registeredNetworkChangeCallback: () => void;

  const fireFakeConnectEvent = (navigator: NavigatorInterface) => {
    // eslint-disable-next-line compat/compat
    navigator.connection.rtt = 1;
    registeredNetworkChangeCallback();
  };

  const fireFakeDisconnectEvent = (navigator: NavigatorInterface) => {
    // eslint-disable-next-line compat/compat
    navigator.connection.rtt = 0;
    registeredNetworkChangeCallback();
  };

  const mockNavigator = () => ({
    connection: {
      addEventListener: (e, callback) => {
        registeredNetworkChangeCallback = callback;
      },
    },
  });

  it('Toggles ConnectionErrorBanner on network connection events', () => {
    const mockedNavigator = mockNavigator();

    mount(
      <ConnectionManager navigator={mockedNavigator}>
        Content loaded
        <ConnectionErrorBanner />
      </ConnectionManager>,
    );

    cy.findByText('Content loaded').then(() => {
      fireFakeDisconnectEvent(mockedNavigator);
      cy.findByText(DEFAULT_LOST_CONNECTION_MESSAGE).then(() => {
        fireFakeConnectEvent(mockedNavigator);
        cy.queryByText(DEFAULT_LOST_CONNECTION_MESSAGE).should('not.exist');
      });
    });
  });

  it('Toggles ConnectionErrorBanner on and off based on fetch results', () => {
    const pendingFetchCalls = [];
    const stubbedFetch = () =>
      new Promise((resolve, reject) => {
        pendingFetchCalls.push({ resolve, reject });
      });
    const resolveNextFetch = response => {
      pendingFetchCalls.pop().resolve(response);
    };
    const rejectNextFetch = () => {
      pendingFetchCalls.pop().reject();
    };
    cy.stub(window, 'fetch', stubbedFetch);

    let setIntervalCallback;
    cy.stub(window, 'setInterval', callback => {
      setIntervalCallback = callback;
    });

    mount(
      <ConnectionManager navigator={{}}>
        Content loaded
        <ConnectionErrorBanner />
      </ConnectionManager>,
    );

    cy.findByText('Content loaded').then(() => {
      setIntervalCallback();
      rejectNextFetch();
      cy.findByText(DEFAULT_LOST_CONNECTION_MESSAGE).then(() => {
        setIntervalCallback();
        resolveNextFetch({
          ok: true,
        });
        cy.findByText(DEFAULT_LOST_CONNECTION_MESSAGE).should('not.exist');
      });
    });
  });

  describe('handle navigator object variation robustly ', () => {
    it('handles null navigator object', () => {
      mount(
        <ConnectionManager navigator={null as any}>
          Content loaded
          <ConnectionErrorBanner />
        </ConnectionManager>,
      );
      cy.findByText('Content loaded');
      cy.queryByText(DEFAULT_LOST_CONNECTION_MESSAGE).should('not.exist');
    });

    it('handles null connection object', () => {
      mount(
        <ConnectionManager navigator={{ connection: null }}>
          Content loaded
          <ConnectionErrorBanner />
        </ConnectionManager>,
      );
      cy.findByText('Content loaded');
      cy.queryByText(DEFAULT_LOST_CONNECTION_MESSAGE).should('not.exist');
    });
  });
});
