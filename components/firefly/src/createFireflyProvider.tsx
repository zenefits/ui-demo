/* tslint:disable:no-param-reassign */
import { Component } from 'react';
// @ts-ignore
import PropTypes from 'prop-types';

import loadScript from './loadScript';

const FIREFLY_URL = 'https://firefly-071591.s3.amazonaws.com/scripts/loaders/loader.js';

declare const window: any;

interface FireflyContextType {
  loadFirefly: () => Promise<{}>;
  startFirefly: () => void;
}

export const FireflyContextPropTypes = {
  loadFirefly: PropTypes.func,
  startFirefly: PropTypes.func,
};

interface FireflyOptions {
  apiKey: '55f713044f3d45d12b000001';
  token: string;
  assetHostUrl: string;
  serverHostUrl: string;
  publishSettingsToS3: true;
  publishStaticContentToS3: true;
  s3HostUrl: string;
}

const defaultFireflyOptions: FireflyOptions = {
  apiKey: '55f713044f3d45d12b000001',
  token: '55f7130457025cd12b0885d5',
  assetHostUrl: 'https://firefly-071591.s3.amazonaws.com',
  serverHostUrl: 'https://usefirefly.com:443',
  publishSettingsToS3: true,
  publishStaticContentToS3: true,
  s3HostUrl: 'https://firefly-071591.s3.amazonaws.com',
};

const createFireflyProvider = (options: FireflyOptions = defaultFireflyOptions) => {
  class FireflyProvider extends Component<{}> {
    constructor(props: {}) {
      super(props);
      this.initializeFireflyApi();

      // This is set to false by AppInit after switches are loaded
      if (typeof window.fireflyKillswitch === 'undefined') {
        window.fireflyKillswitch = true;
      }
    }

    initializeFireflyApi = () => {
      window.fireflyAPI = {};
      const fireflyAPI = window.fireflyAPI;
      fireflyAPI.ready = function(x: Function | Function[]) {
        if (typeof x === 'function') {
          x = [x];
        }
        fireflyAPI.onLoaded = fireflyAPI.onLoaded || [];
        for (let i = 0; i < x.length; i += 1) {
          if (fireflyAPI.isLoaded) {
            x[i]();
          } else {
            fireflyAPI.onLoaded.push(x[i]);
          }
        }
      };
      Object.assign(fireflyAPI, options);
    };

    static childContextTypes = FireflyContextPropTypes;

    getChildContext(): FireflyContextType {
      return {
        loadFirefly: this.loadFirefly,
        startFirefly: this.startFirefly,
      };
    }

    loadFirefly = () => {
      return loadScript(FIREFLY_URL);
    };

    startFirefly = () => {
      const fireflyAPI = window.fireflyAPI;
      fireflyAPI.ready(() => {
        fireflyAPI.set('syncRepScrolling', true);
        fireflyAPI.set(
          'message',
          "You have started co-browsing <br> Please wait a moment for an agent to connect ... <br><br> Your privacy is our priority. The agent can only see what's on this web page. They can't see any other open websites or anything else on your computer.",
        );
        fireflyAPI.start(fireflyAPI.apiKey, (coBrowsingUrl: string) => {
          /*
          We're not pushing links to console for this release
          const pusherEventName = 'support_event';
          if (!__MOCK_MODE__) {
            fetchWrapper('/push_back_firefly_link', {
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify({
                message: coBrowsingUrl,
                event: pusherEventName,
              }),
            });
          }
          */
        });
      });
    };

    render() {
      return this.props.children;
    }
  }

  return FireflyProvider;
};

export default createFireflyProvider;
