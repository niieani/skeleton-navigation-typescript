/*eslint-disable no-var*/

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AureliaWebpackPlugin = require('aurelia-webpack2-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var pkg = require('./package.json');

var outputFileTemplateSuffix = '-' + pkg.version;
var common = require('./webpack.common')

module.exports = {
  entry: common.entry,
  resolve: common.resolve,
  devtool: common.devtool,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]' + outputFileTemplateSuffix + '.js',
    chunkFilename: '[id]' + outputFileTemplateSuffix + '.js'
  },
  plugins: [
    new AureliaWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Aurelia webpack skeleton - ' + pkg.version,
      template: 'index.prod.html',
      filename: 'index.html'
    }),
    new ProvidePlugin({
      Promise: 'bluebird'
    })
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, /node_modules/], query: { tsconfig: 'tsconfig.prod.json' } },      
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
