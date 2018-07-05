# Gulp插件介绍：图片优化

图片优化，在前端开发的工作中占据了重要一环。对图片的优化程度，会直接影响到网页的加载速度和用户体验，因此我们需要对图片优化这一事项保持高度重视和了解。

关于前端图片优化的相关事项，大家可以参考下面的几篇文章：

* [Web性能优化：图片优化](http://blog.cabbit.me/web-image-optimization/)
* [前端开发：浅谈图片优化的方法](http://www.yixieshi.com/ucd/11322.html)
* [图片优化的那些工具](http://ued.ctrip.com/blog/?p=3582)

而在这里，我将为大家整理Gulp中已有的几款用于图片压缩的插件，希望大家能够合理的选用这些插件来代替日常图片优化的繁琐工作。


## 1. gulp-imagemin

使用多款压缩工具的组合来完成图片的压缩处理。

插件地址：[https://www.npmjs.com/package/gulp-imagemin/](https://www.npmjs.com/package/gulp-imagemin/)

该插件集成了对JPG、PNG、GIF和SVN这四种格式图片的压缩处理。针对不同类型的图片，该插件采用的压缩工具也有所不同。

在该插件中，将默认使用下面的这四款压缩工具来处理不同类型的图片：

* [gifsicle ](https://github.com/kevva/imagemin-gifsicle "imagemin-gifsicle插件地址")：压缩GIF图片；
* [jpegtran](https://github.com/kevva/imagemin-jpegtran "imagemin-jpegtran插件地址")：压缩JPG图片；
* [optipng](https://github.com/kevva/imagemin-optipng "imagemin-optipng插件地址")：压缩PNG图片；
* [svgo](https://github.com/kevva/imagemin-svgo "imagemin-svgo插件地址")：压缩SVG图片；

imagemin使用的这四款默认的压缩工具都是对图片执行无损压缩，因此并不会对图片的质量造成下降。

代码示例：

<pre class="jsCode">
// 引入插件	
var imagemin = require('gulp-imagemin');

// 对src/images目录下的所有图片进行压缩处理，
// 代码执行完毕后，将会在控制台输出本次操作整体的压缩大小和压缩比率。
gulp.task('imagemin', function() {
    gulp.src('src/images/**')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist'));
});
</pre>

在这里强调下在`imagemin`函数调用中使用到的三个参数：

* `optimizationLevel`：该参数属于optipng工具的的参数选项，用来设置对PNG图片的压缩强度，取值为0~7，其中0的强度最弱，7的强度最强。不过在实际测试中，这8个不同的取值并没有造成压缩结果的变化。取值3是该插件的默认值，建议保持默认设置。
* `progressive`：该参数属于jpegtran工具的参数选项，默认值为false。该参数的设置用来指示是否对JPG图片执行progressive编码，目的是使图片能够渐进式的展现——即先显示模糊的图片，再逐步清晰。在测试的过程中发现，只有当设置该参数为true时，才具备压缩的实质性效果。而在默认值的情况下，则几乎没有压缩效果。
* `interlaced`：该参数属于gifsicle工具的参数选项，默认值为false。该参数的设置相当于JPG图片的progressive编码，因此建议设置为true。

关于使用上面所示任务的执行效果，我简单描述下：

1. 在PS中png-8品质为256的图片，经过imagemin采用[optipng](http://optipng.sourceforge.net/ "optipng项目官网")无损压缩后，可明显减少30%左右的大小。
2. 在PS中JPG品质为60的图片，经过imagemin采用[jpegtran](http://www.softpedia.com/get/Programming/Components-Libraries/jpegtran.shtml "jpegtran项目官网")无损压缩后，可以减少3%左右的大小。毕竟是无损压缩，能减少3%，也是可以接受的。
3. 在测试的过程中，发现imagemin使用的[gifsicle](http://www.lcdf.org/gifsicle/ "gifsicle项目官网")工具对Gif图片的压缩并没有效果，稍微有些小失望。
4. 通过[svgo](https://github.com/svg/svgo "svgo项目官网")工具可以将IIIustrator生成的SVN文件的大小减少至50%左右（从1.27KB缩减到665字节）。


## 2. imagemin-pngquant

采用[pngquant](http://pngquant.com/ "pngquant项目官网")工具对PNG图片进行有损压缩处理（针对imagemin的一款插件）。

插件地址：[https://www.npmjs.com/package/imagemin-pngquant/](https://www.npmjs.com/package/imagemin-pngquant/)

代码示例：

<pre class="jsCode">
// 引用插件
var pngquant = require('imagemin-pngquant');

// 对src目录以及其所有子目录下的PNG图片做有损压缩的处理
gulp.task('pngquant', function() {
   gulp.src('src/**/*.png')
        .pipe(pngquant({ quality: '70-95', speed: 4 }))
        .pipe(gulp.dest('dist'));
});
</pre>

直接使用上面所示的pngquant插件进行处理，虽然能够达到预期结果，但是在执行完毕后并不会输出对图片的压缩情况，因此建议跟`gulp-imagemin`插件搭配使用。

`gulp-imagemin`插件提供了一个`use`数组参数，可以通过该参数来指定额外的优化工具，代码示例如下：

<pre class="jsCode">
// 引用插件
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// 对src/images目录下的所有JPG、GIF、SVG文件使用imagemin默认的优化工具进行无损压缩，
// 而对于PNG图片，则使用pngquant这款优化工具进行有损压缩处理。
gulp.task('pngquant', function() {
    gulp.src('src/images/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            use: [ pngquant({ quality: '70-95', speed: 4 }) ]
        }))
        .pipe(gulp.dest('dist'));
});
</pre>

pngquant的参数说明：

1. `quality`参数的作用是保证图片经过优化处理后，图片质量的取值范围（0~100）。取值越小，表示压缩比率越大，同时的图片的质量也就越差。在测试过程中发现，当设置最低取值为60或65时，部分图片的质量会严重下降，因此最终我选择了70作为最低值。
2. `speed`参数的设置决定了图片优化的执行速度，取值范围为1~10，默认值为3。其中10的执行速度最快，对应的压缩比率最小；而1的执行速度最慢，对应的压缩比率最大。在测试过程中发现，无论我设置哪一个值它们的执行时间都差不多，不过压缩比率确实1的最大，10的最小，最后我选择了一个较为折中的值：4。

实测效果：

在设置`quality`的取值范围为70~95，以及`speed`为4的情况下，可以在尽可能不影响图片质量的前提下去缩减文件的大小。

在测试过程中，我们以PNG-8品质为256的图片为例，最终的图片输出可以降低70%左右的大小（从3.78KB缩减到1.13KB）。


## 3. imagemin-jpegoptim

采用[jpegoptim](http://freecode.com/projects/jpegoptim/ "jpegoptim项目官网")工具对JPG图片进行无损或有损压缩处理（针对imagemin的一款插件）。

插件地址：[https://www.npmjs.com/package/imagemin-jpegoptim/](https://www.npmjs.com/package/imagemin-jpegoptim/)

代码示例：

<pre class="jsCode">
// 引用插件
var imagemin = require('gulp-imagemin');
var jpegoptim = require('imagemin-jpegoptim');

// 对src目录以及所有子级目录下的JPG图片进行无损压缩处理
gulp.task('jpegoptim', function() {
    gulp.src('src/**/*.jpg')
        .pipe(imagemin({
            use: [ jpegoptim({ progressive: true }) ]
        }))
        .pipe(gulp.dest('dist'));
});

// 增加max参数以进行有损压缩处理
gulp.task('jpegoptim2', function() {
    gulp.src('src/**/*.jpg')
        .pipe(imagemin({
            use: [ jpegoptim({ progressive: true, max: 80 }) ]
        }))
        .pipe(gulp.dest('dist'));
});
</pre>

在jpegoptim中，`progressive`参数的目的同jpegtran中的参数设置，而`max`参数则用来设置图片可允许的最大品质(取值为0~100)。

该插件进行无损压缩的效果，以PS中JPG品质为60的图片，经过压缩处理后，可以减少3%左右的大小。

当设置`max`参数为80进行有损压缩后，压缩比例可以达到18~20%左右，当然有损压缩会降低图片品质，视不同情况予以采用。


## 4. gulp-smushit

使用雅虎的[Smushit](http://www.smushit.com/ysmush.it/)工具对JPG、PNG、GIF图片做无损压缩处理。

插件地址：[https://www.npmjs.com/package/gulp-smushit/](https://www.npmjs.com/package/gulp-smushit/)

代码示例：

<pre class="jsCode">
// 引用插件
var smushit = require('gulp-smushit');

// 对src/images目录下的所有图片做无损压缩处理，并显示压缩率的统计情况
gulp.task('smushit', function() {
    gulp.src('src/images/**')
        .pipe(smushit({ verbose: true }))
        .pipe(gulp.dest('dist'));
});
</pre>

与`gulp-imagemin`插件使用的默认处理工具相比，这款插件在压缩PNG和GIF方面的压缩比率要相对高一点，而对于JPG图片的压缩比率则要低一些。

不过这款插件的明显不足就是不具备执行速度的优势。在测试过程中，我使用了91张JPG图片，在使用`gulp-imagemin`插件从开始执行到压缩完毕并输出文件只需要大概7秒，而`gulp-smushit`则需要超过5分钟。

出于执行速度方面的考虑，并不建议使用这款插件来对PNG和JPG图片做压缩优化处理。

由于该插件对GIF的处理能力要明显高于imagemin使用的gifsicle工具，而且项目中使用GIF图片的数量较少，因此建议使用这款插件来做GIF图片的优化处理，以弥补imagemin的不足。

建议使用imagemin和smushit的组合方式来完成对图片（JPG、PNG、GIF、SVG）的无损压缩的处理：

<pre class="jsCode">
// 引入插件
var imagemin = require('gulp-imagemin');
var smushit = require('gulp-smushit');

// 任务主体
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
</pre>


## 5. gulp-imageisux

腾讯出品的一款图片优化工具——[智图](http://zhitu.tencent.com/)的gulp插件。

插件地址：[https://www.npmjs.com/package/gulp-imageisux/](https://www.npmjs.com/package/gulp-imageisux/)

代码示例：

<pre class="jsCode">
// 引用插件
var imageisux = require('gulp-imageisux');

// 对src/images目录下的所有图片做优化处理
// 默认输出：优化后的图片存放至'/dest/'目录下，生成的webp格式的图片存放在'/webp/'目录下
gulp.task('zhitu', function() {
    gulp.src('src/images/**')
        .pipe(imageisux());
});
</pre>


关于智图的使用说明，可以参考腾讯ISUX的博客文章：[智图—源于QQ空间图片WebP化的思考](http://isux.tencent.com/zh-hans/zhitu.html)。

而对于智图的使用，大家可以尝试使用其在线服务（即[官方网站](http://zhitu.tencent.com/)）。

在使用`gulp-imageisux`的测试过程中，由于无法正常完成优化处理，所以没有得到优化结果，不过其线上产品是可以正常使用的。后期将会继续跟踪这款插件的使用情况。


## 总结

通过上面的内容介绍，相信对于使用Gulp来进行图片优化一定有了属于你自己的见解。

在这里推荐使用`gulp-imagemin`和`gulp-smushit`的组合方式来实行对JPG、PNG、GIF、SVG的无损压缩处理。

如果追求对PNG图片的更高压缩比率，则使用`imagemin-pngquant`插件来完成。

如果追求对JPG图片的更高压缩比率，则使用`imagemin-jpegoptim`插件来实现。

最后，由于本人的技术水平有限，文章内容难免存在错误和不足，如有问题还望各位多多包涵和指正，不甚感激！






