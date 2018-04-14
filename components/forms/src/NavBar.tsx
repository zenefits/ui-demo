import React, { cloneElement, Children, Component, ReactElement } from 'react';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';

import { css, styled } from 'z-frontend-theme';
import { Flex, FlexProps, Icon } from 'zbase';
import { color, fontStyles } from 'z-frontend-theme/utils';

interface NavBarBasicProps {
  mode?: 'list' | 'product' | 'side';
  listType?: 'ul' | 'ol';
  includeIcons?: boolean;
  disableActiveIndicator?: boolean;
}
export declare type NavBarProps = FlexProps & NavBarBasicProps;

// STYLING
const colorSpecMap = {
  list: 'grayscale.b',
  product: 'grayscale.b',
  side: 'grayscale.b',
};

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
  color: inherit;
  ${props => (props.fontStyle ? fontStyles(props.fontStyle) : fontStyles('paragraphs.m'))};
  ${(props: any) => (props.disabled ? `pointer-events: none; opacity: 0.3;` : '')};
  display: inline-block;
`;

const activeBorderWidth = 2;
const listProductPadding = `${15 - activeBorderWidth}px 0;`;
const sidePadding = `0 ${10 - activeBorderWidth}px;`;

const getBasicBorderStyle = props => {
  if (!props.disableActiveIndicator) {
    return props.mode === 'side'
      ? `border-left: ${activeBorderWidth}px solid transparent;`
      : `border-bottom: ${activeBorderWidth}px solid transparent;`;
  }
};

const StyledNavBar = styled<NavBarProps & { wrap?: boolean }>(({ disableActiveIndicator, ...rest }) => (
  <Flex {...rest} />
))`
  color: ${(props: any) => color(colorSpecMap[props.mode])};
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
    margin-left: 20px;

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
class NavBarComponent extends Component<NavBarProps> {
  static defaultProps: NavBarBasicProps = {
    mode: 'list',
    listType: 'ul',
    includeIcons: false,
    disableActiveIndicator: false,
  };

  render() {
    const { listType, children, includeIcons, ...rest } = this.props;
    let childrenWithProps = children;
    // Only ol has icons
    if (listType === 'ol') {
      childrenWithProps = Children.map(children, child =>
        cloneElement(child as ReactElement<any>, {
          includeIcons,
        }),
      );
    }

    return (
      <StyledNavBar {...rest} wrap>
        {listType === 'ul' ? <ul> {childrenWithProps} </ul> : <ol>{childrenWithProps}</ol>}
      </StyledNavBar>
    );
  }
}

const NavLink = props => {
  return getItemComponent(
    styled.a`
      ${navLinkStyle};
    `,
    props,
  );
};

const RouterNavLink = props => {
  return getItemComponent(
    styled(ReactRouterNavLink).attrs({ activeClassName })`
      ${navLinkStyle};
    `,
    props,
  );
};

const getItemComponent = (StyledComponent, props) => {
  const { includeIcons, active, disabled, children, completed, ...rest } = props;
  const iconName = getIconNameFromProps(props);
  const classNames = getNavLinkClassNames(props);

  if (active) {
    classNames.push(activeClassName);
  }

  return (
    <li>
      <StyledComponent {...rest} disabled={disabled} className={classNames.join(' ')}>
        {includeIcons && <Icon iconName={iconName} className="nav-icon" />} {children}
      </StyledComponent>
    </li>
  );
};

const getIconNameFromProps = props => {
  if (props.includeIcons) {
    if (props.disabled) {
      return 'lock-outline';
    } else if (props.completed) {
      return 'check';
    }
  }
};

const getNavLinkClassNames = props => {
  const classNames = [];
  if (props.completed) {
    classNames.push(completedClassName);
  }
  if (props.disabled) {
    classNames.push(disabledClassName);
  }
  return classNames;
};

declare type NavBar = typeof NavBarComponent & {
  NavLink: typeof NavLink;
  RouterNavLink: typeof RouterNavLink;
};

const NavBar = NavBarComponent as NavBar;
NavBar.NavLink = NavLink;
NavBar.RouterNavLink = RouterNavLink;

export default NavBar;
