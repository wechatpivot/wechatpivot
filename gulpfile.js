var gulp = require('gulp');
var jshint = require('gulp-jshint');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
var browserify = require('browserify');


gulp.task('csscopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
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
      'node_modules/highlight.js/lib/highlight.js',
      'node_modules/lodash/dist/lodash.min.js',
      'node_modules/react/dist/react.js',
      'node_modules/vue/dist/vue.js'
    ])
    .pipe(gulp.dest('build/js'));
});


gulp.task('js', ['jshint'], function () {
  var browserified = transform(function (filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('src/index.jsx')
    .pipe(browserified)
    .pipe(rename('index.js'))
      .pipe(gulp.dest('js'));
    // .pipe(uglify())
    //   .pipe(rename(ADDON_NAME + '.min.js'))
    //   .pipe(gulp.dest('web/js'));
});


gulp.task('build', ['jscopy']);
