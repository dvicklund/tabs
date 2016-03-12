var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  css: ['app/**/*.scss'],
  html: ['app/**/*.html'],
  js: ['app/**/*.js'],
  test: ['test/test.js']
};

gulp.task('build:css', function() {
  gulp.src('app/scss/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(concatCss('style.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('build:html', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('build:js', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('test:mocha', function() {
	return gulp.src(paths.test).pipe(mocha({reporter: 'nyan'}))
    .once('end', function() {process.exit();});
});

gulp.task('watch:css', function() {
	gulp.watch(paths.css, ['build:css']);
});

gulp.task('watch:html', function() {
	gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:js', function() {
	gulp.watch(paths.js, ['build:js']);
});

gulp.task('build:all', ['build:css', 'build:html', 'build:js']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
gulp.task('default', ['test:all', 'watch:all']);
