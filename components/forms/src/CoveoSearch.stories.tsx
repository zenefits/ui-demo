import React from 'react';
import { storiesOf } from '../.storybook/storyHelpers';

import { Box } from 'zbase';

import CoveoSearch from './CoveoSearch';

storiesOf('forms|CoveoSearch', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <CoveoSearch organizationId="searchuisamples" accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457" />);
