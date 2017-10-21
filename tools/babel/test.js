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
  plugins: ['babel-plugin-styled-components'],
};
