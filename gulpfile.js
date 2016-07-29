var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');

var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
var lazypipe = require('lazypipe');

var bower = require('./bower');
var bo = 'bower_components/'; 


// -----------------------CSS ASSETS---------------------------
var sassPaths = [
    bo+'bootstrap-sass/assets/stylesheets',
    bo+'animate.css',
    bo+'devicons/css',
    bo+'devicon',
    bo+'elh-tooltip',
    bo+'font-awesome/scss'
];
gulp.task('sass', function() {
    gulp.src('scss/app.scss')
        .pipe(plugins.sass({
            includePaths: sassPaths
        })
        .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions', 'ie >= 9']
        }))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename("website.css"))
        .pipe(gulp.dest('assets/css'));

    gulp.src('scss/vendors.scss')
        .pipe(plugins.sass({
            includePaths: sassPaths
        })
        .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions', 'ie >= 9']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename("vendors.min.css"))
        .pipe(gulp.dest('assets/css'));
});


// -----------------------JS ASSETS---------------------------
var jsVendorsFiles = [
    bo+'angular/angular.min.js',
    'scripts/vendors/angular-rc.min.js',
    bo+'jquery/dist/jquery.min.js',
    bo+'ngSticky/dist/sticky.min.js',
    bo+'wow/dist/wow.min.js',
    bo+'elh-tooltip/tooltip.js',
];
gulp.task('scripts', function() { 
    gulp.src(['scripts/scripts.js','scripts/vendors/website-templates.js']) 
        .pipe(concat('website.js'))
        .pipe(gulp.dest('assets/js')); 
    gulp.src(jsVendorsFiles)
        .pipe(concat('vendors.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});


// -----------------------FONTS ASSETS---------------------------
var iconsFiles = [
    bo+'bootstrap-sass/assets/fonts/*/**.*',
    bo+'devicons/fonts/**.*',
    bo+'devicon/fonts/**.*',
    bo+'font-awesome/fonts/**.*'
];
gulp.task('icons', function() { 
    return gulp.src(iconsFiles) 
        .pipe(gulp.dest('assets/fonts')); 
});

 // --------------------Build AngularJS --------------------------
gulp.task('buildAngular', function() {
    return lazypipe()
        .pipe(plugins.ngHtml2js, {
            moduleName: bower.name,
            prefix: '/' + bower.name + '/',
            stripPrefix: '/scripts'
        })
        .pipe(concat, bower.name + '-templates.js')
        .pipe(gulp.dest, 'scripts/')
        // .pipe(livereload)();
});


// -------------------------WATCHERS----------------------------
gulp.task('default', ['sass','icons','scripts'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['scripts/**/*.*'], ['scripts']);
});



