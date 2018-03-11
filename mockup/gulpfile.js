const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');


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
