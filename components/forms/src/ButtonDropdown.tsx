import React, { Component } from 'react';
import { Manager, Target, Popper } from 'react-popper';
import { Flex } from 'rebass';
import { px } from 'rebass/dist/util';
import { styled, css, theme } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/src/utils';
import { RebassOnlyProps } from 'z-rebass-types';

import { childItemClassName } from './ButtonGroup';
import Icon from 'z-frontend-theme/src/Icon';
import Button, { ButtonBasicProps } from './Button';

const ESC_KEYCODE = 27;

const InlineManager = styled(Manager)`
  display: inline-block;
`;

const StyledContainer = styled(Flex)`
  min-width: 200px;
  border: 1px solid ${color('secondary.b')};
  border-radius: ${props => px(props.theme.radius)};
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  > * {
    border-bottom: 1px solid ${color('secondary.b')};
    border-radius: 0px;
    &:first-child {
      border-top-left-radius: ${props => px(props.theme.radius)};
      border-top-right-radius: ${props => px(props.theme.radius)};
    }
    &:last-child {
      border-bottom-left-radius: ${props => px(props.theme.radius)};
      border-bottom-right-radius: ${props => px(props.theme.radius)};
      border-bottom-color: transparent;
    }
  }
` as Flex;

interface State {
  isVisible: boolean;
}

interface Props {
  buttonBody?: React.ReactNode;
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
    e.preventDefault();
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
    const buttonBody = this.props.buttonBody || <Icon fontSize={1} iconName="more-vert" />;

    return (
      <InlineManager>
        <Target
          innerRef={targetEl => {
            this.targetEl = targetEl;
          }}
        >
          <Button {...this.props} onClick={this.onClick} className={childItemClassName}>
            {buttonBody}
          </Button>
        </Target>
        {this.state.isVisible && (
          <Popper
            style={{
              marginTop: px(theme.space[1]),
              marginBottom: px(theme.space[1]),
              zIndex: theme.zIndex.dropdown,
            }}
            modifiers={this.props.popperModifiers}
            placement={this.props.popperPlacement}
            onClick={this.onPopperClick}
            innerRef={popperEl => {
              this.popperEl = popperEl;
            }}
          >
            <StyledContainer column>{this.props.children}</StyledContainer>
          </Popper>
        )}
      </InlineManager>
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
type ClickableHtmlElAttrs =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>;
type DefaultItemComponentProps = RebassOnlyProps & ClickableHtmlElAttrs;

function styledItemHoc<P extends DefaultItemComponentProps>(ItemComponent: ComponentType<P>) {
  class ButtonDropdownItem extends Component<P> {
    render() {
      return (
        <ItemComponent {...this.props} w="100%" fontSize={1}>
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

const ButtonDropdown = ButtonDropdownComponent as ButtonDropdown;
ButtonDropdown.ItemButton = ButtonDropdownItem;
ButtonDropdown.ItemLink = ButtonDropdownItemLink;
ButtonDropdown.ItemRouteLink = ButtonDropdownItemRouteLink;

export default ButtonDropdown;
