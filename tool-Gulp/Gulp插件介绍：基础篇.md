# Gulp插件介绍：基础篇

在Gulp中，一个插件仅只负责完成一件事情，通常一个Gulp任务需要一个或多个插件的配合来共同完成。

通过对Gulp已有插件的了解，可以帮助我们快速利用现有的资源来高效完成工作中的相关需求。

下面，我将对Gulp中那些前端开发较为基础的需求插件进行整理说明，希望对你有所帮助。


## 1. gulp-concat


文件合并。

插件地址：[https://www.npmjs.com/package/gulp-concat/](https://www.npmjs.com/package/gulp-concat/)


代码示例：

<pre class="jsCode">
// 引入插件
var concat = require('gulp-concat');

// 将src目录下的所有css文件合并到dist目录下的concat.css文件中
gulp.task('concat', function(){
  gulp.src('src/*.css')
    .pipe(concat('concat.css'))
    .pipe(gulp.dest('dist'));  // --> dist/concat.css
});

// 将src目录下的home.css和details.css文件合并到dist目录下的concat2.css文件中
gulp.task('concat2', function(){
  gulp.src(['src/home.css', 'src/details.css'])
    .pipe(concat('concat2.css'))
    .pipe(gulp.dest('dist'));  // --> dist/concat2.css
});
</pre>

## 2. gulp-rename

文件重命名。

插件地址：[https://npmjs.org/package/gulp-rename/](https://npmjs.org/package/gulp-rename/)

代码示例：

<pre class="jsCode">
// 引入插件
var rename = require('gulp-rename');

// 直接指定完整的文件名称，包括扩展名
gulp.task('rename', function(){
  gulp.src('src/hello.txt')
    .pipe(rename('hello-rename.html'))
    .pipe(gulp.dest('dist'));  // --> dist/hello-rename.html
});

// 通过函数回调来变更输出结果的目录（path.dirname）、文件名（path.basename）、以及扩展名（path.extname）
gulp.task('rename2', function(){
  gulp.src('src/hello.txt')
    .pipe(rename(function(path){
      path.dirname += '/rename2';
      path.basename += '-rename';
      path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));  // --> dist/rename2/hello-rename.html
});

// 通过参数对象的传递来决定最终的输出路径
// dirname：相对于dist的子目录；prefix：文件名的前缀；basename：文件名本身；suffix：文件名的尾缀；extname：扩展名。
// 注意：之前的函数回调方式中，并没有prefix和suffix这两个属性设置
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
</pre>


## 3. gulp-uglify

压缩/美化JavaScript代码。

插件地址：[https://npmjs.org/package/gulp-uglify/](https://npmjs.org/package/gulp-uglify/)

代码示例：

<pre class="jsCode">
// 引用插件
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 将src目录下的所有脚本文件进行代码压缩，并在输出的文件中添加“.min”的尾缀
gulp.task('uglify', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));  // --> dist/jquery-cookie.min.js
});

// 将src目录下已经被压缩过的脚本做美化处理，行缩进四个空格，并将“.min”的尾缀去除
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
</pre>


## 4. gulp-uglifycss

压缩CSS代码。

插件地址：[https://www.npmjs.com/package/gulp-uglifycss/](https://www.npmjs.com/package/gulp-uglifycss/)

代码示例：

<pre class="jsCode">
// 引入插件
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');

// 对src目录下的所有css文件执行代码的压缩处理（压缩结果为一行显示）
gulp.task('uglifycss', function() {
  gulp.src('src/*.css')
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));  // --> dist/home.min.css
});

// 对src目录下的所有css文件执行代码的压缩处理（当选择器所处的行的代码量已经超过100个字符，那么下一个选择器将被换行输出）
gulp.task('uglifycss2', function() {
  gulp.src('src/*.css')
    .pipe(uglifycss({ maxLineLen: 100 }))
    .pipe(rename({ suffix: '.min2' }))
    .pipe(gulp.dest('dist'));  // --> dist/home.min2.css
});

// 对src目录下的所有css文件执行代码的压缩处理（选择器保持为单行输出）
gulp.task('uglifycss3', function() {
  gulp.src('src/*.css')
    .pipe(uglifycss({ maxLineLen: 1 }))
    .pipe(rename({ suffix: '.min3' }))
    .pipe(gulp.dest('dist'));  // --> dist/home.min3.css
});
</pre>

在这里需要解释下uglifycss函数中`maxLineLen`参数的含义——就是当某个选择器所处行的代码量已经超过了指定字节，那么下一个选择器的代码显示将会被换行输出。

`maxLineLen`参数的默认值为0，表示不做换行处理。

当我们设置`maxLineLen`参数的值为一个尽可能小的值时（例如：1），那么所有的选择器都将被单行输出。

**使用该插件可以达到的目的：**

1. 删除样式中的注释；
2. 去除样式中的多余空格；
3. 简化16进制颜色值的显示（#666666 --> #666)；
4. 可控性换行输出；

**该插件的不足：**

1. 没有提供对相同属性设置的选择器做合并处理；
2. 没有提供属性值的简化书写（例如`margin: 0 auto 0 auto`不能被转换为`margin: 0 auto`）；


## 5. gulp-crass

CSS代码优化。

插件地址：[https://www.npmjs.com/package/gulp-crass/](https://www.npmjs.com/package/gulp-crass/)

该插件既可以用于美化CSS代码，也可以用于压缩CSS代码，还也可以与`gulp-uglifycss`插件组合使用来弥补`gulp-uglifycss`的不足（即相同属性设置的选择器合并、以及属性值的简化书写）。

代码示例：

<pre class="jsCode">
// 引用插件
var crass = require('gulp-crass');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');

// 单纯对CSS代码做优化处理（通常用来对常规下的CSS文件做选择器的合并、属性值的精简化书写等处理操作）
gulp.task('crass', function(){
  gulp.src('src/*.css')
    .pipe(crass())
    .pipe(gulp.dest('dist'));  // --> dist/*.css
});

// 对src目录下经过压缩处理的CSS文件做美化处理，并将“.min”的尾缀去除
gulp.task('beautifycss', function(){
  gulp.src('src/*min.css')
    .pipe(crass())
    .pipe(rename(function(path){
      var basename = path.basename;
      path.basename = basename.replace('.min', '');
    }))
    .pipe(gulp.dest('dist'));  // --> dist/*.css
});

// 将gulp-crass、gulp-uglifycss组合使用来弥补gulp-uglifycss的不足
gulp.task('uglifycss', function(){
  gulp.src('src/*.css')
    .pipe(crass())
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));  // --> dist/*.min.css
});

// 通过设置crass函数的`pretty`参数为false来实现对CSS代码的压缩处理
gulp.task('uglifycss2', function(){
  gulp.src('src/*.css')
    .pipe(crass({ pretty: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));  // --> dist/*.min.css
});
</pre>


## 6. gulp-sass

执行对Sass文件的编译处理。

插件地址：[https://www.npmjs.com/package/gulp-sass/](https://www.npmjs.com/package/gulp-sass/)

代码示例：

<pre class="jsCode">
// 引入插件
var sass = require('gulp-sass');

// 对scss目录下的Sass文件执行编译处理，并输出到src目录下
gulp.task('sass', function() {
  gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src'));  // --> src/*.css
});
</pre>

`gulp-sass`插件编译后的css文件，里面的代码并不是十分美观，因此可以结合`gulp-crass`插件来达到最佳的代码输出：

<pre class="jsCode">
// 引入插件
var sass = require('gulp-sass');
var crass = require('gulp-crass');

// 与gulp-crass插件组合使用来弥补自身插件的不足
gulp.task('sass2', function() {
  gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(crass())
    .pipe(gulp.dest('src'));  // --> src/*.css
});
</pre>


## 9. gulp-jslint

检测JavaScript的代码质量，并给出相应的优化建议。

插件地址：[https://www.npmjs.com/package/gulp-jslint/](https://www.npmjs.com/package/gulp-jslint/)

代码示例：

<pre class="jsCode">
// 引用插件
var jslint = require('gulp-jslint');

// 对src目录下的js文件执行代码检测，如果存在错误则会在控制台中打印出来
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
</pre>

在这里建议使用代码编辑器中对应的JSHint插件（例如Sublime Text的[JSLint](https://sublime.wbond.net/packages/JSLint)插件）来进行代码的检测工作。这样可以在代码编辑的过程中就发现问题，并且还有利于对异常代码的定位与查看，并及时做修改处理。

关于JSLint的更多内容，请参考官方网站：[http://www.jslint.com/ ](http://www.jslint.com/)


## 8. gulp-jshint

与`gulp-jslint`一样，该插件也是用来对JavaScript执行代码的检验工作。不过比起JSLint而言，JSHint会更加轻量级一些。

插件地址：[https://www.npmjs.com/package/gulp-jshint/](https://www.npmjs.com/package/gulp-jshint/)

代码示例：

<pre class="jsCode">
// 引用插件
var jshint = require('gulp-jshint');

// 对src目录下的js文件执行代码检测，如果存在问题则会在控制台中打印出来
gulp.task('jshint', function() {
  gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
</pre>

在这里也同样建议使用代码编辑器中对应的JSHint插件（例如Sublime Text的[JSHint](https://packagecontrol.io/packages/JSHint)插件）来进行代码的检测工作。

关于JSHint的更多内容，请参考官方网站：[http://jshint.com/](http://jshint.com/)
