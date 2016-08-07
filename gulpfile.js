var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bower = require('./bower');

function bowerPath(url){
    for (i = 0; i < url.length; i++) {
      url[i] = bower.main['bowerPath']+"/"+url[i];
    }
    return url;
}
// -----------------------CSS ASSETS---------------------------
var bowerSassPaths = bowerPath(bower.sassPaths);

gulp.task('sass', function() {
    gulp.src(bower.main['srcPath']+'scss/app.scss')
        .pipe(plugins.sass({
            includePaths: bowerSassPaths
        })
        .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions', 'ie >= 9']
        }))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename("website.css"))
        .pipe(gulp.dest(bower.main['destPath']+'/css'));

    gulp.src(bower.main['srcPath']+'scss/vendors/vendors.scss')
        .pipe(plugins.sass({
            includePaths: bowerSassPaths
        })
        .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions', 'ie >= 9']
        }))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename(bower.main['destFile']+".min.css"))
        .pipe(gulp.dest(bower.main['destPath']+'/css'));
});


// -----------------------JS ASSETS---------------------------

gulp.task('scripts', function() { 
    gulp.src([
            bower.main['srcPath']+'scripts/interface/**.js',
            bower.main['srcPath']+'scripts/**.js',
            bower.main['srcPath']+'scripts/vendors/tooltip.min.js'
        ]) 
        .pipe(plugins.concat('website.js'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(bower.main['destPath']+'/js')); 
    gulp.src(bowerPath(bower.jsVendorsFiles))
        .pipe(plugins.concat(bower.main['destFile']+'.min.js'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(bower.main['destPath']+'/js'));
});


// -----------------------FONTS ASSETS---------------------------
gulp.task('icons', function() { 
    return gulp.src(bowerPath(bower.iconsFiles)) 
        .pipe(gulp.dest(bower.main['destPath']+'/fonts')); 
});


// -------------------------WATCHERS----------------------------
gulp.task('default', ['sass','icons','scripts'], function() {
    gulp.watch([bower.main['srcPath']+'scss/**/**.scss'], ['sass']);
    gulp.watch([bower.main['srcPath']+'scripts/**/**.js'], ['scripts']);
});



