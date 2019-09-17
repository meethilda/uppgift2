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
    // Find HTML path
    return src(files.htmlPath)
        // Copy to folder 'Pub'
        .pipe(dest('pub')
    );
}

// Copy CSS
function copyCSS() {
    // Find CSS path
    return src(files.cssPath)
        // Concat CSS files to one
        .pipe(concatCSS('main.css'))
        // Minify CSS file
        .pipe(cleanCss())
        // Copy to folder 'Pub'
        .pipe(dest('pub/css')
        // Sending changes for livereload
        .pipe(browserSync.stream())
    );
}

// Copy JS
function copyJS() {
    // Find JS path
    return src(files.jsPath)
        // Concat JS files to one
        .pipe(concat('main.js'))
        // Minify JS file
        .pipe(uglify())
        // Copy to folder 'Pub'
        .pipe(dest('pub/js')
    );
}

// Copy images
function copyImages() {
    // Find Images path
    return src(files.imagePath)
        // Copy to folder 'Pub'
        .pipe(dest('pub')
    );
}

// Task: Watcher
function watchTask() {
    // Start BrowserSync
    browserSync.init({
        server: {
            // Face to 'Pub' folder
            baseDir: 'pub/'
        }
    })
    // Watch for files path
    watch([files.htmlPath,
        files.cssPath,
        files.jsPath,
        files.imagePath],
        // Check for changes parallel from these functions
        parallel(copyHTML,
            copyCSS,
            copyJS,
            copyImages)
    // When change = reload browser
    ).on('change', browserSync.reload);
}

// Export functions to public
// First all functions parallel, then the watcher after
exports.default = series(
    parallel(copyHTML,
        copyCSS,
        copyJS,
        copyImages),
        watchTask);