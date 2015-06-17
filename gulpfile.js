var karma = require('karma').server;
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tslint = require('gulp-tslint');
var rimraf = require('gulp-rimraf');

var lint = function lint() {

  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));

};

var clean = function clean() {

  return gulp.src('./dist/')
    .pipe(rimraf());

};

var compile = function compile() {

  return gulp.src('./src/**/*.ts', {base: './src/'})
    .pipe(typescript({
      typescript: require('typescript'),
      module: 'amd'
    }))
    .pipe(gulp.dest('./dist/'));

};

var test = function test(done) {

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);

};

gulp.task('test', gulp.series(clean, compile, test));
