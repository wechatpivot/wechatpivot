var gulp = require('gulp');
var shell = require('gulp-shell');
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


gulp.task('jscs', shell.task(['npm run jscs -s'], { quiet: true, errorMessage: '\n<%= error.stdout %>' }));

gulp.task('jshint', ['jscs'], shell.task(['npm run jshint -s'], { quiet: true, errorMessage: '\n<%= error.stdout %>' }));


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


gulp.task('js', ['jscs', 'jshint'], function () {
  var b = browserify({
    entries: ['./src/index.js'],
    debug: true
  });

  return b.bundle()
    .pipe(exorcist('./build/js/weixin-api-debug.js.map'))
    .pipe(source('weixin-api-debug.js'))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('default', ['js']);

gulp.task('build', ['csscopy', 'jscopy', 'js']);
