var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var uglifycss = require("gulp-uglifycss");

gulp.task('js', function () {
    return gulp.src('script/*')
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
    gulp.src('./style/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['css', 'js']);
