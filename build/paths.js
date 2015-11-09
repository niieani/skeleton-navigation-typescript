var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts*',
  sourceES6: 'dist-es6' + '**/*.js',
  html: appRoot + '**/*.html',
  css: 'src-scss/**/*.*css',
  style: 'styles/**/*.css',
  output: outputRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
