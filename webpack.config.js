var webpack = require('webpack');


module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    path: './build/js',
    filename: '[name].js',
    chunkFilename: "chunk.[name].js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },

  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint!vue-lite' },
    ],

    loaders: [
      { test: /\.(css|scss)$/, loader: 'style!css!postcss!sass' },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel!vue-lite' },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false
      },
    }),
  ],
};
