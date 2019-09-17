const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const concatCSS = require('gulp-concat-css');
const browserSync = require('browser-sync').create();

// Files
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imagePath: "src/**/*.+(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF|svg|SVG)"
}

// Copy HTML
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub')
    );
}

// Copy CSS
function copyCSS() {
    return src(files.cssPath)
        .pipe(concatCSS('main.css'))
        .pipe(cleanCss())
        .pipe(dest('pub/css')
        .pipe(browserSync.stream())
    );
}

// Copy JS
function copyJS() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js')
    );
}

// Copy images
function copyImages() {
    return src(files.imagePath)
        .pipe(dest('pub')
    );
}

// Task: Watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    })
    watch([files.htmlPath,
        files.cssPath,
        files.jsPath,
        files.imagePath],
        parallel(copyHTML,
            copyCSS,
            copyJS,
            copyImages)
    ).on('change', browserSync.reload);
}

exports.default = series(
    parallel(copyHTML,
        copyCSS,
        copyJS,
        copyImages),
        watchTask);