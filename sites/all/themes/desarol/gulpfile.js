//load plugins
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  sass = require('gulp-sass'),
  autoprefixer = require('autoprefixer'),
  postcss = require('gulp-postcss'),
  flatten = require('gulp-flatten'),
  del = require('del'),
  minifyCSS = require('gulp-minify-css'),
  include = require('gulp-include'),
  browserSync = require('browser-sync'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  fileinclude = require('gulp-file-include'),
  path = require('path'),
  gulp = require('gulp'),
  sassLint = require('gulp-sass-lint'),
  browserify = require('gulp-browserify-globs');

// Build styleguide.
gulp.task('styleguide', $.shell.task([
    // kss-node [source   folder of files to parse] [destination folder] --template [location of template files]
    'kss-node <%= source %> <%= destination %> --template <%= template %> --helpers <%= helpers %> ' +
    '--css css/styles.css ' +
    '--js js/bundle.js'
  ], {
    templateData: {
      source: 'components',
      destination: '.',
      template: 'node_modules/kss/generator/handlebars/template',
      helpers: "helpers"
    }
  }
));

// Static server
gulp.task('watch', ['styles', 'browserify', 'styleguide'], function () {
  browserSync({
    server: {
      baseDir: "."
    }
  });

  gulp.watch(['components/**/*.scss', 'scss/**/*.scss'], ['styles']);

  gulp.watch(['components/**/*.hbs', 'scss/**/*.hbs'], ['styleguide', browserSync.reload]);

  gulp.watch(['components/**/*.js'], ['browserify', browserSync.reload]);

});

gulp.task('styles', function () {
  return gulp.src('scss/styles.scss')
    .pipe(include())
    .pipe(sass())
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css')).pipe(browserSync.reload({stream: true}));
});

gulp.task('default', function () {
  gulp.start('styleguide', 'styles', 'svgstore', 'svg-file-include');
});


gulp.task('browserify', function () {
  return browserify(['components/**/*.js'], {
    debug: false,
    uglify: true
  })
    .pipe(gulp.dest('js'));
});

gulp.task('svgstore', function () {
  return gulp
    .src('images/svg-sprites/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('images'));
});

gulp.task('svg-file-include', function () {
  gulp.src(['components/svg-include/template/svg-include.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './'
    }))
    .pipe(gulp.dest('./components/svg-include/'));
});

gulp.task('lint', function () {
  gulp.src('components/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
