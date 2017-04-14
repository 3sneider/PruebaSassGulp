'use strict';

var gulp = require('gulp'); // 1
var sass = require('gulp-sass'); // 2
var cssnano = require('gulp-cssnano'); // 3
var uglify = require('gulp-uglify'); // 4
var imagemin = require('gulp-imagemin'); // 5
var autoprefixer = require('gulp-autoprefixer'); // 6
var htmlmin = require('gulp-htmlmin'); // 7
var browserSync = require('browser-sync').create(); // 8


gulp.task('default', ['styles', 'javascript'], function(){ // a
    browserSync.init({ server: "../../apps"}); // b)
    gulp.watch("../comp/*.js", ['javaScript']).on('change', browserSync.reload); // c
    gulp.watch("../sass/**/*.sass", ['styles']);
    gulp.watch("../../apps/**/*.html").on('change', browserSync.reload); // d
    // gulp.watch("ruta html", [html]);
});

// I
gulp.task('styles', function(){
    return gulp.src('../sass/main.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../../apps/Themes/css'))
        .pipe(browserSync.stream());
});

// II
gulp.task('javascript', function(){
    gulp.src('../comp/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../../apps/Themes/js'))
});

// III
gulp.task('images', function(){
    gulp.src('../optm/*')
        .pipe(imagemin()) // png, jpg, gif, svg
        .pipe(gulp.dest('../../apps/Themes/Img'))
});

// IV
gulp.task('html', function(){
    return gulp.src('ruta de archivos html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('ruta de nuevos htmls'));
});


/*///////////////////////////////////////////////////////////////////////////////////////////

GULP

1 - crear tareas
2 - trabajar con sass & scss
3 - minifica el codigo css
4 - reduce o minifica codigo js
5 - ayuda a reducir unos kb en las imagenes
6 - renderiza el css y coloca los prefixers
7 - minifica codigo html
8 - sincroniza mi ide con el navegador

a - tarea principal, se ejecuta cuando se inicia gulp
b - carga desde donde se le indique en un servidor locar
c - esta pendiente si hat cambios en los archivos para pasarlos por la tarea
d - recarga en navegador si siente cambios del whatch

I -     estructura de una tarea, se normbra la tarea, se le pasan parametros a la tarea,
        se procesa la tarea con alguno de los modulos importados y por ulltimo el resultado
        que obtenemos lo pasamos a otrs ubicacion

II -    tarea para minificar javascript

III -   esta tarea de optimizar imagenes no es recomendable pero si permitido
        el agregarla a tu serve o default, porque? por que si se actualiza cada vez
        que guardamos cambios al comienzo no problem pero entre mas imagenes hallan,
        cada vez se va a demorar mas la actualizacion

IV -    esta tarea minimina el codigo html de la misma manera que js y css
        si surge la necesidad esta sera la tarea que busque  nuestro default



() => syntax de la ultima version de javascript


///////////////////////////////////////////////////////////////////////////////////////////*/