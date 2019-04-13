import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import AutocompleteExample from './exampleAutocomplete';
import OptionalFieldsExample from './exampleOptionalFields';
import ValueExample from './exampleValue';
import ValidationExample from './exampleValidation';
import MultipleExample from './exampleMultiple';

storiesOf('forms|Form.AddressUS', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic', DefaultExample)
  .add('autocomplete', AutocompleteExample)
  .add('with value', ValueExample)
  .add('with validation', ValidationExample)
  .add('with name, without line 2', OptionalFieldsExample)
  .add('multiple addresses', MultipleExample);
