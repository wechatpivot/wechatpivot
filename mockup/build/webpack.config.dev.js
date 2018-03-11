const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { WEBPACK, DEV_HOST, DEV_PORT } = require('./config.js');

const DEV_SERVER = `webpack-dev-server/client?http://${DEV_HOST}:${DEV_PORT}`;
const HOT_SERVER = 'webpack/hot/only-dev-server';

module.exports = merge(WEBPACK, {
  entry: Object.keys(WEBPACK.entry).reduce((memo, key) => {
    memo[key] = [DEV_SERVER, HOT_SERVER, WEBPACK.entry[key]];
    return memo;
  }, {}),

  output: {
    filename: '[name]-stamp4hash.js',
    publicPath: `http://${DEV_HOST}:${DEV_PORT}/static/js/`,
  },

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      // },
      {
        test: /\.(css|scss)/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new StyleLintPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    host: DEV_HOST,
    port: DEV_PORT,
    historyApiFallback: true,
    hot: true,
    stats: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
