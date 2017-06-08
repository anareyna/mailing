var gulp       = require('gulp');
var gulpStylus = require('gulp-stylus');

var basePath   = process.cwd();

gulp.task('css', function() {
    return gulp.src(['./stylus/**/*.styl', '!./stylus/_**/*.styl'], { base: basePath + '/stylus' })
      .pipe(gulpStylus({
          compress : false,
          use: [
            function(style) {
                style.define("$pathBase", basePath)
            }
          ],
          linenos  : false,
          size: {
              title:'styles'
          }
      }))
      .pipe(gulp.dest('./css'));
});
