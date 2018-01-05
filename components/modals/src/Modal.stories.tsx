import React, { Component } from 'react';
import { Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';
import Button from 'z-frontend-forms/src/Button';

class ModalForm extends Component<{}, { showModal: boolean }> {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  showModal = e => {
    this.setState({ showModal: true });
  };

  render() {
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired') },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
      onCancel: () => this.setState({ showModal: false }),
    };

    return (
      <Box>
        <Modal {...modalProps} isVisible={this.state.showModal}>
          Modal Content
        </Modal>
        <Button onClick={this.showModal}>Show modal</Button>
      </Box>
    );
  }
}

storiesOf('Modal', module).add('default', () => <ModalForm />);
