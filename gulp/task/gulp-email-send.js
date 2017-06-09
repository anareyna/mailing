/*
  -- Datos del nuevo gmail --
  user: neo3dev@gmail.com
  pass: neo3dev123
  Fec Nac: 14 abril 1990
  
  -- Ejemplo --
  gulp email-send --path publicacion/concesionario/pagar-paquete.html
*/

var gulp = require('gulp');
var mail = require('gulp-mail');
var argv = require('yargs').argv;

var config = {
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
    return gulp.src('./build/html/' + argv.path)
        .pipe(mail({
            subject : "Mensaje de prueba: " + argv.path,
            to      : config.users[config.userActive],
            from    : 'neo3dev <neo3dev@gmail.com>',
            smtp    : config.smtpInfo
        }));
})
