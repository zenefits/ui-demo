import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import NavBar from './NavBar';

const links = [
  { url: '1url.com', text: 'link1', active: false },
  { url: '2url.com', text: 'link2', active: false },
  { url: '3url.com', text: 'link3', active: true },
  { url: '4url.com', text: 'link4', active: false },
];

export default () => (
  <MemoryRouter>
    <NavBar mode="list">
      {links.map((link, i) => (
        <NavBar.RouterNavLink key={link.url} to={link.url} active={link.active}>
          {link.text}
        </NavBar.RouterNavLink>
      ))}
    </NavBar>
  </MemoryRouter>
);
