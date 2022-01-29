const { dest, src, watch } = require('gulp')
const browserSync = require('browser-sync')
const htmlmin = require('gulp-htmlmin')
const gulpSass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default

function sassTask() {
    // generate on first run
    src("./src/scss/*.scss")
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("./public"))
        .pipe(browserSync.stream())

    watch("./src/scss/**/*.scss", () => {

        console.log('scss files changed ...')

        return src("./src/scss/*.scss")
            .pipe(gulpSass({
                outputStyle: 'compressed'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest("./public"))
            .pipe(browserSync.stream())
    })
}

function htmlTask() {
    // generate on first run
    src("./src/pages/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true
        }))
        .pipe(dest("./public"))

    watch("./src/pages/*.html", () => {

        console.log('html files changed ...')

        return src("./src/pages/*.html")
            .pipe(htmlmin({
                collapseWhitespace: true,
                minifyCSS: true
            }))
            .pipe(dest("./public"))
    }).on('change', () => {
        browserSync.reload()
    })
}

function jsTask() {
    // generate on first run
    src("./src/js/*.js")
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("./public"))

    watch("./src/js/**/*.js", () => {

        console.log('js files changed ...')

        return src("./src/js/*.js")
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest("./public"))

    }).on('change', () => {
        browserSync.reload()
    })
}

function serveTask() {
    browserSync.init({
        server: "./public"
    })

    jsTask()
    htmlTask()
    sassTask()
}

exports.default = serveTask;
