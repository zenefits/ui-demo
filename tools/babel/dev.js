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
  plugins: ['transform-object-rest-spread', 'babel-plugin-styled-components'],
};
