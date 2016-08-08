var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bower = require('./bower');

function bowerPath(urls){
    for (i = 0; i < urls.length; i++) {
      urls[i] = bower.root['bowerPath']+"/"+urls[i];
    }
    return urls;
}
// -----------------------CSS ASSETS---------------------------
var bowercssVendorsFiles = bowerPath(bower.cssVendorsFiles);
bowercssVendorsFiles.push(bower.root['srcPath']+'/scss/vendors/tmp.css');

gulp.task('sass', function() {
    gulp.src(bower.root['srcPath']+'/scss/app.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({browsers: ['last 20 versions', 'ie >= 9']}))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename('website.min.css'))
        .pipe(gulp.dest(bower.root['destPath']+'/css'));

    gulp.src(bower.root['srcPath']+'scss/vendors/bootstrap/app.scss')
        .pipe(plugins.sass({
            includePaths: bower.root['bowerPath']+'/bootstrap-sass/assets/stylesheets'
            }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({browsers: ['last 20 versions', 'ie >= 9']}))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename("tmp.css"))
        .pipe(gulp.dest(bower.root['srcPath']+'scss/vendors'));

    gulp.src(bowercssVendorsFiles)
        .pipe(plugins.concat('vendors.min.css'))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(bower.root['destPath']+'/css'));
});


// -----------------------JS ASSETS---------------------------
var bowerjsVendorsFiles = bowerPath(bower.jsVendorsFiles);
bowerjsVendorsFiles.push(bower.root['srcPath']+'/scripts/vendors/tooltip.min.js');

gulp.task('scripts', function() { 
    gulp.src([
            bower.root['srcPath']+'/scripts/interface/**.js',
            bower.root['srcPath']+'/scripts/**.js',
        ]) 
        .pipe(plugins.concat('website.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(bower.root['destPath']+'/js')); 

    gulp.src(bowerjsVendorsFiles)
        .pipe(plugins.concat('vendors.min.js'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(bower.root['destPath']+'/js'));
});


// -----------------------FONTS ASSETS---------------------------
gulp.task('icons', function() { 
    return gulp.src(bowerPath(bower.iconsFiles)) 
        .pipe(gulp.dest(bower.root['destPath']+'/fonts')); 
});


// -------------------------WATCHERS----------------------------
gulp.task('default', ['sass','icons','scripts'], function() {
    gulp.watch([bower.root['srcPath']+'/scss/**/**.scss'], ['sass']);
    gulp.watch([bower.root['srcPath']+'/scripts/**/**.js'], ['scripts']);
});



