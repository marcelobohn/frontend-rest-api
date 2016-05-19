var gulp = require('gulp'),
 jshint = require('gulp-jshint'),
 htmlmin = require('gulp-htmlmin'),
 sass = require('gulp-sass'),
 concat = require('gulp-concat'),
 rename = require('gulp-rename'),
 uglify = require('gulp-uglify'),
 notify = require('gulp-notify'),
 wrap = require('gulp-wrap'),
 strip = require('gulp-strip-comments'),
 webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      fallback: 'build/index.html'
    }));
});

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', function() {
  return gulp.src(['src/*.html','!src/layout.html'])
    .pipe(wrap({src: 'src/layout.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(strip())
    .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
  gulp.src(['src/styles/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('build/styles/'));
});


gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
])
.pipe(gulp.dest('build/scripts'));

gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
])
.pipe(gulp.dest('build/styles'));

gulp.task('fonts', function () {
  gulp.src(['bower_components/bootstrap/dist/fonts/*.*'])
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('default', ['minify','sass','fonts','scripts','webserver']);