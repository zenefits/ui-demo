const getTypescriptRule = () => ({
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
      },
    },
    {
      loader: require.resolve('ts-loader'),
    },
  ],
  exclude: [/node_modules/],
});

const getFontsRule = () => ({
  test: /\.(woff|woff2|otf|ttf|eot|svg)?$/,
  exclude: [/node_modules\/(?!material-design-iconic-font).*/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/fonts/[name].[ext]',
      },
    },
  ],
});

module.exports = { getTypescriptRule, getFontsRule };
