import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form } from '../Form';
import FormAddressUS from '../address/FormAddressUS';
import CardExample from './exampleCard';
import HiddenExample from './exampleHidden';

storiesOf('forms|Form.Section', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic', DefaultExample)
  .add('visually hidden heading', HiddenExample)
  .add('in card', CardExample);

function DefaultExample() {
  return (
    <Form onSubmit={() => {}} initialValues={{}}>
      <Form.Section label="Legal Address">
        <FormAddressUS name="address" />
      </Form.Section>
    </Form>
  );
}
