var gulp      = require('gulp');
var pug       = require('gulp-pug');
var inlineCss = require('gulp-inline-css');

gulp.task('html', function() {
    return gulp.src('./src/views/templates/**/*.pug', {base : "./src/"})
        .pipe(pug({
            pretty  : true,
            basedir : "./src/"
        }))
        .pipe(inlineCss())
        .pipe(gulp.dest('./build'));
});
