import React from 'react';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { BrowserRouter } from 'react-router-dom';
import Link from './Link';

describe('Link component', () => {
  it('should mount without throwing an error', () => {
    const linkHref = 'https://google.com';
    const linkText = 'foo';
    const link = mountWithTheme(<Link href={linkHref}>{linkText}</Link>);
    expect(link.text()).toBe(linkText);
    expect(link.find('a')).toHaveLength(1);
  });

  it('should include rel attribute by default', () => {
    const linkHref = 'https://google.com';
    const linkText = 'foo';
    const link = renderWithTheme(<Link href={linkHref}>{linkText}</Link>);
    expect(link.text()).toBe(linkText);
    expect(link.attr('href')).toBe(linkHref);
    expect(link.attr('rel')).toContain('noopener');
    expect(link.attr('rel')).toContain('noreferrer');
  });

  it('should preserve passed rel attr for regular link', () => {
    const linkHref = 'https://google.com';
    const linkText = 'foo';
    const addedRel = 'prefetch preload';

    const link = renderWithTheme(
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
    const linkTo = '/company/overview';
    const linkText = 'foo';
    const link = renderWithTheme(
      <BrowserRouter>
        <Link to={linkTo}>{linkText}</Link>
      </BrowserRouter>,
    );
    expect(link.text()).toBe(linkText);
    expect(link.attr('href')).toBe(linkTo);
    expect(link.attr('rel')).toBeFalsy();
  });

  it('should preserve passed rel attr for route link', () => {
    const linkTo = '/company/overview';
    const linkText = 'foo';
    const addedRel = 'prefetch preload';

    const routeLink = renderWithTheme(
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
});
