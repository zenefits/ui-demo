import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import Signature from './Signature';
import { signatureInitials } from './signatureData';

type SignatureEditState = { disabled: boolean; signature: string };

class SignaturePropChange extends Component<{}, SignatureEditState> {
  state: SignatureEditState = {
    disabled: false,
    signature: null,
  };
  render() {
    const { disabled, signature } = this.state;
    return (
      <Box>
        <Signature
          disabled={disabled}
          defaultSignatureImage={signature}
          onSignatureChange={action('signature-onchange')}
          onSignatureClear={action('signature-onclear')}
          mb={2}
        />
        <Button onClick={() => this.setState({ disabled: !disabled })} mr={2}>
          Disable Signature
        </Button>
        <Button onClick={() => this.setState({ signature: signatureInitials })}>Set Signature</Button>
      </Box>
    );
  }
}

storiesOf('forms|Signature', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Signature />)
  .add('initial signature', () => <Signature defaultSignatureImage={signatureInitials} />)
  .add('initial signature, disabled', () => <Signature defaultSignatureImage={signatureInitials} disabled />)
  .add(
    'fires events',
    () => <Signature onSignatureChange={action('signature-onchange')} onSignatureClear={action('signature-onclear')} />,
    skipVisualTest,
  )
  .add('respects prop changes', () => <SignaturePropChange />)
  .add('util props', () => <Signature width={200} height={150} m={5} />);
