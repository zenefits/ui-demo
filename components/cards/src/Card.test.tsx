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
});
