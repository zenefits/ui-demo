import React, { Component } from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { Form, FormPercentageInput } from '../../..';

storiesOf('forms|Form.PercentageInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample />);

class DefaultExample extends Component {
  render() {
    return (
      <Form debug onSubmit={() => {}} initialValues={{ ownershipPercentage: 33.33 }}>
        <FormPercentageInput name="ownershipPercentage" label="Percentage owned" />
      </Form>
    );
  }
}
