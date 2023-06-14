const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const $ = require('jquery');

// Compile scss into css
function style() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

// Copy script.js to the destination folder
function scripts() {
  return gulp.src('./js/script.js')
    .pipe(gulp.dest('./dist/js'));
}

// Watch for changes in files
function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
  gulp.watch('./js/script.js', gulp.series(scripts, browserSync.reload));
}

exports.style = style;
exports.scripts = scripts;
exports.watch = watch;






