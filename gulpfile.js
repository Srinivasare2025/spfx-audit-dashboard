'use strict';

const gulp = require('gulp');

const build = require('@microsoft/sp-build-web');

build.initialize(gulp);

// Alias serve to serve-deprecated
gulp.task('serve', gulp.series('serve-deprecated'));