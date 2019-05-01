import React, { StatelessComponent } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box, Flex, Heading, TextBlock, TextInline } from 'zbase';
import { Button } from 'z-frontend-elements';
import { setViewports } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import Popover from '../popover/Popover';
import { DialogManager } from '../dialog/DialogManager';
import Modal from './Modal';
import BasicModalExample from './exampleBasic';

const CustomWidthModalExample: StatelessComponent = () => (
  <DialogManager
    openByDefault // for visual regression testing
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
        w: [1, 2 / 3],
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Basic Modal Content</Modal.Body>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const CustomHeaderModalExample: StatelessComponent = () => (
  <DialogManager
    openByDefault // for visual regression testing
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
        renderHeader: () => <Modal.Header bg="grayscale.e">I am a custom Header</Modal.Header>,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Simple Modal Content</Modal.Body>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const ButtonFooterModalExample: StatelessComponent = () => (
  <DialogManager
    openByDefault // for visual regression testing
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
      };

      const footerProps = {
        buttons: [
          { text: 'Action 1', onClick: action('Action 1 fired') },
          { text: 'Action 2', onClick: action('Action 2 fired') },
        ],
        onCancel: close,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Simple Modal Body</Modal.Body>
            <Modal.Footer {...footerProps} />
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const CustomFooterModalExample: StatelessComponent = () => (
  <DialogManager
    openByDefault // for visual regression testing
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Simple Modal Body</Modal.Body>
            <Modal.Footer>
              <Flex>
                <Box flex="0 0">
                  <Button mode="transparent" onClick={action('Action 1')}>
                    <TextInline whiteSpace="nowrap">Action 1</TextInline>
                  </Button>
                </Box>
                <Flex justify="flex-end" flex="1 0">
                  <Button mr={2} onClick={modalProps.onCancel}>
                    Cancel
                  </Button>
                  <Button mode="primary" onClick={action('Action 2')}>
                    Action 2
                  </Button>
                </Flex>
              </Flex>
            </Modal.Footer>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const FullScreenMobileExample: StatelessComponent = () => (
  <DialogManager
    openByDefault // for visual regression testing
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
        fullScreenMobile: true,
      };
      const footerProps = {
        buttons: [{ text: 'Action 1', onClick: action('Action 1 fired') }],
        onCancel: close,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Basic Modal Content</Modal.Body>
            <Modal.Footer {...footerProps} />
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

// Test that a popover which extends beyond the Modal will not get clipped
const WithOverflowingPopover: StatelessComponent = () => (
  <DialogManager
    openByDefault
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>
              <Popover
                event="click"
                showPopover
                targetBody={
                  <Box p={10} bg="grayscale.c" color="grayscale.white" w="auto">
                    Click to show
                  </Box>
                }
              >
                <Box w={200} p={2}>
                  <Heading level={3}>Long content</Heading>
                  <TextBlock>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </TextBlock>
                </Box>
              </Popover>
            </Modal.Body>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const ScrollingExample: StatelessComponent = () => (
  <DialogManager
    openByDefault
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
        w: 1 / 2,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>
              <Heading level={3}>Long content</Heading>
              <TextBlock>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </TextBlock>
              <TextBlock>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
                vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
                qui dolorem eum fugiat quo voluptas nulla pariatur?
              </TextBlock>
              <TextBlock>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
                vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
                qui dolorem eum fugiat quo voluptas nulla pariatur?
              </TextBlock>
            </Modal.Body>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

storiesOf('overlays|Modal', module)
  .addDecorator(withViewport())
  .add('default', BasicModalExample)
  .add('custom width', () => <CustomWidthModalExample />)
  .add('custom header', () => <CustomHeaderModalExample />)
  .add('buttons footer', () => <ButtonFooterModalExample />)
  .add('custom footer', () => <CustomFooterModalExample />)
  .add('full screen mobile', () => <FullScreenMobileExample />, setViewports([0]))
  .add('with overflowing popover', () => <WithOverflowingPopover />)
  .add('scrolling', () => <ScrollingExample />);
