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

import { buildMediaQueries, css, styled, Hide, Render } from 'z-frontend-theme';
import { A, Box, Flex, FlexProps, Icon } from 'zbase';
import { color, fontStyles } from 'z-frontend-theme/utils';
import { BaseDropdownStyleBox, ButtonDropdown, EmberLinkProps, EmberRouteLink } from 'z-frontend-elements';

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
  /**
   * Disable the orange bar that indicates which tab is currently selected.
   * @default false
   */
  disableActiveIndicator?: boolean;
  /**
   * Applies to side NavBar: should nested NavBars be indented to show a hierarchy?
   * @default true
   */
  indentNestedLists?: boolean;
  /**
   * Whether the navbar should collapse into a dropdown on mobile browsers (based on breakpoints).
   * Note that for best results the children of the NavBar should be NavLinks or RouterNavLinks.
   * If you have other children, consider setting this prop to false to make sure they display correctly.
   * Note that if mode is 'side' this setting will be ignored and mobile NavBar will not be used.
   * @default true
   */
  useMobileDropdown?: boolean;
}
export type NavBarProps = FlexProps & NavBarBasicProps;

// STYLING

const device = {
  mobile: buildMediaQueries()[0],
};

const activeClassName = 'active-link';
const completedClassName = 'completed-link';
const disabledClassName = 'disabled-link';
const navLinkStyle = css`
  &:hover {
    opacity: 1;
    color: inherit;
  }

  opacity: 0.7; /* Be careful lowering this. Needs to meet WCAG 2 contrast ratio requirements */
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: none;
  ${(props: NavLinkProps) => (props.fontStyle ? fontStyles(props.fontStyle) : fontStyles('paragraphs.m'))};
  color: inherit;
  ${(props: NavLinkProps) => (props.disabled ? `pointer-events: none; opacity: 0.3;` : '')};
  display: inline-block;
`;
const mediaQuery = css`
  @media ${device.mobile} {
    li a {
      display: none;
      margin-right: 7px;
    }

    li a .${activeClassName} {
      display: block;
    }
  }
`;

// TODO: use box-shadow to avoid this padding math
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

const StyledNavBar = styled(({ disableActiveIndicator, ...rest }: StyledNavBarProps) => <Flex {...rest} />)<
  StyledNavBarProps
>`
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

  ${(props: NavBarBasicProps) => (props.useMobileDropdown && props.mode !== 'side' ? mediaQuery : '')}
`;

const RawNavItem = styled(Box)`
  ${BaseDropdownStyleBox} {
    li {
      display: block;
    }

    li a {
      display: block;
      margin: 0;
      padding: 10px;
      border-bottom: none;
    }
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
  as?: string; // TODO: use styled-component type
}

const StyledLink = styled(A)<NavLinkProps>`
  ${navLinkStyle};
`;

const StyledRouteLink = styled(ReactRouterNavLink).attrs({ activeClassName })<NavLinkProps & ReactRouterNavLinkProps>`
  ${navLinkStyle};
`;

/* eslint-disable-next-line zenefits-custom-rules/no-nested-styled-components-ampersand */
const StyledEmberRouteLink = styled(EmberRouteLink)<NavLinkProps & ReactRouterNavLinkProps>`
  &&& {
    color: ${color('secondary.a')};
  }
  ${navLinkStyle};
`;

const NavLink: StatelessComponent<NavLinkProps> = props => (
  <NavLinkBase {...props} LinkComponent={StyledLink as ComponentType<NavLinkProps>} />
);

const RouterNavLink: StatelessComponent<NavLinkProps & ReactRouterNavLinkProps> = props => {
  const NavLinkBaseWithProps = NavLinkBase as new () => NavLinkBase<NavLinkProps & ReactRouterNavLinkProps>;
  return <NavLinkBaseWithProps {...props} LinkComponent={StyledRouteLink} />;
};

const EmberRouterNavLink: StatelessComponent<NavLinkProps & EmberLinkProps> = props => {
  const NavLinkBaseWithProps = NavLinkBase as new () => NavLinkBase<EmberLinkProps & ReactRouterNavLinkProps>;
  return <NavLinkBaseWithProps {...props} LinkComponent={StyledEmberRouteLink} />;
};

type NavLinkBaseProps<T> = NavLinkProps & { LinkComponent: ComponentType<T> };

const StyledListItem = styled.li`
  /*
   * This is to overwrite the below CSS rule in Ember which shows a check mark for every li.
   * https://github.com/zenefits/yourPeople3/blob/master/component-library/addon/styles/v1/_style.scss#L654
   */
  background: none;
`;

class NavLinkBase<LinkComponentProps extends NavLinkProps> extends Component<NavLinkBaseProps<LinkComponentProps>> {
  render() {
    const { LinkComponent, children, active, ...rest } = this.props;
    const Link: ComponentType<NavLinkProps> = LinkComponent;
    const iconName = getIconNameFromProps<NavLinkBaseProps<LinkComponentProps>>(this.props);
    const classNames = getNavLinkClassNames<NavLinkBaseProps<LinkComponentProps>>(this.props);
    if (active) {
      classNames.push(activeClassName);
    }
    return (
      <StyledListItem>
        <Link {...rest} className={classNames.join(' ')}>
          {rest.includeIcons && <Icon iconName={iconName} className="nav-icon" />} {children}
        </Link>
      </StyledListItem>
    );
  }
}

const NavLinks: StatelessComponent<NavBarProps & { withCaret?: boolean; disableClick?: boolean }> = props => {
  const { listType, children, includeIcons, withCaret, onClick, className, disableClick } = props;
  let childrenWithProps = children;

  childrenWithProps = Children.toArray(children)
    .filter(child => child)
    .map(child =>
      cloneElement(child as ReactElement<any>, {
        ...(listType === 'ol' && { includeIcons }), // Only ol has icons
        style: disableClick ? { pointerEvents: 'none' } : undefined,
        'data-testid': 'NavBarLink',
      }),
    );

  const ListTag = listType;
  return (
    <ListTag onClick={onClick as any} className={className}>
      {childrenWithProps}
      {withCaret && <Icon iconName="caret-down" />}
    </ListTag>
  );
};

const MobileDropdownNavBar: StatelessComponent<NavBarProps> = props => {
  const { children } = props;
  return (
    <>
      <Hide forBreakpoints={[true]}>{<NavLinks {...props} />}</Hide>
      <Render forBreakpoints={[true]}>
        <ButtonDropdown target={<NavLinks {...props} withCaret disableClick />}>
          {Children.toArray(children).map((child, idx) => (
            <RawNavItem key={child}>
              <ButtonDropdown.RawItem>{child}</ButtonDropdown.RawItem>
            </RawNavItem>
          ))}
        </ButtonDropdown>
      </Render>
    </>
  );
};

class NavBar extends Component<NavBarProps> {
  static defaultProps: NavBarBasicProps = {
    mode: 'list',
    listType: 'ul',
    includeIcons: false,
    disableActiveIndicator: false,
    indentNestedLists: true,
    useMobileDropdown: true,
  };

  static NavLink = NavLink;
  static RouterNavLink = RouterNavLink;
  static EmberRouterNavLink = EmberRouterNavLink;

  render() {
    const { listType, children, includeIcons, useMobileDropdown, ...rest } = this.props;

    // do not support mobile dropdown when using side navbar
    const mobileDropdownNavBarSupported = useMobileDropdown && this.props.mode !== 'side';
    return (
      <StyledNavBar useMobileDropdown={useMobileDropdown} {...rest} wrap>
        {mobileDropdownNavBarSupported ? <MobileDropdownNavBar {...this.props} /> : <NavLinks {...this.props} />}
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
  const classNames = props.className ? [props.className] : [];
  if (props.completed) {
    classNames.push(completedClassName);
  }
  if (props.disabled) {
    classNames.push(disabledClassName);
  }
  return classNames;
}

export default NavBar;
