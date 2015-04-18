var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css');

gulp.task('build', ['sass']);

gulp.task('clean', function () {

});

gulp.task('sass', function () {
  gulp.src('./private/scss/*.scss')
      .pipe(sass())
      .pipe(minifycss())
      .pipe(gulp.dest('./public/css'));
});
