import React from 'react';
import { mountWithTheme } from '../test-utils/theme';
import Heading from './Heading';

describe('Heading', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Heading>Heading</Heading>).text()).toBe('Heading');
  });
});
