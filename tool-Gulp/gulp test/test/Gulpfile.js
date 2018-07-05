// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var beautify = require('gulp-beautify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imageisux = require('gulp-imageisux');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegoptim = require('imagemin-jpegoptim');
var jpegRecompress = require('imagemin-jpeg-recompress');


/*
 * 合并文件
 * ---------------------------------------------*/

gulp.task('concat', function(){
    gulp.src('./src/*.css')
        .pipe(concat('concat.css'))
        .pipe(gulp.dest('./dist'));  // ./dist/concat.css
});
gulp.task('concat2', function(){
    gulp.src(['./src/home.css', './src/details.css'])
        .pipe(concat('concat2.css'))
        .pipe(gulp.dest('./dist'));  // ./dist/concat2.css
});


/*
 * 重命名文件
 * rename2和rename3两种方式可用的字段不统一
 * 请注意仅只使用下面所罗列并支持的字段
 * ---------------------------------------------*/

gulp.task('rename', function(){
    gulp.src('./src/hello.txt')
        .pipe(rename('hello-rename.html'))
        .pipe(gulp.dest('./dist'));  // ./dist/hello-rename.html
});
gulp.task('rename2', function(){
    gulp.src('./src/hello.txt')
        .pipe(rename(function(path){
            path.dirname += '/rename2';
            path.basename += '-rename';
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./dist'));  // ./dist/rename2/hello-rename.html
});
gulp.task('rename3', function(){
    gulp.src('./src/hello.txt')
        .pipe(rename({
            dirname: '/rename3',
            prefix: 'prefix-',
            basename: 'hello-rename',
            suffix: '-suffix',
            extname: '.html'
        }))
        .pipe(gulp.dest('./dist'));  // ./dist/rename3/prefix-hello-rename-suffix.html
});


/*
 * 压缩脚本
 * ---------------------------------------------*/

gulp.task('uglify', function() {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('./dist'));  // ./dist/jquery-cookie-min.js
});


/*
 * 压缩样式
 * maxLineLen 参数用于控制每行的最大代码量
 * ---------------------------------------------*/

gulp.task('uglifycss', function() {
    gulp.src('./src/*.css')
        .pipe(uglifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));  // ./dist/home.min.css
});
gulp.task('uglifycss2', function() {
    gulp.src('./src/*.css')
        .pipe(uglifycss({ maxLineLen: 100 }))
        .pipe(rename({ suffix: '.min2' }))
        .pipe(gulp.dest('./dist'));  // ./dist/home.min2.js
});


/*
 * 美化脚本
 * ---------------------------------------------*/

gulp.task('beautify', function(){
    gulp.src('./dist/*-min.js')
        .pipe(beautify({ indentSize: 4 }))
        .pipe(rename({ suffix: '-beautify' }))
        .pipe(gulp.dest('./dist'));  // ./dist/jquery-cookie-min-beautify.js
});


/*
 * 编译Sass
 * ---------------------------------------------*/

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});


/*
 * JavaScript错误和潜在问题侦测
 * ---------------------------------------------*/

gulp.task('jshint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
 * 图片压缩
 * ---------------------------------------------*/

// gulp.task('jpgmin', function() {
//     gulp.src('./src/images/*.jpg')
//         .pipe(imagemin({
//             use: [ jpegRecompress({ loops: 3 }) ]
//         }))
//         .pipe(gulp.dest('./dist/imagemin'));
// });
// gulp.task('jpgmin', function() {
//     gulp.src('./src/images/*.jpg')
//         .pipe(imagemin({
//             use: [ jpegoptim({ progressive: true, max: 85 }) ]
//         }))
//         .pipe(gulp.dest('./dist/imagemin'));
// });
// gulp.task('jpgmin', function() {
//     gulp.src('./src/images/*')
//         .pipe(imagemin({
//             progressive: true,
//             use: [ pngquant({ quality: '65-95', speed: 4 }) ]
//         }))
//         .pipe(gulp.dest('./dist/imagemin'));
// });
gulp.task('imagemin', function() {
    gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [ pngquant({ quality: '75-95', speed: 4 }) ]
        }))
        .pipe(gulp.dest('./dist/imagemin'));
});


// 默认任务
// 使用.run()方法关联和运行上面定义的任务
// 使用.watch()方法去监听指定目录的文件变化，当有文件变化时，会运行回调定义的其他任务。
gulp.task('default', function(){
    gulp.run('uglify');

    // 监听文件变化
    gulp.watch('./src/*.js', function(){
        gulp.run('uglify');
    });
});