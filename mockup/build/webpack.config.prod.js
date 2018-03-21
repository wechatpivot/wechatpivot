const path = require('path');
const merge = require('webpack-merge');
const { DefinePlugin, optimize: { UglifyJsPlugin } } = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WEBPACK, NAME, PROJECT_PATH, TARGET_DIR } = require('./config.js');


module.exports = merge(WEBPACK, {
  output: {
    filename: '[name]-[hash:5].js',
    chunkFilename: 'chunk-[name]-[chunkhash:5].js',
    path: path.resolve(PROJECT_PATH, TARGET_DIR),
    publicPath: '/public/dist',
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                localIdentName: '[name]-[local]-[hash:5]',
                safe: true,
                autoprefixer: {
                  add: true,
                },
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new AssetsPlugin({
      processOutput: assets => JSON.stringify(assets).replace(/\/public\/dist/ig, ''),
    }),
    new UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('[name]-[hash:5].css'),
  ],
});
