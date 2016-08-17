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
        .pipe(gulp.dest(bower.root['urlAssets']+'/css'));

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
        .pipe(gulp.dest(bower.root['urlAssets']+'/css'));
});


// -----------------------JS ASSETS---------------------------
var bowerjsVendorsFiles = bowerPath(bower.jsVendorsFiles);
bowerjsVendorsFiles.push(bower.root['srcPath']+'/scripts/vendors/tmp.js');

gulp.task('scripts', function() { 
    gulp.src([
            bower.root['srcPath']+'/scripts/interface/**.js',
            bower.root['srcPath']+'/scripts/**.js',
        ]) 
        .pipe(plugins.concat('website.min.js'))
        .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(gulp.dest(bower.root['urlAssets']+'/js')); 

    gulp.src(bower.root['srcPath']+'/scripts/vendors/vendors-rc.js')
        .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(plugins.rename("tmp.js"))
        .pipe(gulp.dest(bower.root['srcPath']+'/scripts/vendors'));

    gulp.src(bowerjsVendorsFiles)
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(gulp.dest(bower.root['urlAssets']+'/js'));
});

// -----------------------HTML MINIFY---------------------------
gulp.task('html', function() {
    return gulp.src(bower.root['srcPath']+'/phtml/**/**.phtml')
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(bower.root['urlViews']));
});

// -----------------------IMG OPTIMIZE---------------------------
gulp.task('images', function() {
    return gulp.src(bower.root['srcPath']+'/images/**/**.{jpg,jpeg,png}')
        .pipe(plugins.changed(bower.root['urlAssets']+'/img')) // Ignore unchanged files
        .pipe(plugins.imagemin()) // Optimize
        .pipe(gulp.dest(bower.root['urlAssets']+'/img'));
});

// -----------------------FONTS ASSETS---------------------------
gulp.task('icons', function() { 
    return gulp.src(bowerPath(bower.iconsFiles)) 
        .pipe(gulp.dest(bower.root['urlAssets']+'/fonts')); 
});


// -------------------------WATCHERS----------------------------
gulp.task('default', ['sass','icons','scripts', 'html', 'images'], function() {
    gulp.watch([bower.root['srcPath']+'/scss/**/**.scss'], ['sass']);
    gulp.watch([bower.root['srcPath']+'/scripts/**/**.js'], ['scripts']);
    gulp.watch([bower.root['srcPath']+'/phtml/**/**.phtml'], ['html']);
    gulp.watch([bower.root['srcPath']+'/images/**/**.**'], ['images']);
});



