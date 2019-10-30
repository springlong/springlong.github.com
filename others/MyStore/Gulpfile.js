var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('brand', function(){
    return gulp.src('brand/*.js')
        .pipe(concat('brand.js'))
        // .pipe(gulp.dest('dist'))
        // .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('data', function(){
    return gulp.src('data/*.js')
        .pipe(concat('data.js'))
        // .pipe(gulp.dest('dist'))
        // .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});