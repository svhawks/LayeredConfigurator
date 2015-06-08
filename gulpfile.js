var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tslint = require('gulp-tslint');
var rimraf = require('gulp-rimraf');

gulp.task('lint', function () {

  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));

});

gulp.task('clean', function () {

  return gulp.src('./dist/')
    .pipe(rimraf());

});

gulp.task('compile', ['clean', 'lint'], function () {

  return gulp.src('./src/**/*.ts', {base: './src/'})
    .pipe(typescript({
      typescript: require('typescript'),
      module: 'amd'
    }))
    .pipe(gulp.dest('./dist/'));

});

gulp.task('default', ['compile']);