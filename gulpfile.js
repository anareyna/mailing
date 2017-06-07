var gulp         = require('gulp');

var browserSync  = require('browser-sync');
var inlineSource = require('gulp-inline-source')
var htmlmin      = require('gulp-htmlmin');
var mjml         = require('gulp-mjml');
var pug          = require('gulp-pug');
var rename       = require('gulp-rename');
var util         = require('gulp-util');
var mail         = require('gulp-mail');
var runSequence  = require('run-sequence');

var gulpStylus = require('gulp-stylus');
var inlineCss = require('gulp-inline-css');

gulp.task('css', function() {
    return gulp.src("./src/stylus/*.styl")
      .pipe(gulpStylus({
          compress : false,
          linenos  : false,
          size: {
              title:'styles'
          }
      }))
      .pipe(gulp.dest("./css"));
});

gulp.task('html', function() {
    gulp.src('./src/views/templates/**/*.pug', {base : "./src/"})
        .pipe(pug({
            pretty  : true,
            basedir : "./src/"
        }))
        .pipe(inlineCss({
            preserveMediaQueries: true
          }))
        .pipe(gulp.dest('./build'));
});

/*
  Datos del nuevo gmail

  user: neo3dev@gmail.com
  pass: neo3dev123
  Fec Nac: 14 abril 1990

*/

var configSendEmail = {
  smtpInfo : {
    auth: {
      user: 'neo3dev@gmail.com',
      pass: 'neo3dev123'
    },
    host             : 'smtp.gmail.com',
    secureConnection : true,
    port             : 465
  },
  users : {
    victor : [
      'victormoralesf28@gmail.com',
      'victor_flores_5@hotmail.com',
      'neo3dev@gmail.com'
    ],
    ani : [
      'areynaw@gmail.com',
      'ana.reyna@orbis.com.pe'
    ]
  },
  userActive : require("os").userInfo().username
}

gulp.task('email-send', function() {
  return gulp.src('./build/demo.html')
    .pipe(mail({
      subject : 'Surprise!?',
      to      : configSendEmail.users[configSendEmail.userActive],
      from    : 'neo3dev <neo3dev@gmail.com>',
      smtp    : configSendEmail.smtpInfo
    }));

})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build/views/templates"
    },
		startPath: ''
  });
});

gulp.task('watch', function(){
    gulp.watch('./src/views/templates/**/*.pug', ['email']).on('change', browserSync.reload);
});

gulp.task('email', function(cb){
  runSequence('css', 'html', cb);
});

gulp.task('default', function(cb) {
  runSequence('email', 'watch', 'browser-sync', cb);
});
