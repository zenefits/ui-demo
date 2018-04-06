import React from 'react';
import { renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import Card from './Card';

describe('Card', () => {
  it('should render all components without throwing an error', () => {
    expect.assertions(4);
    const components = [Card, Card.Header, Card.Row, Card.Footer];
    components.map(Component => {
      expect(renderWithTheme(<Component>Hi</Component>).text()).toEqual('Hi');
    });
  });

  it('should not render default util props as attributes', () => {
    const rendered = renderWithTheme(<Card.Header pl={3} mb={2} flex="1" order={2} />);
    const attributeKeys = Object.keys(rendered.get(0).attribs);
    expect(attributeKeys).toHaveLength(1);
    expect(attributeKeys).toContain('class');
  });
});
