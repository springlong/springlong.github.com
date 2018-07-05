// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var crass = require('gulp-crass');
var clean = require('gulp-clean');  // 删除插件


/*
 * Seajs的打包、发布
 * ---------------------------------------------*/

// 文件发布目录
var dir = 'static/system/detail/1.0.0/';

// 打包插件
var cmdPack = require('gulp-cmd-pack');

// 执行文件的打包处理
gulp.task('build', ['cleanDist'], function(){

    gulp.src('src/*.js', function(err, files) {

        // 遍历脚本文件
        files.map(function(addr){

            // 截取文件名称
            var reg = /src\/([^\/\.]+)\.js/.exec(addr);
            if(reg === null) return;
            var filePath = reg[0];
            var fileName = reg[1];

            // 单独打包
            gulp.src(filePath)
                .pipe(cmdPack({
                    // base路径
                    base : './src/',
                    // 模块id（自动补全脚本文件名，这里给出目录即可）
                    mainId: dir + fileName,
                    // 是否合并
                    isMerge: false,
                    // 忽略待合并的模块
                    ignore: []
                }))
                .pipe(gulp.dest('dist'));
        });
    });
});

// 执行文件的清理
gulp.task("cleanDist", function(){
    return gulp.src('./dist')
        .pipe(clean());
});

// 通过scp命令将本地文件部署到服务器
var scp = require('gulp-scp2');
gulp.task('deploy', function(){
    gulp.src('dist/**')
        .pipe(scp({
            dest: dir
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
// var jshint = require('gulp-jshint');
// gulp.task('jshint', function() {
//     gulp.src('src/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });


/*
 * 检测JavaScript的代码质量
 * ---------------------------------------------*/
// var jslint = require('gulp-jslint');
// gulp.task('jslint', function() {
//     gulp.src('src/*.js')
//         .pipe(jslint({
//             node: true,
//             evil: true,
//             nomen: true,
//             global: [],
//             predef: [], 
//             reporter: 'default',
//             errorsOnly: false
//         }))
//         .on('error', function (error) {
//             console.error(String(error));
//         });
// });


/*
 * 图片压缩
 * ---------------------------------------------*/

// var imageisux = require('gulp-imageisux');
// var smushit = require('gulp-smushit');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
// var jpegoptim = require('imagemin-jpegoptim');

// gulp.task('imagemin', function() {
//     gulp.src('src/**/*.{jpg,png,svg}')
//         .pipe(imagemin({
//             optimizationLevel: 3,
//             progressive: true
//         }))
//         .pipe(gulp.dest('dist'));

//     gulp.src('src/**/*.gif')
//         .pipe(smushit({ verbose: true }))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('pngquant', function() {
//     gulp.src('src/**/*.png')
//         .pipe(imagemin({
//             use: [ pngquant({ quality: '70-95', speed: 4 }) ]
//         }))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('jpegoptim', function() {
//     gulp.src('src/**/*.jpg')
//         .pipe(imagemin({
//             use: [ jpegoptim({ progressive: true }) ]
//         }))
//         .pipe(gulp.dest('dist'));
// });
// gulp.task('jpegoptim2', function() {
//     gulp.src('src/**/*.jpg')
//         .pipe(imagemin({
//             use: [ jpegoptim({ progressive: true, max: 80 }) ]
//         }))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('smushit', function() {
//     gulp.src('src/**/*.gif')
//         .pipe(smushit({ verbose: true }))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('zhitu', function() {
//     gulp.src('src/**/*{jpg,png,gif}')
//         .pipe(imageisux());
// });



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