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
import { Box, BoxProps, Flex, FlexProps, Heading, ResponsiveUtilProp } from 'zbase';
import { color, radius, space, zIndex } from 'z-frontend-theme/utils';

import Dialog from '../dialog/Dialog';

export type ModalSize = 'small' | 'medium' | 'large';

const modalWidthMap: { [m in ModalSize]: number } = {
  small: 568, // 6 columns
  medium: 768, // 8 columns
  large: 1168, // 12 columns
};

export type ModalProps = {
  isVisible: boolean;
  /** Heading text. */
  title: string;
  /** Action to take when modal is dismissed or explicitly cancelled. */
  onCancel: () => void;
  /** Custom render that replaces default `Modal.Header`. */
  renderHeader?: (labelId?: string, headingRef?: React.RefObject<HTMLElement>) => JSX.Element;
  keepMounted?: boolean;
  /** If true will show loading icon on submit button and disable other buttons. */
  isSubmitting?: boolean;
  controlEl?: HTMLElement;
  /**
   * Should the popover take up the full screen on mobile devices?
   * @default false
   * */
  fullScreenMobile?: boolean; // This should default to true, but we need to make updates to the footer first
  /**
   *  If true, clicking on backdrop around modal will close the modal
   * @default false
   */
  shouldCancelOnClickAway?: boolean;
  /** Set a width for the modal. This should be preferred over controlling the width directly. */
  size?: ModalSize;
} & BoxProps;

const ModalView = styled(Box)`
  position: fixed;
  top: ${space(5)};
  bottom: ${space(5)};
  left: ${space(3)};
  right: ${space(3)};

  @media (max-width: ${p => p.theme.breakpoints[0]}em) {
    /* narrower */
    top: ${space(3)};
    bottom: ${space(3)};
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius()};
  margin: 0;
  box-shadow: none;
  border: none;
  background: none;
  z-index: ${zIndex('modal')};
`;

const ModalCard = styled(CardContainer)<{ fullScreenMobile?: boolean }>`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
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

const ModalBody = styled(CardRow)`
  background: ${color('grayscale.white')};
  overflow-y: auto;
  flex-grow: 1; /* push footer to bottom on mobile */
`;

const ClickableBackdropRegion = styled(Box)`
  flex-grow: 1;
`;

export interface ModalButton extends ButtonBasicProps {
  text: string;
}

export type ModalFooterActionProps = {
  buttons?: ModalButton[];
  omitCancelButton?: boolean;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export type ModalFooterProps = ModalFooterActionProps & BoxProps;

const ModalFooter: StatelessComponent<ModalFooterProps> = ({
  buttons,
  omitCancelButton,
  onCancel,
  children,
  isSubmitting,
  ...rest
}: ModalFooterProps) => (
  <CardFooter bg="grayscale.white" {...rest}>
    {buttons ? (
      <Flex justify="flex-end">
        {!omitCancelButton && (
          <Button
            type="button"
            mode="normal"
            mr={buttons.length > 0 ? 3 : 0}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        {buttons.map((button, i) => (
          <Button
            key={button.text}
            type={button.type || 'button'}
            mode={button.mode || 'primary'}
            mr={i < buttons.length - 1 ? 3 : 0}
            onClick={button.onClick}
            inProgress={button.inProgress}
            disabled={button.disabled || isSubmitting}
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

function getSizeProps(w: ResponsiveUtilProp, width: ResponsiveUtilProp, size: ModalSize) {
  const sizeProps = {} as Partial<FlexProps>;
  if (w || width) {
    // these take priority over size
    sizeProps.width = w || width;
  } else if (size) {
    sizeProps.width = modalWidthMap[size];
    sizeProps.maxWidth = 1;
  } else {
    sizeProps.width = [1, 1 / 2];
  }

  return sizeProps;
}

class Modal extends Component<ModalProps> {
  static Header = CardHeader;
  static Body = ModalBody;
  static BodySection = CardRow;
  static Footer = ModalFooter;
  static Container = ModalView;

  render() {
    const {
      isVisible,
      keepMounted,
      controlEl,
      onCancel,
      title,
      children,
      fullScreenMobile,
      isSubmitting,
      shouldCancelOnClickAway,
      w,
      width,
      size,
      ...utilProps
    } = this.props;

    const sizeProps = getSizeProps(w, width, size);
    return (
      <Dialog
        isVisible={isVisible}
        keepMounted={keepMounted}
        controlEl={controlEl}
        label={title}
        render={(labelId, headingRef) => {
          const onClickAway = () => {
            if (shouldCancelOnClickAway) onCancel();
          };

          return (
            <EmberZIndexFix>
              <ModalBackdrop onClick={onClickAway} className="js-walkme-modal" />
              <ModalView>
                <ClickableBackdropRegion onClick={onClickAway} height={1} />
                <Flex {...sizeProps} flex="0 0 auto" height={1} direction="column">
                  <ClickableBackdropRegion onClick={onClickAway} w={1} />
                  <ModalCard data-testid="ModalCard" w={1} {...utilProps}>
                    {this.props.renderHeader ? (
                      this.props.renderHeader(labelId, headingRef)
                    ) : (
                      <Modal.Header
                        actionRender={() => (
                          <IconButton
                            iconName="close"
                            s="small"
                            iconSize="large"
                            color="grayscale.d"
                            onClick={onCancel}
                            disabled={isSubmitting}
                          />
                        )}
                      >
                        {/* Heading level 5 matches `headings.s` (consistent with Card.Header) */}
                        <Heading level={5} elementRef={headingRef} tabIndex={-1}>
                          {title}
                        </Heading>
                      </Modal.Header>
                    )}
                    {children}
                  </ModalCard>
                  <ClickableBackdropRegion onClick={onClickAway} w={1} />
                </Flex>
                <ClickableBackdropRegion onClick={onClickAway} height={1} />
              </ModalView>
            </EmberZIndexFix>
          );
        }}
      />
    );
  }
}

export default Modal;
