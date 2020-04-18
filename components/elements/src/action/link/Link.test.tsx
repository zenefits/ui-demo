import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Link from './Link';

const linkHref = 'https://google.com';
const linkTo = '/company/overview';

describe('Link component', () => {
  it('should mount without throwing an error', () => {
    const linkText = 'foo';
    const link = mountEnzymeWithTheme(<Link href={linkHref}>{linkText}</Link>);
    expect(link.text()).toBe(linkText);
    expect(link.find('a')).toHaveLength(1);
  });

  it('should include rel attribute by default', () => {
    const linkText = 'foo';
    const link = renderEnzymeWithTheme(<Link href={linkHref}>{linkText}</Link>);
    expect(link.text()).toBe(linkText);
    expect(link.attr('href')).toBe(linkHref);
    expect(link.attr('rel')).toContain('noopener');
    expect(link.attr('rel')).toContain('noreferrer');
  });

  it('should preserve passed rel attr for regular link', () => {
    const linkText = 'foo';
    const addedRel = 'prefetch preload';

    const link = renderEnzymeWithTheme(
      <Link rel={addedRel} href={linkHref}>
        {linkText}
      </Link>,
    );

    expect(link.text()).toBe(linkText);
    expect(link.attr('href')).toBe(linkHref);
    expect(link.attr('rel')).toContain('noopener');
    expect(link.attr('rel')).toContain('noreferrer');
    expect(link.attr('rel')).toContain(addedRel);
  });

  it('should render route link', () => {
    const linkText = 'foo';
    const link = renderEnzymeWithTheme(
      <BrowserRouter>
        <Link to={linkTo}>{linkText}</Link>
      </BrowserRouter>,
    );
    expect(link.text()).toBe(linkText);
    expect(link.attr('href')).toBe(linkTo);
    expect(link.attr('rel')).toBeFalsy();
  });

  it('should preserve passed rel attr for route link', () => {
    const linkText = 'foo';
    const addedRel = 'prefetch preload';

    const routeLink = renderEnzymeWithTheme(
      <BrowserRouter>
        <Link rel={addedRel} to={linkTo}>
          {linkText}
        </Link>
      </BrowserRouter>,
    );

    expect(routeLink.text()).toBe(linkText);
    expect(routeLink.attr('href')).toBe(linkTo);
    expect(routeLink.attr('rel')).toBe(addedRel);
  });

  it('should not render passed util props as attributes', () => {
    const myRef = React.createRef();
    const rendered = renderEnzymeWithTheme(
      <BrowserRouter>
        <Link elementRef={myRef} to={linkTo} />
      </BrowserRouter>,
    );
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toEqual(['class', 'href']);
  });
});
