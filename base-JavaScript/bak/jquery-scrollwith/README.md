# jQuery scrollWith

基于jQuery的侧栏跟随插件

## 需求

对于网站的文章页而言，侧栏的高度往往是固定的，但是文章内容的高度却不是这样，因此我们会面对一个问题——在文章内容相对较多的页面中，当我们将滚动条拉到一定距离之后侧栏就会留空，这样将浪费侧栏中用于信息展示的空间价值。面对这样的问题，我们可以借助侧栏跟随来予以解决。

侧栏跟随，顾名思义，就是让网页中的侧栏跟随着浏览器滚动条的滚动而做出相关的定位调整，以保证侧栏始终有内容进行展现。

## 效果

在正式介绍如何使用侧栏跟随之前，大家可以点击下述链接先行查看侧栏跟随存在的几种表现行为：

1. [无跟随（侧栏高度大于视窗）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/nofollow-higher.html)
2. [无跟随（侧栏高度小于视窗）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/nofollow-shorter.html)
3. [侧栏跟随-整个侧栏（侧栏高度大于视窗）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-all-higher.html)
4. [侧栏跟随-整个侧栏（侧栏高度小于视窗）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-all-shoter.html)
5. [侧栏跟随-单个模块（第一个）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-single-first.html)
6. [侧栏跟随-单个模块（最后一个）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-single-last.html)
7. [侧栏跟随-功能配置（整个侧栏，距离底部距离400px）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-option-distanceToBottom.html)
8. [侧栏跟随-功能配置（最后一个模块，距离顶部距离20px）](//htmlpreview.github.io/?https://github.com/springlong/jquery-scrollwith/blob/master/demo/scrollwith-option-distanceToTop.html)

## HTML结构

侧栏跟随需要在标准的多栏布局结构中进行实现，且必须由一个外围容器包含这些栏。

HTML代码示例如下：

```html
<div id="header">头部</div>
<div id="content">
    <div id="main">内容</div>
    <div id="aside">
        <div id="aside-1">侧栏模块-1</div>
        <div id="aside-2">侧栏模块-2</div>
        <div id="aside-3">侧栏模块-3</div>
        <div id="aside-4">侧栏模块-4</div>
    </div>
</div>
<div id="footer">尾部</div>
```

## JavaScript调用

为了实现对侧栏跟随的多需求的兼容处理，我们是以侧栏的单个子模块为单位进行程序处理的。如果我们需要将前面代码示例中任意一个侧栏模块做跟随处理，我们只需要获取该模块所构建的jQuery对象，然后执行 `.scrollWith()` 方法，例如：

```js
//将侧栏中的第一个模块做侧栏跟随处理
$("#aside-1").scrollWith();
```

如果我们需要将布局示例中连续的多个侧栏模块做跟随处理，那么我们需要将这些模块外套一层容器，然后对该容器做代码调用：

```html
<div id="aside">
    <div id="asideInner">
        <div id="aside-1">侧栏模块-1</div>
        <div id="aside-2">侧栏模块-2</div>
    </div>
    <div id="aside-3">侧栏模块-3</div>
    <div id="aside-4">侧栏模块-4</div>
</div>
```

```js
//通过添加外围容器间接实现第一个模块和第二个模块的侧栏跟随处理
$("#asideInner").scrollWith();
```

如果我们需要将布局示例中的整个侧栏做跟随处理，那么我们就需要在所有侧栏模块的外围套一层容器，然后对该容器做代码调用：

```html
<div id="aside">
<div id="asideInner">
    <div id="aside-1">侧栏模块-1</div>
    <div id="aside-2">侧栏模块-2</div>
    <div id="aside-3">侧栏模块-3</div>
    <div id="aside-4">侧栏模块-4</div>
</div>
</div>
```

```js
//通过添加外围容器间接实现整个侧栏的跟随处理
$("#asideInner").scrollWith();
```

**注：本套侧栏跟随的特效组件不支持非相邻的多个侧栏做侧栏跟随处理。**

除了上面的标准调用外， `.scrollWith()` 方法还提供了一个options参数用来进行相关的功能配置，该参数是一个对象，包含distanceToTop和distanceToBottom两个成员，代码示例如下：

```js
//带有功能配置的代码调用
$("#asideInner").scrollWith({

	//当侧栏模块的高度小于文档可视区高度，且处于跟随状态时，表示该侧栏模块需要距离文档可视区顶部的偏移量，默认为0
    distanceToTop: 20,

	//当处于跟随状态时，表示该侧栏模块需要距离文档底部的最小高度，默认不做设定（该需求的优先级大于distanceToTop）
    distanceToBottom: 400
});
```

## 注意事项

1. 为了保证侧栏跟随效果能够有效正确地执行，最好确保侧栏的第一个子模块不带`margin-top`设置，同时最后一个子模块不带`margin-bottom`设置。
2. 本套插件考虑侧栏容器设置margin的情况，但并不考虑设置padding和border的情况。
3. 本套插件会对主体内容高度变更时对侧栏的定位信息做相关调整，但并不考虑侧栏的内容高度会发生变更的情况。

