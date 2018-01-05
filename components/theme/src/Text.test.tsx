import React from 'react';
import { mountWithTheme } from '../test-utils/theme';
import Text from './Text';

describe('Textarea', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Text>Text</Text>).text()).toBe('Text');
  });
});
