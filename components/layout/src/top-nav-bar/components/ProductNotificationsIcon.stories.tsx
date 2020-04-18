import React, { useEffect, FunctionComponent, ReactElement } from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';

import { Box } from 'zbase';
import { Example } from 'z-frontend-storybook-config';

import ProductNotificationsIcon from './ProductNotificationsIcon';

const responses = {
  nothingNew: {
    count: 0,
    url:
      'https://app.getbeamer.com/news?app_id=piaHWEqe12038&language=en&filterByUrl=false&custom_user_id=1&email=-&firstname=-&lastname=-',
  },
  newNotifications: {
    count: 10,
    url:
      'https://app.getbeamer.com/news?app_id=piaHWEqe12038&language=en&filterByUrl=false&custom_user_id=1&email=-&firstname=-&lastname=-',
  },
};

const beamerSwitchName = 'beamer2_killswitch';

const commonProps = {
  userId: '1',
  switches: {
    [beamerSwitchName]: false,
  },
  isAdmin: false,
};

type WithBeamerResponseProps = {
  payload: {
    count: number;
    url: string;
  };
  children: ReactElement;
};

const WithBeamerResponse: FunctionComponent<WithBeamerResponseProps> = props => {
  fetchMock.restore().get('begin:https://api.getbeamer.com', props.payload);
  useEffect(() => {
    return function cleanup() {
      fetchMock.reset();
    };
  });
  return props.children;
};

storiesOf('layout|ProductNotificationsIcon', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <>
      <Example label="No messages">
        <WithBeamerResponse payload={responses.nothingNew}>
          <ProductNotificationsIcon {...commonProps} />
        </WithBeamerResponse>
      </Example>
      <Example label="New messages">
        <WithBeamerResponse payload={responses.newNotifications}>
          <ProductNotificationsIcon {...commonProps} />
        </WithBeamerResponse>
      </Example>
      <Example label="Error">
        <WithBeamerResponse
          payload={
            {
              status: 403,
              body: null,
            } as any
          }
        >
          <ProductNotificationsIcon {...commonProps} />
        </WithBeamerResponse>
      </Example>
      <Example label="Switched off">
        <WithBeamerResponse payload={responses.newNotifications}>
          <ProductNotificationsIcon {...commonProps} switches={{ [beamerSwitchName]: true }} />
        </WithBeamerResponse>
      </Example>
    </>
  ));
