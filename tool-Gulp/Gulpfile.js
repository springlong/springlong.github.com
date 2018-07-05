// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');
var sass = require('gulp-sass');
var crass = require('gulp-crass');
var imageisux = require('gulp-imageisux');
var smushit = require('gulp-smushit');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegoptim = require('imagemin-jpegoptim');


// jsdoc 

// var jsdoc = require("gulp-jsdoc");
// gulp.task("jsdoc", function(){
//     gulp.src("src/test.js")
//         .pipe(jsdoc('jsdoc'));
//         // .pipe(gulp.dest("dist"));
// });



/*
 * Seajs构建
 * ---------------------------------------------*/
var cmdPack = require('gulp-cmd-pack');
gulp.task('seajs', function(){
    gulp.src('src/a.js')
        .pipe(cmdPack({
            base : 'static/system/1.0.0/'
        }))
        .pipe(gulp.dest('dist'));
});


/*
 * 通过scp命令将本地文件部署到服务器
 * ---------------------------------------------*/
var scp = require('gulp-scp2');
gulp.task('scp', function(){
    gulp.src('dist/**')
        .pipe(scp({
            host: '172.16.20.222',
            username: 'webstatic',
            password: 'J386Esap',
            dest: '/static/global/images/1.0.0/'
        }));
});



/*
 * 简单测试
 * ---------------------------------------------*/

gulp.task('hello', function(){
    console.log('Hello gulp!');
});


/*
 * 合并文件
 * ---------------------------------------------*/

gulp.task('concat', function(){
    gulp.src('src/*.css')
        .pipe(concat('concat.css'))
        .pipe(gulp.dest('dist'));  // --> dist/concat.css
});
gulp.task('concat2', function(){
    gulp.src(['src/home.css', 'src/details.css'])
        .pipe(concat('concat2.css'))
        .pipe(gulp.dest('dist'));  // --> dist/concat2.css
});


/*
 * 重命名文件
 * ---------------------------------------------*/

gulp.task('rename', function(){
    gulp.src('src/hello.txt')
        .pipe(rename('hello-rename.html'))
        .pipe(gulp.dest('dist'));  // --> dist/hello-rename.html
});
gulp.task('rename2', function(){
    gulp.src('src/hello.txt')
        .pipe(rename(function(path){
            path.dirname += '/rename2';
            path.basename += '-rename';
            path.extname = '.html';
        }))
        .pipe(gulp.dest('dist'));  // --> dist/rename2/hello-rename.html
});
gulp.task('rename3', function(){
    gulp.src('src/hello.txt')
        .pipe(rename({
            dirname: '/rename3',
            prefix: 'prefix-',
            basename: 'hello-rename',
            suffix: '-suffix',
            extname: '.html'
        }))
        .pipe(gulp.dest('dist'));  // --> dist/rename3/prefix-hello-rename-suffix.html
});


/*
 * 压缩脚本
 * ---------------------------------------------*/

gulp.task('uglify', function() {
    gulp.src(['src/*.js', '!src/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));  // --> dist/jquery-cookie.min.js
});


/*
 * 美化脚本
 * ---------------------------------------------*/

gulp.task('beautify', function() {
    gulp.src('src/*.min.js')
        .pipe(uglify({
            output: {beautify: true, indent_level: 4}
        }))
        .pipe(rename(function(path){
            var basename = path.basename;
            path.basename = basename.replace('.min', '');
        }))
        .pipe(gulp.dest('dist'));  // --> dist/jquery-cookie.js
});


/*
 * 压缩样式
 * maxLineLen 参数用于控制每行的最大代码量
 * ---------------------------------------------*/

gulp.task('uglifycss', function() {
    gulp.src('src/*.css')
        .pipe(uglifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));  // --> dist/home.min.css
});
gulp.task('uglifycss2', function() {
    gulp.src('src/*.css')
        .pipe(uglifycss({ maxLineLen: 100 }))
        .pipe(rename({ suffix: '.min2' }))
        .pipe(gulp.dest('dist'));  // --> dist/home.min2.css
});
gulp.task('uglifycss3', function() {
    gulp.src('src/*.css')
        .pipe(uglifycss({ maxLineLen: 1 }))
        .pipe(rename({ suffix: '.min3' }))
        .pipe(gulp.dest('dist'));  // --> dist/home.min3.css
});


/*
 * CSS代码优化
 * ---------------------------------------------*/

gulp.task('crass', function(){
    gulp.src('src/*.css')
        .pipe(crass())
        .pipe(gulp.dest('dist'));
});
gulp.task('beautifycss', function(){
    gulp.src('src/*min.css')
        .pipe(crass())
        .pipe(rename(function(path){
            var basename = path.basename;
            path.basename = basename.replace('.min', '');
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('uglifycss', function(){
    gulp.src('src/*.css')
        .pipe(crass())
        .pipe(uglifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
gulp.task('uglifycss2', function(){
    gulp.src('src/*.css')
        .pipe(crass({ pretty: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});


/*
 * 编译Sass
 * ---------------------------------------------*/

gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src'));
});
gulp.task('sass2', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(crass())
        .pipe(gulp.dest('src'));
});
gulp.task('sass3', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(crass())
        .pipe(uglifycss())
        .pipe(gulp.dest('src'));
});


/*
 * 检测JavaScript代码中的错误和潜在问题
 * ---------------------------------------------*/

gulp.task('jshint', function() {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/*
 * 检测JavaScript的代码质量
 * ---------------------------------------------*/

gulp.task('jslint', function() {
    gulp.src('src/*.js')
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            global: [],
            predef: [], 
            reporter: 'default',
            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});


/*
 * 图片压缩
 * ---------------------------------------------*/

gulp.task('imagemin', function() {
    gulp.src('src/**/*.{jpg,png,svg}')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('src/**/*.gif')
        .pipe(smushit({ verbose: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('pngquant', function() {
    gulp.src('src/**/*.png')
        .pipe(imagemin({
            use: [ pngquant({ quality: '70-95', speed: 4 }) ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('jpegoptim', function() {
    gulp.src('src/**/*.jpg')
        .pipe(imagemin({
            use: [ jpegoptim({ progressive: true }) ]
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('jpegoptim2', function() {
    gulp.src('src/**/*.jpg')
        .pipe(imagemin({
            use: [ jpegoptim({ progressive: true, max: 80 }) ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('smushit', function() {
    gulp.src('src/**/*.gif')
        .pipe(smushit({ verbose: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('zhitu', function() {
    gulp.src('src/**/*{jpg,png,gif}')
        .pipe(imageisux());
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