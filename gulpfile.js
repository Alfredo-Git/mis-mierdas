const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
  return gulp.src('public/pre/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(uglifycss())
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('public/css'));
});

gulp.task('babel', () => {
  return gulp.src('public/pre/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('functions.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('public/js'));
});

gulp.task('watch', () => {
  gulp.watch('public/pre/scss/*.scss', gulp.series('sass'));
  gulp.watch('public/pre/js/*.js', gulp.series('babel'));
});


