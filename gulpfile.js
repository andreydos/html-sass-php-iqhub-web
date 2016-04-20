'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'), 
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    notify = require("gulp-notify"),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        img: 'build/img/',
        styles: 'build/css/'  
    },
    src: {
        html: 'src/*.html',
        img: 'src/img/**/*.*',
        styles: 'src/styles/main.scss'
    },
    watch: {
        html: 'src/**/*.html',
        img: 'src/img/**/*.*',
        styles: 'src/styles/**/*.scss'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "iqhub-webstudio"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('styles:build', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 5 version'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)       
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'styles:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });  
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    }); 
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);