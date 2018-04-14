import React from 'react';

import { PluralText, Text } from '../index';

const count = 10;
export default () => (
  <Text>
    You have {count} <PluralText value={count} one="message" other="messages" />
  </Text>
);
