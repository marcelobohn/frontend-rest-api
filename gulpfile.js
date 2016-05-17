var gulp = require('gulp');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

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
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
  gulp.src(['src/styles/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('build/styles/'));
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


gulp.task('default', ['minify','sass','webserver']);