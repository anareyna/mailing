var gulp = require('gulp');

var browserSync = require('browser-sync');
var inlinesource = require('gulp-inline-source')
var htmlmin = require('gulp-htmlmin');
var mjml = require('gulp-mjml');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var util = require('gulp-util');

gulp.task('email', function() {
    gulp.src('./src/views/templates/**/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(rename({
            extname: '.mjml'
        }))
        .pipe(mjml())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'));
});

/*
  Datos del nuevo gmail

  user: neo3dev@gmail.com
  pass: neo3dev123
  Fec Nac: 14 abril 1990

*/
var mail = require('gulp-mail');

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
    ani : []
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
      baseDir: "./build"
    },
		startPath: ''
  });
});

gulp.task('watch', function(){
    gulp.watch('./src/views/templates/**/*.pug', ['email']).on('change', browserSync.reload);
});

gulp.task('default', ['email', 'watch', 'browser-sync']);
