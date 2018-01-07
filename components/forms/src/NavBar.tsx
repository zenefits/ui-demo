import { styled, css } from 'z-frontend-theme';
import { Flex, TabItem, hoc } from 'rebass';
import { color } from 'z-frontend-theme/src/utils';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';

const activeClassName = 'active-link';
const navLinkStyle = css`
  &:hover {
    opacity: 1;
    color: inherit;
  }

  cursor: pointer;
  border-bottom: 2px solid ${(props: any) => (props.active ? color('primary.a') : 'transparent')};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 14px 0;
  margin: 0 16px;
  color: inherit;
  opacity: ${(props: any) => (props.active ? 1 : props.theme.opacities[0])};
`;

const NavLink = hoc(navLinkStyle, {})(TabItem);
const RouterNavLink = styled(hoc(navLinkStyle, {})(ReactRouterNavLink)).attrs({
  activeClassName,
})`
  &.${activeClassName} {
    border-bottom-color: ${color('primary.a')};
    opacity: 1;
  }
`;

const colorSpecMap = {
  link: 'secondary.a',
  product: 'grayscale.white',
};

// way to enforce the mode?
const navBarStyle = css`
  color: ${(props: any) => color(colorSpecMap[props.mode])};
`;
const NavBarComponent = hoc(navBarStyle, {})(Flex);

declare type NavBar = typeof NavBarComponent & {
  NavLink: typeof NavLink;
  RouterNavLink: typeof RouterNavLink;
};

const NavBar = NavBarComponent as NavBar;
NavBar.NavLink = NavLink;
NavBar.RouterNavLink = RouterNavLink;

export default NavBar;
