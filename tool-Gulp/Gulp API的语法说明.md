# gulp API的语法说明

gulp只有五个API方法： `gulp.task`，`gulp.src`，`gulp.dest`，`gulp.watch`，和`gulp.run`。

## gulp.task

注册任务，语法格式如下：

<pre class="jsCode">
gulp.task(name[, deps], fn)
</pre>

* `name`：类型（`string`，必填），任务名称。
* `deps`：类型（`Array`，可选），本次任务运行时要执行的其他依赖的任务列表（优先于主任务执行）。
* `fn`：类型（`Functon`，必填），任务体，即该任务所执行的操作。

代码示例：

<pre class="jsCode">
gulp.task('taskname', ['array', 'of', 'task', 'names'], function() {
	return gulp.src('filename')
		.pipe(...)
		.pipe(...)
		// until the last step
		.pipe(...);
});
</pre>

在上面的代码示例中，演示了Gulp任务体的基本执行模式。

可以这么理解——首先获取要处理的文件，传递给下一个环节处理，然后把返回的结果继续传递给下一个环节...直到所有环节完成。

其中`pipe`就是`stream`模块里负责传递流数据的方法而已（不是gulp的方法），至于最开始的`return`则是把整个任务的`stream`对象返回出去，以便任务和任务之间可以依次传递执行。

下面的代码示例仅在控制台中打印“Hello gulp!”：

<pre class="jsCode">
gulp.task('hello', function(){
	console.log('Hello gulp!');
});
</pre>

### 默认task

默认task是指——当在命令行中仅敲入`glup`并回车就会被默认执行的任务。该任务约定命名为“default”：

<pre class="jsCode">
gulp.task('default', function(){
	// Your default task
});
</pre>

## gulp.src

指明源文件路径，语法格式如下：

<pre class="jsCode">
gulp.src(globs[, options])
</pre>

* `globs`：类型（`string` or `Array`，必填），指定源文件的路径，可以是单个路径，也可以是个路径数组。
* `options`：类型（`Object`，可选），配置选项。
* `options.buffer`：类型（`Boolean`，默认：true），设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用。
* `options.read`：类型（`Boolean`，默认：true），设置为false，将不执行读取文件操作，并返回file.content为null。
* `options.base`：类型（`String`，默认：''），设置输出路径以源文件路径的某个组部分为基础向后进行拼接，如果该值不是源文件路径的一部分，那么最终的输出路径为源文件路径。

代码示例：

<pre class="jsCode">
gulp.task('sass',  function() {
    return gulp.src('./scss/abc/somename.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'));  // Writes: './dist/somename.css'
});

gulp.task('sass',  function() {
    return gulp.src('./scss/abc/somename.scss', {base: ''})
        .pipe(sass())
        .pipe(gulp.dest('dist'));  // Writes: './dist/somename.css'
});

gulp.task('sass',  function() {
    return gulp.src('./scss/abc/somename.scss', {base: 'scss/'})
        .pipe(sass())
        .pipe(gulp.dest('dist'));  // Writes: './dist/abc/somename.css'
});

gulp.task('sass',  function() {
    return gulp.src('./scss/abc/somename.scss', {base: '...'})
        .pipe(sass())
        .pipe(gulp.dest('dist'));  // Writes: './scss/abc/somename.css'
});
</pre>

### globs参数常用字符串

* `js/app.js`：精确匹配文件。
* `js/*.js`：仅匹配js目录下的所有后缀为.js的文件。
* `js/**.js`：匹配js目录及其子目录下所有后缀为.js的文件。
* `js/**/*.js`：匹配js目录及其后代目录下所有后缀为.js的文件。
* `js/{a,b}.js`：匹配js目录下的a.js或者b.js。
* `*.+(js|css)`：匹配根目录下所有后缀为.js或者.css的文件。
* `!js/app.js`：从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用。

`!`匹配符通常需要通过数组格式来组合使用，才能达到预期目的。

例如，在js目录下包含了压缩和未压缩的JavaScript文件，现在我们想要创建一个任务来压缩还没有被压缩的文件，我们需要先匹配目录下所有的JavaScript文件，然后排除后缀为.min.js的文件:

<pre class="jsCode">
gulp.src(['js/*.js', '!js/*.min.js'])
</pre>

### 通配符说明

* `*`：匹配任意数量的字符，除了`/`。
* `?`：匹配单个字符，除了`/`。
* `**`：匹配任意数量的字符，包括`/`。
* `{,}`：以逗号分隔的“或”表达式列表。
* `+(|)`：以|分隔的“或”表达式列表。
* `!`：匹配取反。


## gulp.dest

指明任务处理后的目标输出路径，语法格式如下：

<pre class="jsCode">
gulp.dest(path[, options])
</pre>

* `path`：类型（`string` or `Function`，必填），目标输出路径，可以是字符串，也可以是一个返回文件夹路径的函数。
* `options`：类型（`Object`，可选）配置选项。
* `options.cwd`：类型（`string`），默认值：`process.cwd()`，即前脚本的工作目录的路径，当文件输出路径为相对路径将会用到。
* `options.mode`：类型（`string`），默认值：0777，用于指定被创建文件夹的权限。

关于相对路径：

* `./`：相对于当前目录。
* `../`：相对于上一级目录。

代码示例：

<pre class="jsCode">
gulp.src('./client/templates/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('./build/templates'))
	.pipe(minify())
	.pipe(gulp.dest('./build/minified_templates'));
</pre>

## gulp.watch

监视文件的变化并运行相应的任务。


### 语法格式（一）：

<pre class="jsCode">
gulp.watch(glob[, opts], tasks)
</pre>

* `glob`：类型（`string` or `Array`，必填），指定源文件的路径，可以是单个路径，也可以是个路径数组。路径匹配和上述`gulp.src()`方法路径匹配的模式一样。
* `opts`：类型（`Object`，可选），配置选项，具体可参考<https://github.com/shama/gaze>。
* `tasks`：类型（`Array`，必填），监听到文件变化后，需要被执行的任务的名称所组成的数组。

代码示例：

<pre class="jsCode">
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
</pre>

详情请参见[官方API](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob-opts-tasks)。


### 语法格式（二）：

<pre class="jsCode">
gulp.watch(glob[, opts, cb])
</pre>

* `cb(event)`：类型（`Function`,可选），监听到文件的变化后，被执行的回调函数。会传递出一个对象类型的event参数。

cb回调函数的`event`参数：

* `event.type`：类型（`string`），事件类型——`added`（添加）、`changed`（变更）、`deleted`（删除）。
* `event.path`：类型（`string`），发生变更的文件的路径。

代码示例：

<pre class="jsCode">
gulp.watch('js/**/*.js', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
</pre>

详情请参见[官方API](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob-opts-cb)。


## gulp.run

运行指定的任务列表，语法格式如下：

<pre class="jsCode">
gulp.run(task1, task2, ..., taskn)
</pre>

代码示例：

<pre class="jsCode">
gulp.run('lint', 'sass', 'scripts');
</pre>