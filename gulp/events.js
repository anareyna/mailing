var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('default', function(){
    runSequence('css', 'html', 'browser-sync:reload');
});

gulp.task('watch', ['browser-sync'], function(){
    return gulp.watch('./src/views/templates/*.pug', ['default']);
});
