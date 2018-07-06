# jQuery lazyload

基于jQuery实现的图片懒加载插件

## 背景分析

当我们访问一个图片量非常大的网页时，在我们下拉滚动条时往往会看到一些图片会淡入显示出来，这就是对网页中的图片应用了懒加载的处理结果。图片的懒加载，是指网页中的图片默认是不会被加载的，仅当用户可以看到它的时候才会被加载。这样可以有效提高网页的整体加载速度，也可以为服务器端节省一笔可观的带宽资源。试想一下，当用户访问网页的前面一半就离开了，而浏览器则已经将网页下半部分的所有图片都加载了，是不是有点浪费了呢？

为此，我们开发了用于图片懒加载的这个特效组件，该组件的一些特点如下:

1. 为需要懒加载的图片设置一张透明图片作为占位使用，然后将真实的图片地址通过“data-src”属性进行设置，从而让这些图片默认不会被加载；

2. 当用户滑动滚动条时，该组件程序将进行监测，同时会将当前可视窗口内以及位于之前的所有应用了懒加载的图片做加载处理；

3. 可以提供一个布尔值参数（`viewport`)，当为true时表示仅只加载可视窗口内的图片，而不会去加载位于之前的没有被加载的图片；

4. 可以提供一个容器参数（`container`），表示懒加载的图片位于这个容器内，只有当该容器滚动条滑动时才会对这些图片进行懒加载处理；

5. 可以提供一个阀值参数（`threshold`），表示可以提前加载一定范围内位于可视区域之外的图片；

6. 可以提供一个效果参数（`effect`），当图片加载后，可以选择使用普通显示（`show`）、淡入显示（`fadeIn`）、下滑显示（`slideDown`）三种显示效果；

7. 可以提供一个毫秒参数（`timeout`），用来对延迟加载的触发进行延迟处理。该参数的目的主要是通过延迟控制来避免每次滚动事件会多次触发懒加载处理。使用该参数设置后，图片的加载会有一点视觉延迟。建议根据实际需求选择使用，最好可以跟`viewport`和`threshold`参数共同使用来达到懒加载的最佳效果。

8. 提供了对非img元素做背景图片的懒加载处理；

9. 由于处于隐藏状态（display:none）的图片无法获得正确的位置信息，所以对这些图片应用懒加载将会在执行代码调用后被立即加载。对于选项卡等切换板块，其图片懒加载应使用切换组件本身自带的懒加载功能来进行实现。

## 效果欣赏

在介绍如何使用图片懒加载之前，大家可以先点击下面的链接进行演示案例的查看。

为了更好地理解懒加载的作用和相关实现机制，建议使用控制台中的网络面板来监测懒加载图片的请求。

1. [前景图-无效果](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-none.html)
2. [前景图-下滑显示效果](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-slidedown.html)
3. [前景图-淡入效果](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn.html)
4. [前景图-淡入效果（提前加载）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-threshold.html)
5. [前景图-淡入效果（可视窗口）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-viewport.html)
6. [前景图-淡入效果（可视窗口 + 提前加载）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-viewport-threshold.html)
7. [前景图-淡入效果（可视窗口 + 延迟处理）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-viewport-timeout.html)
8. [前景图-淡入效果（指定容器-垂直）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-container-scrolly.html)
9. [前景图-淡入效果（指定容器-水平）](http://www.fedlife.cn/demo/jquery/jquery-lazyload/fore-fadeIn-container-scrollx.html) 
10. [背景图-无效果](http://www.fedlife.cn/demo/jquery/jquery-lazyload/back-none.html)

## HTML代码

### HTML代码：前景图

为前景图片实现懒加载处理，首先需要为该图片设置一张透明的图片来作为占位使用，然后将真实的图片地址通过“`data-src`”的自定义属性进行设置，从而让这些图片默认不会被加载，代码示例如下：

```html

<img src="images/default.gif" data-src="images/theReal.jpg" alt="描述文本" />

```

### HTML代码：背景图

为背景图片实现懒加载处理，虽然不需要像前景图那样设置一张占位图片，但必须确保容器的其他背景属性设置正确，避免显示效果偏移预期。同时，也需要将真实的图片地址通过“`data-src`”这个自定义属性进行设置。代码示例如下：

```html

<div style="background:no-repeat center top;" data-src="images/theReal.jpg">内容</div>

```

为了演示的方便，上面我通过style属性设置了元素的相关背景属性。而在实际的使用中，应在样式文件中进行设置。

## 脚本调用

当我们完成HTML代码中的事前布置后，我们需要调用`.lazyload()`方法来完成操作，代码示例如下：

```js

$("img[data-src]").lazyload();  //前景图片
$("div[data-src]").lazyload();  //背景图片

```

在lazyload中，我们对懒加载的元素进行了判断——如果是图片，则进行前景图加载，如果不是图片，则进行背景图加载。所以在通常情况下，我们只需要对懒加载的元素执行统一的`.lazyload()`即可。

为了扩展图片懒加载的功能需求，`.lazyload()`方法还可以提供如下列所示的一些参数（可根据实际情况进行多个参数的组合）：

```js

//图片位于id属性为container的容器内，仅当该容器滑动滚动条时才会进行加载处理
$("img[data-src]").lazyload({ container: $("#container") });

//在上一语句的基础上，表明本次图片的加载顺序为水平（x轴）方向
$("img[data-src]").lazyload({ container: $("#container"), scroll: "x" });

//提前加载200px范围位于可视区域之外的图片
$("img[data-src]").lazyload({ threshold: 200 });

//图片加载后淡入显示
$("img[data-src]").lazyload({ effect: "fadeIn" });

//图片加载后下滑显示
$("img[data-src]").lazyload({ effect: "slideDown" });

//仅只加载可视窗口内的图片
$("img[data-src]").lazyload({ viewport: true });

//仅只加载可视窗口内的图片，并延迟20ms触发懒加载行为
$("img[data-src]").lazyload({ viewport: true, timeout: 20 });

```