const getFontsRule = () => ({
  test: /\.(woff|woff2|otf|ttf|eot|svg)?$/,
  exclude: [/node_modules\/(?!material-design-iconic-font).*/, /src\/images\/(.*)/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/fonts/[name].[hash].[ext]',
      },
    },
  ],
});

const getCssRule = () => ({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

const getImageRule = () => ({
  test: /src\/images\/(.*)/,
  exclude: [/node_modules\//],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/images/[name].[ext]',
      },
    },
  ],
});

// Avoid "require is not defined" errors, this rule should be the first
const getMjsRule = () => ({
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
});

const getStorySourceAddonRule = () => ({
  test: /\.stories\.tsx?$/,
  loaders: [
    {
      loader: require.resolve('@storybook/addon-storysource/loader'),
      options: { parser: 'typescript' },
    },
  ],
  enforce: 'pre',
});

const getCoveoSvgRule = () => ({
  test: /\.svg$/,
  include: [/node_modules\/coveo-search-ui/],
  use: ['file-loader'],
});

module.exports = {
  getFontsRule,
  getCssRule,
  getImageRule,
  getMjsRule,
  getStorySourceAddonRule,
  getCoveoSvgRule,
};
