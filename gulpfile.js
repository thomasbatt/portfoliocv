var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bower = require('./bower');

var urlbowerPath = bower.root.bowerPath,
    srcPath = bower.root.srcPath,
    urlAssets = bower.root.urlAssets,
    urlViews = bower.root.urlViews;


function bowerPath(urls){
    for (i = 0; i < urls.length; i++) {
      urls[i] = urlbowerPath+"/"+urls[i];
    }
    return urls;
}
// -----------------------CSS ASSETS---------------------------
var bowercssVendorsFiles = bowerPath(bower.cssVendorsFiles);
bowercssVendorsFiles.push(srcPath+'/scss/vendors/tmp.css');

gulp.task('sass', function() {
    gulp.src(srcPath+'/scss/app.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({browsers: ['last 20 versions', 'ie >= 9']}))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.base64({
            baseDir: urlAssets+'/**',
            extensions: ['svg','png','jpg'],
            maxImageSize: 8*1024,
            // debug: true
        }))
        .pipe(plugins.rename('website.min.css'))
        .pipe(gulp.dest(urlAssets+'/css'));

    gulp.src(srcPath+'scss/vendors/bootstrap/app.scss')
        .pipe(plugins.sass({
            includePaths: urlbowerPath+'/bootstrap-sass/assets/stylesheets'
            }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({browsers: ['last 20 versions', 'ie >= 9']}))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename("tmp.css"))
        .pipe(gulp.dest(srcPath+'scss/vendors'));

    gulp.src(bowercssVendorsFiles)
        .pipe(plugins.concat('vendors.min.css'))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(urlAssets+'/css'));
});


// -----------------------JS ASSETS---------------------------
var bowerjsVendorsFiles = bowerPath(bower.jsVendorsFiles);
bowerjsVendorsFiles.push(srcPath+'/scripts/vendors/tmp.js');

gulp.task('scripts', function() { 
    gulp.src([
            srcPath+'/scripts/interface/**.js',
            srcPath+'/scripts/**.js',
        ]) 
        .pipe(plugins.concat('website.min.js'))
        // .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(gulp.dest(urlAssets+'/js')); 

    gulp.src(srcPath+'/scripts/vendors/vendors-rc.js')
        .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(plugins.rename("tmp.js"))
        .pipe(gulp.dest(srcPath+'/scripts/vendors'));

    gulp.src(bowerjsVendorsFiles)
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(plugins.uglify({ mangle:false, compress:false, beautify:true }))
        .pipe(gulp.dest(urlAssets+'/js'));
});

// -----------------------HTML MINIFY---------------------------
gulp.task('html', function() {
    return gulp.src(srcPath+'/phtml/**/**.{phtml,html}')
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        // .pipe(plugins.img64())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(urlViews));
});

// -----------------------IMG OPTIMIZE---------------------------
gulp.task('images', function() {
    return gulp.src(srcPath+'/images/**/**.{jpg,jpeg,png}')
        .pipe(plugins.changed(urlAssets+'/img')) // Ignore unchanged files
        .pipe(plugins.imagemin()) // Optimize
        .pipe(gulp.dest(urlAssets+'/img'));
});

// -----------------------FONTS ASSETS---------------------------
gulp.task('icons', function() { 
    return gulp.src(bowerPath(bower.iconsFiles)) 
        .pipe(gulp.dest(urlAssets+'/fonts')); 
});


// -------------------------WATCHERS----------------------------
gulp.task('default', ['sass','icons','scripts', 'html', 'images'], function() {
    gulp.watch([srcPath+'/scss/**/**.scss', '!'+srcPath+'/scss/**/tmp.css'], ['sass']);
    gulp.watch([srcPath+'/scripts/**/**.js', '!'+srcPath+'/scripts/**/tmp.js'], ['scripts']);
    gulp.watch([srcPath+'/phtml/**/**.{phtml,html}'], ['html']);
    gulp.watch([srcPath+'/images/**/**.**'], ['images']);
});



