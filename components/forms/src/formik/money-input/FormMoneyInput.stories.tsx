import React from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../../.storybook/storyHelpers';
import DefaultExample from './exampleDefault';
import { Form, FormMoneyInput } from '../../..';

storiesOf('forms|Form.MoneyInput', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('basic money input', DefaultExample)
  .add('display mode', () => <DisplayExample />);

class DisplayExample extends React.Component {
  state = {
    displayOnly: true,
  };

  render() {
    const { displayOnly } = this.state;
    return (
      <Box>
        <Form onSubmit={() => {}} initialValues={{ salary: 175000 }}>
          <Example label="Currency Symbol Prefix">
            <Box mb={2}>
              <FormMoneyInput s="small" name="salary" label="Annual Salary" displayOnly={displayOnly} />
            </Box>
            <Box mb={2}>
              <FormMoneyInput s="medium" name="salary" label="Annual Salary" displayOnly={displayOnly} />
            </Box>
            <Box mb={2}>
              <FormMoneyInput s="large" name="salary" label="Annual Salary" displayOnly={displayOnly} />
            </Box>
          </Example>
        </Form>
        <Button onClick={() => this.setState({ displayOnly: !displayOnly })}>Toggle mode</Button>
      </Box>
    );
  }
}
