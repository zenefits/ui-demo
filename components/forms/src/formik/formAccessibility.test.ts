import { getAriaInputProps } from './formAccessibility';

describe('formAccessibility', () => {
  describe('getAriaInputProps', () => {
    it('no label => defaults to labelledby', () => {
      const props = getAriaInputProps('name');
      expect(props).toEqual({ 'aria-labelledby': 'zf-name-label', 'aria-label': undefined, 'aria-describedby': null });
    });

    it('with label', () => {
      const props = getAriaInputProps('name', null, 'Choose your name');
      expect(props).toHaveProperty('aria-label', 'Choose your name');
    });

    it('with label => omit labelledby', () => {
      const props = getAriaInputProps('name', null, 'Choose your name');
      expect(props).toEqual({
        'aria-labelledby': undefined, // according to spec, this would take precedence over label, so leave it undefined
        'aria-label': 'Choose your name',
        'aria-describedby': null,
      });
    });

    it('error reflected in describedby', () => {
      const props = getAriaInputProps('name', 'Name is required');
      expect(props).toHaveProperty('aria-describedby', 'zf-name-error');
    });
  });
});
