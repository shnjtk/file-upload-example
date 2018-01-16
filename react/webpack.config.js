var webpack = require('webpack');
var path = require('path');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],

  output: {
    filename: 'app.[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: './src',
    port: 8100,
    hot: true,
    historyApiFallback: true,
    open: true
  },

  plugins: [
    new cleanWebpackPlugin(['dist']),
    new htmlWebpackPlugin({template: './src/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'browsers': ['last 2 versions']
                }
              }],
              'stage-3',
              'react'
            ]
          }
        }
      }
    ]
  }
};
