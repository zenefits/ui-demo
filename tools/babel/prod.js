module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
    'react',
  ],
  plugins: ['babel-plugin-syntax-dynamic-import', 'transform-object-rest-spread', 'babel-plugin-styled-components'],
};
