/*eslint-disable no-var*/

var path = require('path');
var AureliaWebpackPlugin = require('aurelia-webpack2-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

var common = require('./webpack.common')

module.exports = {
  entry: common.entry,
  resolve: common.resolve,
  devtool: common.devtool,
  devServer: {
    host: 'localhost',
    port: 3000
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new AureliaWebpackPlugin(),
    new ProvidePlugin({
      Promise: 'bluebird'
    })
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, /node_modules/] },      
      { test: /\.js$/, loader: 'babel', include: /node_modules\/aurelia-[a-z\-]+/, query: { plugins: common.babelPlugins } },      
      // { test: /\.js$/, loader: 'babel', include: /node_modules\/aurelia-[a-z\-]+/, query: { presets: ['es2015-loose-rollup'], plugins: ['transform-decorators-legacy', 'transform-runtime'] } },      
      // { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015-loose-rollup', 'stage-1'], plugins: ['transform-decorators-legacy', 'transform-runtime'] } },
      { test: /\.css?$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|gif|jpg)$/, loader: 'url', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ]
  }
};
