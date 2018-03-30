module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: false,
        targets: {
          chrome: 59,
        },
      },
    ],
    'react',
  ],
  plugins: ['babel-plugin-syntax-dynamic-import', 'transform-object-rest-spread', 'babel-plugin-styled-components'],
};
