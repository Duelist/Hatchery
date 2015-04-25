var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    browserify = require('gulp-browserify');

gulp.task('build', ['sass']);

gulp.task('clean', function () {

});

gulp.task('sass', function () {
  gulp.src('./private/scss/*.scss')
      .pipe(sass())
      .pipe(minifycss())
      .pipe(gulp.dest('./public/css'));
});

gulp.task('react', function () {
  gulp.src('./private/jsx/*.jsx')
      .pipe(browserify({
        extensions: ['.jsx'],
        transform: ['reactify']
      }))
      .pipe(gulp.dest('./public/jsx'));
});
