var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
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
    .pipe(plugins.sass({
        includePaths: sassPaths
    })
    .on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers: ['last 20 versions', 'ie >= 9']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('assets/css'));
});

// gulp.task('minify-css', function() {
//     return gulp.src('assets/css/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('assets/css'));
// });

var iconsPaths = [
    'bower_components/bootstrap-sass/assets/fonts/*/**.*',
    'bower_components/devicons/fonts/**.*',
    'bower_components/devicon/fonts/**.*',
    'bower_components/font-awesome/fonts/**.*'
];

gulp.task('icons', function() { 
    return gulp.src(iconsPaths) 
    .pipe(gulp.dest('./assets/fonts')); 
});


gulp.task('default', ['sass','icons'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    // gulp.watch(['assets/css/*.css'], ['minify-css']);
});
