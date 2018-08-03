const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const lineno = require('egg-web/tasks/append-line-number.js');
const replaceByLine = require('egg-web/tasks/replace-by-line.js');


gulp.task('clean', function () {
  return del([
    path.resolve('./app/public/dist/**/*'),
  ]);
});


gulp.task('replace', function () {
  const assetsMap = JSON.parse(fs.readFileSync(path.resolve('./webpack-assets.json')));

  const REG = /([0-9a-z]+)-stamp4hash.(css|js)/ig;

  return gulp.src(path.resolve('./app/view/*.html'))
    .pipe(replace(REG, function (match, p1, p2) {
      return assetsMap[p1][p2];
    }))
    .pipe(gulp.dest(path.resolve('./app/view')));
});


gulp.task('logger', function () {
  const PATTERN = /(ctx\.logger\.)(debug|info|warn|error)\('(.+)'(, .+)?\);(.*)/;
  const LINENO = lineno.LINENO;

  gulp
    .src([
      'app/**/*',
      '!app/middleware/**/*',
      '!app/public/**/*',
      '!app/router.js',
    ])
    .pipe(lineno(PATTERN))
    .pipe(replaceByLine(PATTERN, function (match, p1, p2, p3, p4, p5) {
      const ln = p5.match(LINENO)[1];
      return `${p1}${p2}('${p3}'${p4 || ''}, '[${ln}]');`;
    }))
    .pipe(gulp.dest('app/'));
});
