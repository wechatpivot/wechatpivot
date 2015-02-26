var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var browserify = require('browserify');


gulp.task('csscopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/highlight.js/styles/zenburn.css',
    ])
    .pipe(gulp.dest('build/css'));
});


gulp.task('jshint', function () {
  return gulp.src('src/**/*.jsx')
    .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});


gulp.task('jscopy', function () {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular/angular.min.js.map',
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-route/angular-route.min.js.map',
      'node_modules/angular-route/angular-route.js'
    ])
    .pipe(gulp.dest('build/js'));
});


gulp.task('js', ['jshint'], function () {
  var b = browserify({
    entries: ['./src/index.js'],
    debug: true
  });

  return b.bundle()
    .pipe(exorcist('./build/js/weixin-api-debug.js.map'))
    .pipe(source('weixin-api-debug.js'))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('build', ['jscopy']);
