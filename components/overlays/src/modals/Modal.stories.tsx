import React, { StatelessComponent } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box, Flex, Heading, TextBlock, TextInline } from 'zbase';
import { Button } from 'z-frontend-elements';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import Popover from '../popover/Popover';
import { DialogManager, DialogProps } from '../dialog/DialogManager';
import Modal from './Modal';
import BasicModalExample from './exampleBasic';
import DialogsManager from '../dialog/DialogsManager';

storiesOf('overlays|Modal', module)
  .addDecorator(withViewport())
  .add('default', BasicModalExample)
  .add('sizes', () => <ModalSizes />)
  .add('large modal', () => <LargeModalExample />)
  .add('buttons footer', () => <ButtonFooterModalExample />)
  .add('custom footer', () => <CustomFooterModalExample />)
  .add(
    'full screen mobile',
    () => <FullScreenMobileExample>Basic Modal Content</FullScreenMobileExample>,
    setViewports([0]),
  )
  .add(
    'full screen mobile (scrolling)',
    () => (
      <FullScreenMobileExample>
        {Array.from(Array(20).keys()).map(value => (
          <SampleParagraph key={value} />
        ))}
      </FullScreenMobileExample>
    ),
    setViewports([0]),
  )
  .add('with overflowing popover', () => <WithOverflowingPopover />)
  .add('scrolling', () => <ScrollingExample />)
  .add('body with sections', () => <SectionedBody />)
  .add('submission in progress', () => <SubmissionInProgress />);

export const SampleParagraph = () => (
  <TextBlock mb={3}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </TextBlock>
);

function makeModalProps(dialog: DialogProps) {
  return {
    isVisible: dialog.isVisible,
    controlEl: dialog.controlEl,
    title: 'Submit claim',
    onCancel: dialog.close,
  };
}

const ModalSizes: StatelessComponent = () => (
  <>
    <DialogsManager
      openByDefault={[true, false, false, false]}
      dialogsCount={4}
      render={([smallDialog, mediumDialog, largeDialog, customDialog]) => {
        return (
          <>
            <Example label="Small">
              <Modal {...makeModalProps(smallDialog)} size="small">
                <Modal.Body>
                  <SampleParagraph />
                </Modal.Body>
              </Modal>
              <Button onClick={smallDialog.open}>Show small modal</Button>
            </Example>
            <Example label="Medium">
              <Modal {...makeModalProps(mediumDialog)} size="medium">
                <Modal.Body>
                  <SampleParagraph />
                </Modal.Body>
              </Modal>
              <Button onClick={mediumDialog.open}>Show medium modal</Button>
            </Example>
            <Example label="Large">
              <Modal {...makeModalProps(largeDialog)} size="large">
                <Modal.Body>
                  <SampleParagraph />
                </Modal.Body>
              </Modal>
              <Button onClick={largeDialog.open}>Show large modal</Button>
            </Example>
            <Example label="Custom width">
              <Modal {...makeModalProps(customDialog)} width={[1, 2 / 3]} size="large">
                <Modal.Body>
                  <SampleParagraph />
                </Modal.Body>
              </Modal>
              <Button onClick={customDialog.open}>Show custom modal</Button>
            </Example>
          </>
        );
      }}
    />
  </>
);

const LargeModalExample: StatelessComponent = () => (
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
          <Modal {...modalProps} size="large">
            <Modal.Body>
              <>
                <SampleParagraph />
                <SampleParagraph />
                <SampleParagraph />
              </>
            </Modal.Body>
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

const FullScreenMobileExample: StatelessComponent = props => (
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
            <Modal.Body>{props.children}</Modal.Body>
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
                  <SampleParagraph />
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
        title: 'Long content',
        onCancel: close,
      };
      const footerProps = {
        buttons: [{ text: 'Action 1' }],
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>
              <>
                {Array.from(Array(20).keys()).map(value => (
                  <SampleParagraph key={value} />
                ))}
              </>
            </Modal.Body>
            <Modal.Footer {...footerProps} />
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const SectionedBody: StatelessComponent = () => (
  <DialogManager
    openByDefault
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Long content',
        onCancel: close,
      };
      const footerProps = {
        buttons: [{ text: 'Action 1' }],
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body p={0}>
              <Modal.BodySection>Section 1</Modal.BodySection>
              <Modal.BodySection>Section 2</Modal.BodySection>
              <Modal.BodySection>Section 3</Modal.BodySection>
            </Modal.Body>
            <Modal.Footer {...footerProps} />
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);

const SubmissionInProgress: StatelessComponent = () => (
  <DialogManager
    openByDefault
    render={({ open, close, isVisible, controlEl }) => {
      const footerProps = {
        isSubmitting: true,
        buttons: [{ text: 'Action 1' }, { text: 'Action 2', inProgress: true }],
      };

      return (
        <Modal isVisible title="Submitting" onCancel={() => {}} isSubmitting>
          <Modal.Body p={0}>
            <Modal.BodySection>Section 1</Modal.BodySection>
            <Modal.BodySection>Section 2</Modal.BodySection>
            <Modal.BodySection>Section 3</Modal.BodySection>
          </Modal.Body>
          <Modal.Footer {...footerProps} />
        </Modal>
      );
    }}
  />
);
