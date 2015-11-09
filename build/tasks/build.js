var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');


// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  var tsProject = ts.createProject('tsconfig.json');
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(changed(paths.output))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ts(tsProject))
    .pipe(to5())
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-system-es6', function () {
  return gulp.src(paths.sourceES6)
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(changed(paths.output))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5())
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});

gulp.task('build-es6', function(callback) {
  return runSequence(
    'clean',
    ['build-system-es6', 'build-html', 'build-css'],
    callback
  );
});
