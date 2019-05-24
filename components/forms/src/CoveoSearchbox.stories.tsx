import React from 'react';
import { storiesOf } from '../.storybook/storyHelpers';

import { Box } from 'zbase';

import CoveoSearchbox from './CoveoSearchbox';

storiesOf('forms|CoveoSearchbox', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <CoveoSearchbox
      organizationId="searchuisamples"
      accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
      redirectUrl="/search"
      initSearchbox
    />
  ))
  .add('open in new tab', () => (
    <CoveoSearchbox
      organizationId="searchuisamples"
      accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
      redirectUrl="/search"
      initSearchbox
      newTab
    />
  ));
