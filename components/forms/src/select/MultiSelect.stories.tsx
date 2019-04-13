import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MultiSelect from './MultiSelect';

const optionList = ['Chicken', 'Beef', 'Fish', 'Tofu', 'Dirt and Rocks', 'Vegetables', 'Noodles', 'Broccoli Beef'];

storiesOf('forms|MultiSelect', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('placeholder', () => <PlaceholderExample />)
  .add('with initial values', () => <InitialValuesExample />)
  .add('error', () => <ErrorExample />)
  .add('open', () => <OpenExample />)
  .add('disabled', () => <DisabledExample />);

const PlaceholderExample = () => (
  <MultiSelect<string> name="entrees" label="Entrees" placeholder="Select Entrees" getOptionText={o => o}>
    {({ SelectOption, multiOptionFilter }) =>
      multiOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
    }
  </MultiSelect>
);

const InitialValuesExample = () => (
  <MultiSelect<string> name="entrees" label="Entrees" value={['Tofu', 'Beef']} getOptionText={o => o}>
    {({ SelectOption, multiOptionFilter }) =>
      multiOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
    }
  </MultiSelect>
);

const ErrorExample = () => (
  <MultiSelect<string> name="entrees" label="Entrees" error="There is an error" getOptionText={o => o}>
    {({ SelectOption, multiOptionFilter }) =>
      multiOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
    }
  </MultiSelect>
);

const OpenExample = () => (
  <MultiSelect<string> name="entrees" label="Entrees" autoFocus openOnFocus getOptionText={o => o}>
    {({ SelectOption, multiOptionFilter }) =>
      multiOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
    }
  </MultiSelect>
);

const DisabledExample = () => (
  <MultiSelect<string> name="entrees" label="Entrees" disabled value={['Tofu', 'Beef']} getOptionText={o => o}>
    {({ SelectOption, multiOptionFilter }) =>
      multiOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
    }
  </MultiSelect>
);
