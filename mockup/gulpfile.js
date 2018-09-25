const gulp = require('gulp');
const { clean, replace, logger } = require('egg-web/build/gulp.config');


gulp.task('_clean', clean);

gulp.task('_replace', replace);

gulp.task('_logger', logger);
