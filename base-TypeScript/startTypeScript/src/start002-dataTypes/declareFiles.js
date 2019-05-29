// 声明文件
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
// =======================================================
// =======================================================
// 什么是声明语句
// 假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了。
// 我们通常这样获取一个 id 是 foo 的元素：
// 但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西：
$('#foo');
jQuery('#foo');
// 这时，我们需要使用 declare var 来定义它的类型：
// declare var jQuery: (selector: string) => any;
// 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，
// 仅仅会用于编译时的检查，在编译结果中会被删除。
// 除了 declare var 之外，还有其他很多种声明语句，将会在后面详细介绍。
// =======================================================
// =======================================================
// 什么是声明文件
// 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件。
// =======================================================
// =======================================================
// 第三方声明文件
// 当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了。
// 我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。
// @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
// npm install @types/jquery --save-dev
// 可以在这个页面 [http://microsoft.github.io/TypeSearch/] 搜索你需要的声明文件。
// =======================================================
// =======================================================
// 全局变量 声明
$$('div');
jq('div');
jq(function () { });
var cat = new Animal('Tom');
console.log(cat.name);
cat.sayHi();
var directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
jQuery.ajax('/api/get_somethins');
jQuery2.ajax('/api/get_something');
console.log(jQuery2.version);
var e = new jQuery2.Event();
e.blur(jQuery2.EventType.CustomClick);
jQuery3.ajax('/api/get_something');
jQuery3.fn.extend({
    check: function () {
        return this.each(function () {
            this.checked = true;
        });
    }
});
jQuery4.fn.extend({
    check: function () {
        return this.each(function () {
            this.checked = true;
        });
    }
});
var settings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery5.ajax('/api/post_something', settings);
var settings2 = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery6.ajax('/api/post_something', settings);
jQuery7('#foo');
jQuery7.ajax('/api/get_something');
