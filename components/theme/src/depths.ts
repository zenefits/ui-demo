const depthBorder = '1px solid rgba(18,52,102,0.15)';

export default [
  `border: ${depthBorder};`,
  `border: ${depthBorder}; box-shadow: 0 1px 4px rgba(18,52,102,0.15);`,
  `border: ${depthBorder}; box-shadow: 0 2px 8px rgba(18,52,102,0.15);`,
  // Header depth - keep last
  ` box-shadow: 0 2px 6px 0 rgba(18,52,102,0.1);`,
];
