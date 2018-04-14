import React, { cloneElement, Component, ReactElement } from 'react';
// TODO: use our own popover component
import { Manager, Popper, Target } from 'react-popper';

import { Flex, Icon } from 'zbase';
import { css, styled, withTheme } from 'z-frontend-theme';
import { color, radius, space, zIndex } from 'z-frontend-theme/utils';

import { childItemClassName } from './ButtonGroup';
import Button, { ButtonBasicProps, ButtonLinkProps, ButtonRouteLinkProps } from './Button';

const ESC_KEYCODE = 27;

const StyledContainer = styled(Flex)`
  min-width: 200px;
  border: 1px solid ${color('secondary.b')};
  border-radius: ${radius};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

  > * {
    border-bottom: 1px solid ${color('secondary.b')};
    border-radius: 0;

    &:first-child {
      border-top-left-radius: ${radius};
      border-top-right-radius: ${radius};
    }

    &:last-child {
      border-bottom-left-radius: ${radius};
      border-bottom-right-radius: ${radius};
      border-bottom-color: transparent;
    }
  }
`;

interface State {
  isVisible: boolean;
}

interface Props {
  target?: React.ReactNode;
  popperModifiers?: Popper.Modifiers;
  popperPlacement?: Popper.Placement;
}

class ButtonDropdownComponent extends Component<ButtonBasicProps & Props, State> {
  targetEl: HTMLElement;
  popperEl: HTMLElement;
  documentEventHandlers: [string, (any) => void][];

  public static defaultProps: Props = {
    popperModifiers: {
      flip: {
        behavior: ['bottom', 'top'],
      },
      preventOverflow: {
        boundariesElement: 'viewport',
      },
    },
    popperPlacement: 'bottom-start',
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
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
  onClick = e => {
    // Stops propagation of opening of the detail panel in a table when it is triggered via clicking
    // on this component inside of a table row
    e.stopPropagation();

    this.togglePopover();
  };
  onOuterAction = e => {
    if (!this.targetEl.contains(e.target) && (!this.popperEl || !this.popperEl.contains(e.target))) {
      this.togglePopover(false);
    }
  };
  onPopperClick = e => {
    this.togglePopover(false);
  };
  onPressEsc = e => {
    if (e.keyCode === ESC_KEYCODE) {
      this.togglePopover(false);
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
    const { children, popperModifiers, popperPlacement, ...rest } = this.props;
    const targetProps = {
      ...rest,
      onClick: this.onClick,
      className: childItemClassName,
    };

    const targetContent = this.props.target ? (
      cloneElement(this.props.target as ReactElement<any>, targetProps) // pass onClick etc
    ) : (
      <Button {...targetProps}>
        <Icon s="small" iconName="more-vert" />
      </Button>
    );

    return (
      <Manager>
        <Target
          innerRef={targetEl => {
            this.targetEl = targetEl;
          }}
        >
          {targetContent}
        </Target>
        {this.state.isVisible && (
          <Popper
            style={{
              marginTop: space(1)(this.props),
              marginBottom: space(1)(this.props),
              zIndex: zIndex('dropdown')(this.props),
            }}
            modifiers={popperModifiers}
            placement={popperPlacement}
            onClick={this.onPopperClick}
            innerRef={popperEl => {
              this.popperEl = popperEl;
            }}
          >
            <StyledContainer column>{children}</StyledContainer>
          </Popper>
        )}
      </Manager>
    );
  }
}

const itemCss = css`
  background-color: ${color('grayscale.g')};
  text-align: left;

  &:focus,
  &:hover {
    background-color: ${color('tertiary.c')};

    &,
    * {
      color: ${color('link.hover')};
    }
  }

  &:active {
    box-shadow: none;
    background-color: ${color('tertiary.c')};

    &,
    * {
      color: ${color('link.active')};
    }
  }
`;

type ComponentType<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
type DefaultItemComponentProps = ButtonBasicProps | ButtonLinkProps | ButtonRouteLinkProps;

function styledItemHoc<P extends DefaultItemComponentProps>(ItemComponent: ComponentType<P>) {
  class ButtonDropdownItem extends Component<P> {
    render() {
      return (
        <ItemComponent {...this.props} w="100%" fontSize__deprecated__doNotUse={1}>
          {this.props.children}
        </ItemComponent>
      );
    }
  }
  return ButtonDropdownItem;
}

const ButtonDropdownItem = styledItemHoc(
  styled(Button)`
    ${itemCss};
  `,
);

export const ButtonDropdownItemLink = styledItemHoc(
  styled(Button.Link)`
    ${itemCss};
  `,
);

const ButtonDropdownItemRouteLink = styledItemHoc(
  styled(Button.RouteLink)`
    ${itemCss};
  `,
);

declare type ButtonDropdown = typeof ButtonDropdownComponent & {
  ItemButton: typeof ButtonDropdownItem;
  ItemLink: typeof ButtonDropdownItemLink;
  ItemRouteLink: typeof ButtonDropdownItemRouteLink;
};

const ButtonDropdown = withTheme(ButtonDropdownComponent) as ButtonDropdown;
ButtonDropdown.ItemButton = ButtonDropdownItem;
ButtonDropdown.ItemLink = ButtonDropdownItemLink;
ButtonDropdown.ItemRouteLink = ButtonDropdownItemRouteLink;

export default ButtonDropdown;
