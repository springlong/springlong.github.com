// 引入 gulp
var gulp = require('gulp');

// 引入组件
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var crass = require('gulp-crass');
var smushit = require('gulp-smushit');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegoptim = require('imagemin-jpegoptim');
var clean = require('gulp-clean');  // 删除插件



/*
 * 通过scp命令将本地文件部署到服务器
 * ---------------------------------------------*/
var scp = require('gulp-scp2');
gulp.task('scp', function(){

    gulp.src('static/apps/**')
        .pipe(scp({
            dest: 'static/apps/'
        }))
        .on('error', function(err) {
            console.log(err);
        });

    // gulp.src('jquery/**')
    //     .pipe(scp({
    //         dest: 'static/sea-modules/jquery/'
    //     }))
    //     .on('error', function(err) {
    //         console.log(err);
    //     });

    // gulp.src('seajs/**')
    //     .pipe(scp({
    //         dest: 'static/sea-modules/seajs/'
    //     }))
    //     .on('error', function(err) {
    //         console.log(err);
    //     });
});


/*
 * 图片压缩
 * 使用 gulp-imagemin 对 JPG、PNG、SVG 做无损压缩
 * 使用 gulp-smushit 对 GIF 做无损压缩
 * 使用 imagemin-pngquant 对 PNG 进行有损压缩
 * 使用 imagemin-jpegoptim 对 JPG 进行有损压缩
 * ---------------------------------------------*/

var jpgMax = 85;
var dirSrc = 'static/global/images/src/active/2016/test/old/';
var dirDest = dirSrc.replace('old/', '');

gulp.task('imagemin', function () {
    gulp.src(dirSrc + '**.jpg')
        .pipe(imagemin({
            use: [jpegoptim({progressive: true, max: jpgMax})]
        }))
        .pipe(gulp.dest(dirDest));

    gulp.src(dirSrc + '**.png')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            use: [pngquant({quality: '70-85', speed: 4})]
        }))
        .pipe(gulp.dest(dirDest));

    gulp.src(dirSrc + '**.gif')
        .pipe(smushit({verbose: true}))
        .pipe(gulp.dest(dirDest));
});

gulp.task('imagemin-lossless', function () {
    gulp.src(dirSrc + '**.{jpg,png,svg}')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true
        }))
        .pipe(gulp.dest(dirSrc + '/imagemin-lossless'));

    gulp.src(dirSrc + '**.gif')
        .pipe(smushit({verbose: true}))
        .pipe(gulp.dest(dirSrc + '/imagemin-lossless'));
});




/**
 * 文件打包提测
 * 根据线上url，将本地构建好的css、js文件进行整合，用于提测
 * 由于某些文件目录带有 -new 尾缀，则需要在这里将 线上 url 的路径也带有 -new
 * ---------------------------------------------*/

var distUrls = [
    '/static/global/scripts/2.0.0/common.js'
    ,'/static/global/styles/2.0.0/products.css'
    ,'/static/global/images/1.0.0/star_positive.png'
    ,'/static/member/favorite/2.0.0/wish.css'
    ,'/static/member/favorite/2.0.0/favorite.css'
    ,'/static/member/favorite/2.0.0/favorite.js'
    ,'/static/system/cart/3.0.0/cart.js'
    ,'/static/system/cart/3.0.0/cart.css'
    ,'/static/system/country/2.0.0/country.css'
    ,'/static/system/home/2.0.0/home.css'
    ,'/static/system/list/2.0.0/list.js'
    ,'/static/system/search/2.0.0/search.js'
    ,'/static/global/common/2.0.0/product.create.js'
    ,'/static/global/images/1.0.0/shop-noBrand.png'
    ,'/static/system/shop-new/3.0.0/shop.css'
    ,'/static/system/shop/2.0.0/shop.wish.css'
    ,'/static/system/shop/2.0.0/shop.want.js'
    // ,'/passport/static/login_signup/signup/2.0.0/signup.css'
    ];

// 构建文件之前，先清理文件夹
gulp.task('urlPackage', ['clean'], function () {

    var i = 0, len = distUrls.length;

    // 遍历url对应的dist目录，将文件拷贝至 urlPackage 目录下
    for(; i < len; i++) {

        (function(i){

            var url = distUrls[i];
                url = url.indexOf('/') === 0 ? url.substring(1) : url;
            var version = (/\/([\d\.]+)\//.exec(url) || [])[1];
            var sourceDir = url.replace(version, 'dist');
            var isPassport = sourceDir.indexOf('passport/') >= 0;

            // 注册登录特殊处理
            if(isPassport) {
                sourceDir = sourceDir.replace('passport/', '');
            }

            console.log('......' + sourceDir);

            gulp.src(sourceDir, {base: '.'})
                .pipe(rename(function(path){
                    path.dirname = path.dirname.replace('dist', version).replace('-new', '');

                    if(isPassport) {
                        path.dirname = 'passport/' + path.dirname;
                    }
                }))
                .pipe(gulp.dest('urlPackage'));
        })(i);
    }
});

// 执行文件的清理
gulp.task("clean", function(){
    return gulp.src('./urlPackage')
        .pipe(clean());
})


// 默认任务
// 使用.run()方法关联和运行上面定义的任务
// 使用.watch()方法去监听指定目录的文件变化，当有文件变化时，会运行回调定义的其他任务。
gulp.task('default', function () {

    // gulp.run('uglify');

    // // 监听文件变化
    // gulp.watch('./src/*.js', function(){
    //     gulp.run('uglify');
    // });
});