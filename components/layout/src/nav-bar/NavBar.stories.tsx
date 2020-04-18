import React from 'react';

// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { paddedBox } from 'z-frontend-storybook-config';
import { setViewports } from 'z-frontend-app-bootstrap';
import { Box } from 'zbase';
import { Hide } from 'z-frontend-theme';

import { storiesOf } from '../../.storybook/storyHelpers';
import NavBar from './NavBar';
import ExampleList from './exampleList';

const links = [
  { url: '1url.com', text: 'link1', active: false },
  { url: '2url.com', text: 'link2Disabled', active: false, disabled: true },
  { url: '3url.com', text: 'link3', active: true },
  { url: '4url.com', text: 'link4', active: false },
];

class MobileNavBarExample extends React.Component {
  render() {
    return (
      <NavBar mode="product">
        {links.map((link, i) => (
          <NavBar.NavLink
            key={link.url}
            onClick={() => {
              for (let j = 0; j < links.length; j += 1) {
                links[j].active = false;
              }
              links[i].active = true;
              this.forceUpdate();
            }}
            active={link.active}
            disabled={link.disabled}
          >
            {link.text}
          </NavBar.NavLink>
        ))}
      </NavBar>
    );
  }
}

storiesOf('layout|NavBar', module)
  .addDecorator(withViewport())
  .addDecorator(paddedBox)
  .add('list', ExampleList)
  .add('side', () => (
    <NavBar mode="side">
      {links.map(link => (
        <NavBar.RouterNavLink key={link.url} to={link.url} active={link.active} disabled={link.disabled}>
          {link.text}
        </NavBar.RouterNavLink>
      ))}
    </NavBar>
  ))
  .add('product', () => (
    <NavBar mode="product">
      {links.map(link => (
        <NavBar.RouterNavLink key={link.url} to={link.url} active={link.active} disabled={link.disabled}>
          {link.text}
        </NavBar.RouterNavLink>
      ))}
    </NavBar>
  ))
  .add(
    'mobile',
    () => {
      return (
        <>
          <Hide forBreakpoints={[true]}>Shrink your viewport to see the mobile navbar!</Hide>
          <MobileNavBarExample />
        </>
      );
    },
    setViewports([0]),
  )
  .add('nested lists', () => (
    <NavBar mode="side" listType="ol">
      <NavBar.NavLink>Tab 1</NavBar.NavLink>
      <NavBar.NavLink>Tab 2</NavBar.NavLink>
      <NavBar mode="side" listType="ol">
        <NavBar.NavLink>Nested Tab 1</NavBar.NavLink>
        <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
      </NavBar>
      <NavBar.NavLink>Tab 3</NavBar.NavLink>
      <NavBar mode="side" listType="ol">
        <NavBar.NavLink active>Nested Tab 1</NavBar.NavLink>
        <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
        <NavBar mode="side" listType="ol">
          <NavBar.NavLink>Nested Tab 1</NavBar.NavLink>
          <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
        </NavBar>
      </NavBar>
      <NavBar.NavLink>Tab 4</NavBar.NavLink>
    </NavBar>
  ))
  .add('lists with icon', () => (
    <Box>
      <NavBar mode="side" listType="ol" includeIcons>
        <NavBar.NavLink completed>Completed Step</NavBar.NavLink>
        <NavBar.NavLink active>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink>Default Step</NavBar.NavLink>
        <NavBar.NavLink disabled>Disabled Step</NavBar.NavLink>
      </NavBar>
    </Box>
  ))
  .add('ember route link', () => (
    <Box>
      <NavBar mode="list">
        <NavBar.RouterNavLink active to="/">
          Overview
        </NavBar.RouterNavLink>
        <NavBar.RouterNavLink to="/react">React Page</NavBar.RouterNavLink>
        <NavBar.EmberRouterNavLink active to="employeeProfile" routeParams={[1]} target="_blank">
          Employee Profile
        </NavBar.EmberRouterNavLink>
        <NavBar.EmberRouterNavLink to="employeePto.landing" target="_blank">
          Time off
        </NavBar.EmberRouterNavLink>
      </NavBar>
    </Box>
  ));
