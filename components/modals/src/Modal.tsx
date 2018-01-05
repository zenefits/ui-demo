import React, { Component } from 'react';
import { Flex, Overlay, Fixed } from 'rebass';
import tabbable from 'tabbable';
import Button, { ButtonBasicProps } from 'z-frontend-forms/src/Button';
import Card from 'z-frontend-cards/src/Card';
import { styled } from 'z-frontend-theme';
import Icon from 'z-frontend-theme/src/Icon';
import { zIndex } from 'z-frontend-theme/src/utils';
import Heading from 'z-frontend-theme/src/Heading';

const ModalView = styled(Overlay)`
  margin: 0;
  box-shadow: none;
  border: none;
  background: none;
  z-index: ${zIndex('modal')};
`;

const ModalCard = styled(Card)`
  margin-bottom: 0;
`;

const ModalBackdrop = styled(Fixed)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${zIndex('modal')};
`;

const CloseIcon: any = styled(Icon).attrs({
  iconName: 'close',
})`
  cursor: pointer;
`;

export interface ModalButton extends ButtonBasicProps {
  text: string;
}

export type ModalProps = {
  isVisible: boolean;
  title: string;
  focusOnClose?: HTMLElement;
  onCancel: () => void;
  buttons?: ModalButton[];
};

class Modal extends Component<ModalProps> {
  static defaultProps = { buttons: [] };
  rootEl: HTMLElement;
  focusableEls: NodeListOf<HTMLElement>;

  componentDidUpdate(prevProps: ModalProps) {
    const TAB_KEYCODE = 9;

    if (this.props.isVisible && !prevProps.isVisible) {
      const focusableEls = tabbable(this.rootEl);
      focusableEls[0].focus();

      this.rootEl.onkeydown = function(e) {
        if (e.keyCode === TAB_KEYCODE) {
          e.preventDefault();
          if (focusableEls.length === 1) {
            return;
          }
          const currentFocusIndex: number = Array.from(focusableEls).indexOf(document.activeElement as HTMLElement);
          const nextFocusIndex: number = (currentFocusIndex + (e.shiftKey ? -1 : 1)) % focusableEls.length;
          focusableEls[nextFocusIndex].focus();
        }
      };
    }

    if (!this.props.isVisible && prevProps.isVisible && this.props.focusOnClose) {
      this.props.focusOnClose.focus();
    }
  }

  render() {
    return (
      <div ref={el => (this.rootEl = el)}>
        {this.props.isVisible && (
          <div>
            <ModalBackdrop onClick={this.props.onCancel} />
            <ModalView w={[1, 1 / 2]} px={[2, 0]} role="dialog">
              <ModalCard>
                <Card.Header>
                  <Flex justify="space-between">
                    <Heading is="h4">{this.props.title}</Heading>
                    <CloseIcon fontSize={2} mr={1} color="grayscale.d" onClick={this.props.onCancel} />
                  </Flex>
                </Card.Header>
                <Card.Row>{this.props.children}</Card.Row>
                <Card.Footer>
                  <Flex justify="flex-end">
                    <Button
                      type="button"
                      mode="normal"
                      mr={this.props.buttons.length > 0 ? 2 : 0}
                      onClick={this.props.onCancel}
                    >
                      Cancel
                    </Button>
                    {this.props.buttons.map((button, i) => (
                      <Button
                        key={i}
                        type="button"
                        mode={button.mode ? button.mode : 'primary'}
                        mr={i < this.props.buttons.length - 1 ? 2 : 0}
                        onClick={button.onClick}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </Flex>
                </Card.Footer>
              </ModalCard>
            </ModalView>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
