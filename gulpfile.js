var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');

var sassPaths = [
    'bower_components/bootstrap-sass/assets/stylesheets',
    'bower_components/animate.css',
    'bower_components/devicons/css',
    'bower_components/devicon',
    'bower_components/elh-tooltip',
    'bower_components/font-awesome/scss'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
    .pipe($.sass({
        includePaths: sassPaths
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
        browsers: ['last 20 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('assets/css'));
});

// gulp.task('minify-css', function() {
//     return gulp.src('assets/css/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('assets/css'));
// });

gulp.task('icons', function() { 
    gulp.src('bower_components/bootstrap-sass/assets/fonts/*/**.*') 
        .pipe(gulp.dest('./assets/fonts')); 
    gulp.src('bower_components/devicons/fonts/**.*') 
        .pipe(gulp.dest('./assets/fonts')); 
    gulp.src('bower_components/devicon/fonts/**.*') 
        .pipe(gulp.dest('./assets/fonts')); 
    gulp.src('bower_components/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./assets/fonts')); 
});


gulp.task('default', ['sass', 'icons'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    // gulp.watch(['assets/css/*.css'], ['minify-css']);
});
