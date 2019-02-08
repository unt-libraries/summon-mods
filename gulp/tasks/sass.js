'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var bundleLogger = require('../util/bundleLogger');
var config = require('../config.js').sass;


var sassTask = function(devMode) {
    // Log when bundling starts
    bundleLogger.start(config.src);

    return gulp.src(config.src)
        .pipe(gulpif(devMode, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix("last 2 version", "> 5% in US", "not ie < 8"))
        .pipe(nano({zindex: false}))
        .pipe(gulpif(devMode, sourcemaps.write('.')))
        // .pipe(gulpif(!devMode, uncss(config.uncssOpts)))
        .pipe(gulp.dest(config.dest))
        .on('end', function() {
            bundleLogger.end(config.src);
        });
};


gulp.task('sass', function() {
    return sassTask();
});

gulp.task('watchSass', function() {
    gulp.watch('summon_2_src/sass/**/*.scss').on('change', function() {
        sassTask(true);
    });
})

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = sassTask;