const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/index.js',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [require.resolve('@babel/plugin-transform-flow-strip-types')],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg)|(jpe?g)|(png)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.json', '.js'],
  },
  devServer: {
    compress: true,
    port: 3115,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROFILE__: true,
      __EXPERIMENTAL__: true,
      __UMD__: true,
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, './packages/react'),
      shared: path.resolve(__dirname, './packages/shared'),
      scheduler: path.resolve(__dirname, './packages/scheduler'),
      'react-dom': path.resolve(__dirname, './packages/react-dom'),
      'react-reconciler': path.resolve(__dirname, './packages/react-reconciler'),
    },
  },
  devtool: 'source-map',
};
