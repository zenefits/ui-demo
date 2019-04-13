import React, { Component } from 'react';
import { ObjectOmit } from 'typelevel-ts';

import { CardContainer } from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';
import { depth, zIndex } from 'z-frontend-theme/utils';

import { PopoverProps } from './Popover';
import Modal from '../modals/Modal';
import { ModalDialog as Dialog } from '../dialog/Dialog';

type PopoverModalOwnProps = {
  isVisible?: boolean;
  onCancel: () => void;
};

const Container = styled(CardContainer)`
  margin-bottom: 0;
  height: 100%;
  ${depth(2)};
  z-index: ${zIndex('modal')};
`;

export default class PopoverModal extends Component<
  PopoverModalOwnProps & ObjectOmit<PopoverProps, 'children' | 'event'>
> {
  render() {
    const { isVisible, children, title } = this.props;
    return (
      <Dialog
        isVisible={isVisible}
        label={title}
        render={() => (
          <Modal.Container fullScreenMobile w={1} px={3}>
            <Container>{children}</Container>
          </Modal.Container>
        )}
      />
    );
  }
}
