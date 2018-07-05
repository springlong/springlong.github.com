// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var crass = require('gulp-crass');
var gutil = require('gulp-util');
var clean = require('gulp-clean');  // 删除插件

// 文件发布目录
var dir = 'static/system/detail/1.0.0/';

// 打包插件
var cmdPack = require('gulp-cmd-pack');

// 执行文件的打包处理
gulp.task('build', ['cleanDist', 'buildCss'], function(){

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
                .pipe(rename({
                    suffix: '-debug'
                }))
                .pipe(gulp.dest('dist'))
                .pipe(uglify())
                .pipe(rename(function(path){
                    path.basename = path.basename.replace('-debug', '');
                }))
                .pipe(gulp.dest('dist'));
        });
    });
});

// 样式处理
gulp.task('buildCss', function(){
    gulp.src('src/*.css')
        .pipe(crass({ pretty: true }))
        .pipe(rename({ suffix: '-debug' }))
        .pipe(gulp.dest('dist'))
        .pipe(uglifycss())
        .pipe(rename(function(path){
            path.basename = path.basename.replace('-debug', '');
        }))
        .pipe(gulp.dest('dist'));

    gulp.src('src/*.css', function(err, files) {
        files.map(function(addr){
            gutil.log('Build ' + addr.replace(/\//g, '\\'));
        });
    });
});

// 目录清理
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