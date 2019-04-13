const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object');

const originalStyleRuleMatcher = (global as any)[JEST_MATCHERS_OBJECT]['matchers']['toHaveStyleRule'];

// Original toHaveStyleRule matcher does not find our styled-components styles after they
// are processes by the styled-components-css-namespace babel plugin.
expect.extend({
  toHaveStyleRule(component, property, expected, options) {
    return originalStyleRuleMatcher(component, property, expected, { ...options, modifier: '&&&&' });
  },
});
