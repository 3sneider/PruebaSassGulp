'use strict';

var gulp = require('gulp'); // crear tareas
var sass = require('gulp-sass'); // trabajar con sass & scss
var uglify = require('gulp-uglify'); // reduce o minifica codigo js
var pump = require('pump'); //  ayuda a uglify
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
        .pipe(gulp.dest('../../apps/Themes/css'))
        .pipe(browserSync.stream());
});

//gulp.task('comp', function(){
//    return gulp.src('../comp/**/*.js')
//        .pipe(uglify())
//        .pipe(gulp.dest('../../apps/Themes/js'))
//        .pipe(browserSync.stream());
//});

gulp.task('comp', function(cb){
    pump([
        gulp.src('../comp/*.js'),
        uglify(),
        gulp.dest('../../apps/Themes/js')
    ],
    cb
    );
});