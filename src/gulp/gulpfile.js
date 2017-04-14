'use strict';

var gulp = require('gulp'); // crear tareas
var sass = require('gulp-sass'); // trabajar con sass & scss
var cssnano = require('gulp-cssnano'); // minifica el codigo css
var uglify = require('gulp-uglify'); // reduce o minifica codigo js
var pump = require('pump'); //  ayuda a uglify
var imagemin = require('gulp-imagemin'); //  ayuda a uglify
var autoprefixer = require('gulp-autoprefixer'); // renderiza el css y coloca los prefixers
var browserSync = require('browser-sync').create(); // sincroniza mi ide con el navegador


gulp.task('serve', ['sass'], function(){
    browserSync.init({ server: "../../apps"});
    gulp.watch("../comp/*.js", ['comp']); // observa cambios y ejecuta la tarea
    gulp.watch("../sass/**/*.sass", ['sass']); // observa cambios y ejecuta la tarea
    gulp.watch("../../apps/**/*.html").on('change', browserSync.reload); // recarga html en caliente
});

gulp.task('sass', function(){
    return gulp.src('../sass/main.sass')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../../apps/Themes/css'))
        .pipe(browserSync.stream());
});

gulp.task('comp', function(cb){
    pump([
        gulp.src('../comp/*.js'),
        uglify(),
        gulp.dest('../../apps/Themes/js')
    ],
    cb
    );
});

// esta tarea de optimizar imagenes no es recomendable pero si permitido
// el agregarla a tu serve o default, porque? por que si se actualiza
// cada vez que guardamos cambios al comienzo no problem pero entre mas imagenes
// hallan, cada vez se va a demorar mas la actualizacion
gulp.task('optm', () => // syntax de la ultima version de javascript
    gulp.src('../optm/*')
        .pipe(imagemin()) // png, jpg, gif, svg
        .pipe(gulp.dest('../../apps/Themes/Img'))
);