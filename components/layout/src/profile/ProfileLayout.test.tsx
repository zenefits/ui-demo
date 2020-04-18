import React from 'react';
import 'jest-styled-components';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Avatar, Card } from 'z-frontend-composites';

import ProfileLayout from './ProfileLayout';

const mainText = 'main content';
const navText = 'nav';
const mainRender = () => <Card p={5}>{mainText}</Card>;
const navRender = () => <Card p={5}>{navText}</Card>;
const avatarRender = () => <Avatar firstName="Julian" lastName="Bashir" />;

describe('ProfileLayout', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<ProfileLayout name="Julian" mainRender={mainRender} />)).toHaveLength(1);
  });

  it('should render main content', () => {
    const mounted = mountEnzymeWithTheme(<ProfileLayout name="Julian" mainRender={mainRender} />);
    expect(mounted.text()).toMatch(mainText);
  });

  it('should render nav if provided', () => {
    const mounted = mountEnzymeWithTheme(<ProfileLayout name="Julian" mainRender={mainRender} navRender={navRender} />);
    expect(mounted.text()).toMatch(navText);
  });

  it('should render avatar if provided', () => {
    const mounted = mountEnzymeWithTheme(
      <ProfileLayout name="Julian" mainRender={mainRender} avatarRender={avatarRender} />,
    );
    expect(mounted.find(Avatar)).toHaveLength(1);
  });
});
