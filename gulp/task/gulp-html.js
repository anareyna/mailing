var gulp      = require('gulp');
var pug       = require('gulp-pug');
var inlineCss = require('gulp-inline-css');
var through2  = require('through2');
var fs        = require('fs');

var basePath  = './';

gulp.task('html', function() {
    return gulp.src('./pug/modules/**/*.pug', { base : basePath})
        .pipe(pug({
            pretty  : true,
            basedir : basePath
        }))
        .pipe(inlineCss({
            //removeLinkTags: false,
            removeStyleTags: false
        }))
        .pipe(through2.obj(function(chunk, encoding, callback) {
            var content      = chunk.contents.toString();
            var cssContent = fs.readFileSync('./css/media-queries/media-queries.css').toString();
            var newContent   = content.replace(/mediaQueries/gm, cssContent)
            chunk.contents   = new Buffer(newContent, "utf-8");
            callback(null, chunk);
         }))
        .pipe(gulp.dest('./build'));
});
