var gulp          = require('gulp');
var runSequence   = require('run-sequence');
var useref        = require('gulp-useref');
var htmlmin       = require('gulp-htmlmin');
var uglify        = require('gulp-uglify');
var cssnano       = require('gulp-cssnano');
var uncss         = require('gulp-uncss');
var inlinesource  = require('gulp-inline-source');
var sass          = require('gulp-sass');
var gulpif        = require('gulp-if');
var lazypipe      = require('lazypipe');
var taskTime      = require('gulp-total-task-time');

// build folder
var folder = './public';

// process html
var htmlTasks = lazypipe()
  .pipe(htmlmin, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    preserveLineBreaks: true
  })
  .pipe(inlinesource, {
    compress: true
  });

// timer
taskTime.init();

// remove unused styles and minify css
gulp.task('minify:css', function() {
  var options_uncss = {
    html: [
      folder + '/**/*.html'
    ],
    ignore: [
      'label',
      /\.valid/,
      /\.error/,
      /\.inactive/
    ]
  };

  var options_cssnano = {
    safe: true,
    discardComments: {
      removeAll: true
    }
  };

  return gulp.src(folder + '/**/*.css')
    .pipe(uncss(options_uncss))
    .pipe(cssnano(options_cssnano))
    .pipe(gulp.dest(folder));
});

// concat files, minify html, inline all css
gulp.task('minify:html', function() {
  var options = {
    searchPath: folder
  };

  return gulp.src([folder + '/**/*.html', '!' + folder + '/**/googlee94e26896d2c463c.html'])
    .pipe(useref(options))
    .pipe(gulpif('*.html', htmlTasks()))
    .pipe(gulp.dest(folder));
});

// minify js
gulp.task('minify:js', function() {
  return gulp.src([
      folder + '/**/*.js',
      '!' + folder + '/**/*.min.js',
      '!' + folder + '/**/ie/*.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest(folder));
});

// compile sass
gulp.task('sass', function() {
  return gulp.src('./static-src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(gulp.dest('./static/assets/css'));
});

// watch sass
gulp.task('sass:watch', function() {
  gulp.watch('./static-src/sass/**/*.scss', ['sass']);
});

// minify all files
gulp.task('minify', function(callback) {
  runSequence(
    'minify:css',
    'minify:html',
    'minify:js',
    callback
  );
});

// build
gulp.task('default', function(callback) {
  runSequence(
    'minify',
    callback
  );
});
