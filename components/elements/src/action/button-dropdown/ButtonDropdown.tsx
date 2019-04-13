import React, {
  cloneElement,
  Component,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from 'react';
// TODO: use our own popover component
import { Manager, Popper, Target } from 'react-popper';

import { Flex, Icon } from 'zbase';
import { css, styled, theme } from 'z-frontend-theme';
import { color, depth, px, radius, space, zIndex } from 'z-frontend-theme/utils';

import { childItemClassName } from '../button-group/ButtonGroup';
import Button, { ButtonBasicProps, ButtonLinkProps, ButtonRouteLinkProps } from '../button/Button';

const ESC_KEYCODE = 27;

const StyledContainer = styled(Flex)<ContainerProps>`
  min-width: 200px;
  border-radius: ${radius()};
  ${depth(1)};
  overflow: auto;
  max-height: ${props => (props.maxHeight ? px(props.maxHeight) : 'none')};

  > * {
    border-bottom: 1px solid ${color('secondary.b')};
    border-radius: 0;

    &:first-child {
      border-top-left-radius: ${radius()};
      border-top-right-radius: ${radius()};
    }

    &:last-child {
      border-bottom-left-radius: ${radius()};
      border-bottom-right-radius: ${radius()};
      border-bottom-color: transparent;
    }
  }
`;

const itemCss = css`
  background-color: ${color('grayscale.white')};
  justify-content: left;
  text-align: left;
  color: ${color('text.default')};
  height: auto;

  &:focus:not(:disabled),
  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: ${color('tertiary.c')};
    color: ${color('text.dark')};
    box-shadow: none;
  }
`;

const StyledButton = styled(Button)`
  ${itemCss};
`;
class ButtonDropdownItem extends Component<ButtonBasicProps> {
  render() {
    return <StyledButton w={1} {...this.props} />;
  }
}

const StyledLink = styled(Button.Link)`
  ${itemCss};
`;
class ButtonDropdownItemLink extends Component<ButtonBasicProps & ButtonLinkProps> {
  render() {
    return <StyledLink w={1} {...this.props} />;
  }
}

const StyledRouteLink = styled(Button.RouteLink)`
  ${itemCss};
`;
class ButtonDropdownItemRouteLink extends Component<ButtonBasicProps & ButtonRouteLinkProps> {
  render() {
    return <StyledRouteLink w={1} {...this.props} />;
  }
}

interface ButtonDropdownState {
  isVisible: boolean;
}

interface ContainerProps {
  maxHeight?: string | number;
}

interface ButtonDropdownAddedProps {
  /** Custom target. Defaults to `<Icon s="small" iconName="more-vert" />` */
  target?: React.ReactNode;
  /** Modifiers for react-popper. */
  popperModifiers?: Popper.Modifiers;
  /**
   * Placement of the dropdown. See react-popper for details.
   * @default 'bottom-start'
   */
  popperPlacement?: Popper.Placement;
  /**
   * Is the dropdown open by default? This only affects the first render
   * @default false
   */
  openByDefault?: boolean;

  /**
   * Whether the dropdown is open. This will overwrite the state, e.g. setting this to false will prevent the dropdown
   * from showing.
   */
  open?: boolean;

  /**
   * Whether to close popper when clicking on popper
   * @default true
   */
  closeOnPopperClick?: boolean;

  /**
   * Event handler when the target is clicked.
   */
  onTargetClick?: MouseEventHandler<Target>;

  /**
   * Event handler when the user clicks/touches outside of the button and the dropdown.
   */
  onOuterAction?: (e: any) => void;

  /**
   * Event handler when the esc key is pressed.
   */
  onPressEsc?: KeyboardEventHandler;

  /**
   * Constrain the dropdown to a fixed height
   */
  containerProps?: ContainerProps;
}

export type ButtonDropdownProps = ButtonBasicProps & ButtonDropdownAddedProps;

class ButtonDropdown extends Component<ButtonDropdownProps, ButtonDropdownState> {
  targetEl: HTMLElement;
  popperEl: HTMLElement;
  documentEventHandlers: [string, (e: any) => void][];

  static ItemButton = ButtonDropdownItem;
  static ItemLink = ButtonDropdownItemLink;
  static ItemRouteLink = ButtonDropdownItemRouteLink;

  static defaultProps: ButtonDropdownAddedProps = {
    popperModifiers: {
      flip: {
        behavior: ['bottom', 'top'],
      },
      preventOverflow: {
        boundariesElement: 'viewport',
        escapeWithReference: true,
      },
    },
    popperPlacement: 'bottom-start',
    openByDefault: false,
    closeOnPopperClick: true,
  };

  defaultContainerProps = {};

  constructor(props: ButtonDropdownProps) {
    super(props);
    this.state = {
      isVisible: !!props.openByDefault,
    };

    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
      ['keydown', this.onPressEsc],
    ];
  }

  togglePopover = (isVisible?: boolean) => {
    if (this.state.isVisible === isVisible) {
      return;
    }
    this.setState({
      isVisible: isVisible == null ? !this.state.isVisible : isVisible,
    });
  };
  onClick = (e: MouseEvent<any>) => {
    // Stops propagation of opening of the detail panel in a table when it is triggered via clicking
    // on this component inside of a table row
    e.stopPropagation();

    this.togglePopover();
    if (typeof this.props.onTargetClick === 'function') {
      this.props.onTargetClick(e);
    }
  };
  onOuterAction = (e: any) => {
    if (!this.targetEl.contains(e.target) && (!this.popperEl || !this.popperEl.contains(e.target))) {
      this.togglePopover(false);
      if (typeof this.props.onOuterAction === 'function') {
        this.props.onOuterAction(e);
      }
    }
  };
  onPopperClick = (e: MouseEvent<any>) => {
    this.props.closeOnPopperClick && this.togglePopover(false);
  };
  onPressEsc = (e: KeyboardEvent<any>) => {
    if (e.keyCode === ESC_KEYCODE) {
      this.togglePopover(false);
      if (typeof this.props.onPressEsc === 'function') {
        this.props.onPressEsc(e);
      }
    }
  };

  componentWillMount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.addEventListener(eventName, handlerFn);
    });
  }
  componentWillUnmount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.removeEventListener(eventName, handlerFn);
    });
  }

  render() {
    const { children, open, popperModifiers, popperPlacement, ...rest } = this.props;
    const targetProps = {
      ...rest,
      onClick: this.onClick,
      className: childItemClassName,
    };

    const targetContent = this.props.target ? (
      cloneElement(this.props.target as ReactElement<any>, targetProps) // pass onClick etc
    ) : (
      // TODO: default to <IconButton iconSize="medium" iconName="more-vert" />
      // this is not a good default (button has a background etc)
      <Button {...targetProps}>
        <Icon s="small" iconName="more-vert" />
      </Button>
    );

    const isVisible = open === undefined ? this.state.isVisible : open;

    const containerProps = { ...this.defaultContainerProps, ...this.props.containerProps };

    return (
      <Manager>
        <Target
          innerRef={targetEl => {
            this.targetEl = targetEl;
          }}
        >
          {targetContent}
        </Target>
        {isVisible && (
          <Popper
            style={{
              marginTop: space(1)({ theme }),
              marginBottom: space(1)({ theme }),
              zIndex: zIndex('dropdown')({ theme }),
            }}
            modifiers={popperModifiers}
            placement={popperPlacement}
            onClick={this.onPopperClick}
            innerRef={popperEl => {
              this.popperEl = popperEl;
            }}
          >
            <StyledContainer {...containerProps} column>
              {children}
            </StyledContainer>
          </Popper>
        )}
      </Manager>
    );
  }
}

export default ButtonDropdown;
