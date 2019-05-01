import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithThemeIntl, renderWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import { PluralText } from '../index';

const messages = {
  'app.review.count.none': 'No reviews [key]',
  'app.review.count.one': 'Found a review [key]',
  'app.review.count.other': 'Found some reviews [key]',
  'app.review.count.interpolated.other': '{count, number} reviews [key]',
};

describe('PluralText', () => {
  it('should render a `<span>` by default', () => {
    const rendered = renderWithThemeIntl(<PluralText other="Found some reviews" count={2} />);
    expect(rendered.is('span')).toBe(true);
  });

  it('should render a custom tag', () => {
    const rendered = renderWithThemeIntl(<PluralText tag="small" other="Found some reviews" count={2} />);
    expect(rendered.is('small')).toBe(true);
  });

  describe('chooses inline message based on count', () => {
    it('zero count', () => {
      const rendered = renderWithThemeIntl(<PluralText none="No reviews" other="Found some reviews" count={0} />);
      expect(rendered.text()).toBe('No reviews');
    });

    it('single count', () => {
      const rendered = renderWithThemeIntl(
        <PluralText none="No reviews" one="Found a review" other="Found some reviews" count={1} />,
      );
      expect(rendered.text()).toBe('Found a review');
    });

    it('multiple count', () => {
      const rendered = renderWithThemeIntl(
        <PluralText none="No reviews" one="Found a review" other="Found some reviews" count={2} />,
      );
      expect(rendered.text()).toBe('Found some reviews');
    });

    it('interpolated count', () => {
      const rendered = renderWithThemeIntl(<PluralText other="{count} reviews" count={2} />);
      expect(rendered.text()).toBe('2 reviews');
    });

    it('supports formatted count', () => {
      const rendered = renderWithThemeIntl(<PluralText other="{count, number} reviews" count={12345} />);
      expect(rendered.text()).toBe('12,345 reviews');
    });
  });

  describe('chooses external message based on count', () => {
    it('zero count', () => {
      const rendered = renderWithThemeIntl(<PluralText noneKey="app.review.count.none" count={0} />, { messages });
      expect(rendered.text()).toBe(messages['app.review.count.none']);
    });

    it('single count', () => {
      const rendered = renderWithThemeIntl(<PluralText oneKey="app.review.count.one" count={1} />, { messages });
      expect(rendered.text()).toBe(messages['app.review.count.one']);
    });

    it('multiple count', () => {
      const rendered = renderWithThemeIntl(<PluralText otherKey="app.review.count.other" count={2} />, { messages });
      expect(rendered.text()).toBe(messages['app.review.count.other']);
    });

    it('interpolated value', () => {
      const rendered = renderWithThemeIntl(<PluralText otherKey="app.review.count.interpolated.other" count={2} />, {
        messages,
      });
      expect(rendered.text()).toBe('2 reviews [key]');
    });

    it('falls back if no key found', () => {
      const rendered = renderWithThemeIntl(<PluralText noneKey="does.not.exist" none="none fallback" count={0} />, {
        messages,
      });
      expect(rendered.text()).toBe('none fallback');
    });

    it('choose correct key even if all specified', () => {
      const rendered = renderWithThemeIntl(
        <PluralText
          noneKey="app.review.count.none"
          oneKey="app.review.count.one"
          otherKey="app.review.count.other"
          count={3}
        />,
        {
          messages,
        },
      );
      expect(rendered.text()).toBe(messages['app.review.count.other']);
    });

    it('formats value', () => {
      const rendered = renderWithThemeIntl(
        <PluralText otherKey="app.review.count.interpolated.other" count={12345} />,
        { messages },
      );
      expect(rendered.text()).toBe('12,345 reviews [key]');
    });
  });

  it('should respect util props', () => {
    const mounted = mountWithThemeIntl(<PluralText p={123} other="{count} reviews" count={2} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
  });

  it('should respect textTransform', () => {
    const mounted = mountWithThemeIntl(
      <PluralText p={123} other="{count} reviews" count={2} textTransform="uppercase" />,
    );
    expect(mounted).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('should not render font-style util prop as attributes', () => {
    const rendered = renderWithThemeIntl(<PluralText p={123} other="{count} reviews" count={2} />);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});
