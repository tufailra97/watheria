const gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/asset'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/*.scss', ['sass']);
});


gulp.task('default', ['watch']);