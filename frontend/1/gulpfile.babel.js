const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');


const path = {
    src:  {
        js:   './src/js/init.js',
        css: './src/scss/init.scss',
    },
    dist: {
        js:   './assets/js/',
        css: './assets/css/',
    },
    watch: {
        css: './src/scss/**/*.scss',
        js:  './src/js/**/*.js',
    }
};

//server
gulp.task('connect', function() {
    connect.server({
        port: 8080,
        livereload: true
    });
});

//sass
gulp.task('css', function() {
    return gulp.src([path.src.css])
        .pipe(plumber())
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        // .pipe(csso())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());
});

//js
gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(babel())
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist.js))
        .pipe(connect.reload());
});


//watcher
gulp.task('watch', function(){
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['connect', 'watch']);