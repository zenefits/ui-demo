import React, { StatelessComponent } from 'react';

import { Button, ButtonBasicProps } from 'z-frontend-forms';
import { Card } from 'z-frontend-layout';
import { styled } from 'z-frontend-theme';
import { Box, Flex, Heading, Icon } from 'zbase';
import { radius, zIndex } from 'z-frontend-theme/utils';

import Dialog from './Dialog';
const Fragment = (React as any).Fragment;

const ModalView = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;
  border-radius: ${radius};
  margin: 0;
  box-shadow: none;
  border: none;
  background: none;
  z-index: ${zIndex('modal')};
`;

const ModalCard = styled(Card)`
  margin-bottom: 0;
`;

const ModalBackdrop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${zIndex('modal')};
`;

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`;

export interface ModalButton extends ButtonBasicProps {
  text: string;
}

export type ModalProps = {
  isVisible: boolean;
  title: string;
  onCancel: () => void;
  keepMounted?: boolean;
  buttons?: ModalButton[];
  omitCancelButton?: boolean;
  controlEl?: HTMLElement;
};

export const Modal: StatelessComponent<ModalProps> = props => (
  <Dialog
    isVisible={props.isVisible}
    keepMounted={props.keepMounted}
    controlEl={props.controlEl}
    render={labelId => (
      <Fragment>
        <ModalBackdrop onClick={props.onCancel} />
        <ModalView w={[1, 1 / 2]} px={[2, 0]}>
          <ModalCard>
            <Card.Header>
              <Flex justify="space-between" align="center">
                <Heading level={4} id={labelId}>
                  {props.title}
                </Heading>
                <ClickableIcon iconName="close" s="medium" color="grayscale.d" onClick={props.onCancel} />
              </Flex>
            </Card.Header>
            <Card.Row>{props.children}</Card.Row>
            <Card.Footer>
              <Flex justify="flex-end">
                {!props.omitCancelButton && (
                  <Button type="button" mode="normal" mr={props.buttons.length > 0 ? 2 : 0} onClick={props.onCancel}>
                    Cancel
                  </Button>
                )}
                {props.buttons.map((button, i) => (
                  <Button
                    key={i}
                    type="button"
                    mode={button.mode ? button.mode : 'primary'}
                    mr={i < props.buttons.length - 1 ? 2 : 0}
                    onClick={button.onClick}
                  >
                    {button.text}
                  </Button>
                ))}
              </Flex>
            </Card.Footer>
          </ModalCard>
        </ModalView>
      </Fragment>
    )}
  />
);

Modal.defaultProps = { buttons: [], keepMounted: false, omitCancelButton: false };

export default Modal;
