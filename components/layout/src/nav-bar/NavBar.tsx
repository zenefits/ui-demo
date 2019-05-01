import React, {
  cloneElement,
  AnchorHTMLAttributes,
  Children,
  Component,
  ComponentType,
  ReactElement,
  StatelessComponent,
} from 'react';
import { NavLink as ReactRouterNavLink, NavLinkProps as ReactRouterNavLinkProps } from 'react-router-dom';

import { css, styled } from 'z-frontend-theme';
import { A, Flex, FlexProps, Icon } from 'zbase';
import { color, fontStyles } from 'z-frontend-theme/utils';

interface NavBarBasicProps {
  /**
   * Controls the orientation of the nav bar: horizontal ('list') or vertical ('side')
   * 'product' is identical to list (exists for historical reasons)
   * @default list
   */
  mode?: 'list' | 'product' | 'side';
  /**
   * Ordered or unordered list.
   * @default ul
   */
  listType?: 'ul' | 'ol';
  /**
   * Show icons?
   * @default false
   */
  includeIcons?: boolean;
  disableActiveIndicator?: boolean;
  indentNestedLists?: boolean;
}
export type NavBarProps = FlexProps & NavBarBasicProps;

// STYLING

const activeClassName = 'active-link';
const completedClassName = 'completed-link';
const disabledClassName = 'disabled-link';
const navLinkStyle = css`
  &:hover {
    opacity: 1;
    color: inherit;
  }

  opacity: ${props => props.theme.opacities[0]};
  cursor: pointer;
  text-decoration: none;
  ${props => (props.fontStyle ? fontStyles(props.fontStyle) : fontStyles('paragraphs.m'))};
  color: inherit;
  ${(props: any) => (props.disabled ? `pointer-events: none; opacity: 0.3;` : '')};
  display: inline-block;
`;

const activeBorderWidth = 2;
const listProductPadding = `${15 - activeBorderWidth}px 0;`;
const sidePadding = `0 ${10 - activeBorderWidth}px;`;

const getBasicBorderStyle = (props: StyledNavBarProps) => {
  if (!props.disableActiveIndicator) {
    return props.mode === 'side'
      ? `border-left: ${activeBorderWidth}px solid transparent;`
      : `border-bottom: ${activeBorderWidth}px solid transparent;`;
  }
};

type StyledNavBarProps = NavBarProps & { wrap?: boolean };

const StyledNavBar = styled<StyledNavBarProps>(({ disableActiveIndicator, ...rest }: StyledNavBarProps) => (
  <Flex {...rest} />
))`
  color: ${color('secondary.a')};
  display: flex;
  align-items: flex-end;

  ul,
  ol {
    list-style: none;
    flex-direction: ${(props: NavBarBasicProps) => (props.mode === 'side' ? 'column' : 'row')};
    margin: 0;
    padding: 0;
  }

  ol {
    list-style-position: inside;
    counter-reset: item;
  }

  li {
    display: ${(props: NavBarBasicProps) => (props.mode === 'side' ? 'list-item' : 'inline-block')};
    position: relative;
  }

  li > * {
    margin: ${(props: NavBarBasicProps) => (props.mode === 'side' ? '8px 0;' : '0 16px;')};
    padding: ${(props: NavBarBasicProps) => (props.mode === 'side' ? sidePadding : listProductPadding)};
    ${props => getBasicBorderStyle(props)};
  }

  ol li > * ::before {
    content: counters(item, '.') '. ';
    counter-increment: item;
    width: 20px;
    display: inline-block;
  }

  ul ul,
  ol ol {
    margin-left: ${(props: NavBarBasicProps) => (props.indentNestedLists ? '20px' : '0')};

    li > * ::before {
      width: auto;
    }
  }

  .${completedClassName} ::before,
  .${disabledClassName} ::before {
    content: '';
  }

  .${activeClassName} {
    opacity: 1;
    display: inline-block;
    border-bottom-color: ${props => (props.mode !== 'side' ? color('primary.a') : '')};
    border-left-color: ${props => (props.mode === 'side' ? color('primary.a') : '')};
  }

  .nav-icon {
    position: absolute;
    left: 12px;
  }
`;

// COMPONENTS
// TODO: extract these to own files (NavLink and RouterNavLink)

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  includeIcons?: boolean;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  fontStyle?: string;
}

const StyledLink = styled(A)`
  ${navLinkStyle};
`;

const StyledRouteLink = styled<NavLinkProps & ReactRouterNavLinkProps>(ReactRouterNavLink).attrs({ activeClassName })`
  ${navLinkStyle};
`;

const NavLink: StatelessComponent<NavLinkProps> = props => <NavLinkBase {...props} LinkComponent={StyledLink} />;

const RouterNavLink: StatelessComponent<NavLinkProps & ReactRouterNavLinkProps> = props => {
  const NavLinkBaseWithProps = NavLinkBase as new () => NavLinkBase<NavLinkProps & ReactRouterNavLinkProps>;
  return <NavLinkBaseWithProps {...props} LinkComponent={StyledRouteLink} />;
};

type NavLinkBaseProps<T> = NavLinkProps & { LinkComponent: ComponentType<T> };

class NavLinkBase<LinkComponentProps extends NavLinkProps> extends Component<NavLinkBaseProps<LinkComponentProps>> {
  render() {
    const { LinkComponent, children, ...rest } = this.props;
    const Link: ComponentType<NavLinkProps> = LinkComponent;
    const iconName = getIconNameFromProps<NavLinkBaseProps<LinkComponentProps>>(this.props);
    const classNames = getNavLinkClassNames<NavLinkBaseProps<LinkComponentProps>>(this.props);
    if (rest.active) {
      classNames.push(activeClassName);
    }
    return (
      <li>
        <Link {...rest} className={classNames.join(' ')}>
          {rest.includeIcons && <Icon iconName={iconName} className="nav-icon" />} {children}
        </Link>
      </li>
    );
  }
}

class NavBar extends Component<NavBarProps> {
  static defaultProps: NavBarBasicProps = {
    mode: 'list',
    listType: 'ul',
    includeIcons: false,
    disableActiveIndicator: false,
    indentNestedLists: true,
  };

  static NavLink = NavLink;
  static RouterNavLink = RouterNavLink;

  render() {
    const { listType, children, includeIcons, ...rest } = this.props;
    let childrenWithProps = children;
    // Only ol has icons
    if (listType === 'ol') {
      childrenWithProps = Children.toArray(children)
        .filter(child => child)
        .map(child =>
          cloneElement(child as ReactElement<any>, {
            includeIcons,
          }),
        );
    }

    return (
      <StyledNavBar {...rest} wrap>
        {listType === 'ul' ? <ul>{childrenWithProps}</ul> : <ol>{childrenWithProps}</ol>}
      </StyledNavBar>
    );
  }
}

function getIconNameFromProps<T extends NavLinkProps>(props: T) {
  if (props.includeIcons) {
    if (props.disabled) {
      return 'lock-outline';
    } else if (props.completed) {
      return 'check';
    }
  }
}

function getNavLinkClassNames<T extends NavLinkProps>(props: T) {
  const classNames = [];
  if (props.completed) {
    classNames.push(completedClassName);
  }
  if (props.disabled) {
    classNames.push(disabledClassName);
  }
  return classNames;
}

export default NavBar;
