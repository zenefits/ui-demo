module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'react',
  ],
  plugins: ['babel-plugin-syntax-dynamic-import', 'babel-plugin-styled-components'],
};
