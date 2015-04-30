var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

gulp.task('default', ['sass', 'react']);

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
      .pipe(uglify())
      .pipe(gulp.dest('./public/jsx'));
});
