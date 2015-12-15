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
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint' },
    ],

    loaders: [
      { test: /\.(css|scss)$/, loader: 'style!css!postcss!sass' },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel!vue-lite' },
      // { test: /\.png$/, loader: 'url-loader?limit=10000&minetype=image/png' },
    ],
  },

  // postcss: function () {
  //   return [
  //     require('autoprefixer'),
  //   ];
  // },
};
