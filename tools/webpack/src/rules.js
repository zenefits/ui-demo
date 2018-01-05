const getTypescriptRule = isDevMode => ({
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
      options: {
        compilerOptions: {
          noUnusedLocals: !isDevMode,
        },
      },
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

const getCssRule = () => ({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

module.exports = { getTypescriptRule, getFontsRule, getCssRule };
