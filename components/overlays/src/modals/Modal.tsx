import React, { Component, StatelessComponent } from 'react';
import { forEach } from 'lodash';

import {
  Button,
  ButtonBasicProps,
  CardContainer,
  CardFooter,
  CardHeader,
  CardRow,
  IconButton,
} from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex, Heading } from 'zbase';
import { radius, space, zIndex } from 'z-frontend-theme/utils';

import { ModalDialog as Dialog } from '../dialog/Dialog';

export type ModalProps = {
  isVisible: boolean;
  /** Heading text. */
  title: string;
  /** Action to take when modal is dismissed or explicitly cancelled. */
  onCancel: () => void;
  /** Custom render that replaces default `Modal.Header`. */
  renderHeader?: (labelId?: string) => JSX.Element;
  keepMounted?: boolean;
  controlEl?: HTMLElement;
  /**
   * Should the popover take up the full screen on mobile devices?
   * @default false
   **/
  fullScreenMobile?: boolean; // This should default to true, but we need to make updates to the footer first
} & BoxProps;

const ModalView = styled(Box)<BoxProps & { fullScreenMobile?: boolean }>`
  position: fixed;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 100vh;
  border-radius: ${radius()};
  margin: 0;
  box-shadow: none;
  border: none;
  background: none;
  z-index: ${zIndex('modal')};

  ${props =>
    props.fullScreenMobile
      ? ` @media (max-width: ${props.theme.breakpoints[0]}em) {
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding: ${space(2)({ theme: props.theme })};
    transform: none;
  }`
      : ''};
`;

const ModalCard = styled(CardContainer)`
  margin-bottom: 0;
  min-height: 100%;
`;

const ModalCardWrapper = styled.div<{ fullScreenMobile?: boolean }>`
  max-width: 100vw;
  max-height: calc(100vh - ${space(6)});
  height: 100%;
  overflow: auto;

  ${props =>
    props.fullScreenMobile
      ? ` @media (max-width: ${props.theme.breakpoints[0]}em) {
    max-height: 100vh;
  }`
      : ''};
`;

const ModalBackdrop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${zIndex('modal')};
`;

export interface ModalButton extends ButtonBasicProps {
  text: string;
}

export type ModalFooterActionProps = {
  buttons?: ModalButton[];
  omitCancelButton?: boolean;
  onCancel?: () => void;
};

export type ModalFooterProps = ModalFooterActionProps & BoxProps;

const ModalFooter: StatelessComponent<ModalFooterProps> = ({
  buttons,
  omitCancelButton,
  onCancel,
  children,
  ...rest
}: ModalFooterProps) => (
  <CardFooter {...rest}>
    {buttons ? (
      <Flex justify="flex-end">
        {!omitCancelButton && (
          <Button type="button" mode="normal" mr={buttons.length > 0 ? 3 : 0} onClick={onCancel}>
            Cancel
          </Button>
        )}
        {buttons.map((button, i) => (
          <Button
            key={i}
            type={button.type || 'button'}
            mode={button.mode || 'primary'}
            mr={i < buttons.length - 1 ? 3 : 0}
            onClick={button.onClick}
            inProgress={button.inProgress}
            disabled={button.disabled}
          >
            {button.text}
          </Button>
        ))}
      </Flex>
    ) : (
      children
    )}
  </CardFooter>
);

const STATIC_POSITIONING = 'static';
const FIXED_POSITIONING = 'fixed';

/*
Some ember page wrappers have fixed position, which prevents our modals
from overlaying over the top nav bar due to how stacking contexts works.
This is a hack to temporarily update ember wrapper styles while modal is open.
*/
class EmberZIndexFix extends Component {
  componentDidMount() {
    if (window.__WITHIN_EMBER_APP__) {
      forEach(window.document.getElementsByClassName('grid-frame--dedicated'), (el: HTMLDivElement) => {
        el.style.position = STATIC_POSITIONING;
      });
    }
  }

  componentWillUnmount() {
    if (window.__WITHIN_EMBER_APP__) {
      forEach(window.document.getElementsByClassName('grid-frame--dedicated'), (el: HTMLDivElement) => {
        el.style.position = FIXED_POSITIONING;
      });
    }
  }

  render() {
    return this.props.children;
  }
}

class Modal extends Component<ModalProps> {
  static Header = CardHeader;
  static Body = CardRow;
  static Footer = ModalFooter;
  static Container = ModalView;

  render() {
    const { isVisible, keepMounted, controlEl, onCancel, title, children, fullScreenMobile, ...utilProps } = this.props;
    return (
      <Dialog
        isVisible={isVisible}
        keepMounted={keepMounted}
        controlEl={controlEl}
        label={title}
        render={() => (
          <EmberZIndexFix>
            <ModalBackdrop onClick={onCancel} />
            <ModalView w={[1, 1 / 2]} px={[2, 0]} fullScreenMobile={fullScreenMobile} {...utilProps}>
              <ModalCardWrapper fullScreenMobile={fullScreenMobile}>
                <ModalCard data-testid="ModalCard">
                  {this.props.renderHeader ? (
                    this.props.renderHeader()
                  ) : (
                    <Modal.Header>
                      <Flex justify="space-between" align="center">
                        {/* Heading level 5 matches `headings.s` (consistent with Card.Header) */}
                        <Heading level={5}>{title}</Heading>
                        <IconButton iconName="close" s="medium" color="grayscale.d" onClick={onCancel} />
                      </Flex>
                    </Modal.Header>
                  )}
                  {children}
                </ModalCard>
              </ModalCardWrapper>
            </ModalView>
          </EmberZIndexFix>
        )}
      />
    );
  }
}

export default Modal;
