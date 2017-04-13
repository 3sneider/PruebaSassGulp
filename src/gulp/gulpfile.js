'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('serve', ['sass'], function(){
    browserSync.init({ server: "../../apps"});
    gulp.watch("../sass/**/*.sass", ['sass']); // observa cambios y ejecuta la tarea
    gulp.watch("../../apps/**/*.html").on('change', browserSync.reload); // recarga html en caliente
});

gulp.task('sass', function(){
    return gulp.src('../sass/main.sass')
        .pipe(sass())
        .pipe(gulp.dest('../../apps/Themes/css'))
        .pipe(browserSync.stream());
});