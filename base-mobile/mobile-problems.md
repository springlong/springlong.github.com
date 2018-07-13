# 移动端常见问题汇总

## CSS3 Transition 动画导致周围内容出现模糊和抖动的问题

**问题描述：**

在 Chrome 和 Safari 中，当我们使用 CSS transition + transforms 或者 animations 时可能会导致周围内容出现模糊和抖动（闪烁）的情况。

**背景分析**

浏览器为了提高页面渲染的性能流畅度，提供了3D硬件加速功能。

以Webkit为例，其硬件加速的方式，会把需要渲染的元素放到特定的 `Composited Layer` （复合层）。这样当处理CSS3动画的时候，浏览器只需要单独绘制这个复合层的内容，最后将其与其他各层通过GPU合成（composite）并显示在屏幕上，以此加快动画的性能和流畅度。

Chrome在下列情况下会创建复合层：

1. 3D 或 透视变换(perspective transform) CSS 属性
2. 使用加速视频解码的元素
3. 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
4. 混合插件(如 Flash)
5. 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素
6. 拥有加速 CSS 过滤器的元素
7. 该元素的后代元素中包含复合层节点
8. 该元素的兄弟元素中存在复合层节点且z-index较低(非定位元素，或者为定位元素单但没有设置z-index)

**解决方案**

之所以使用CSS3动画时，其周边内容出现模糊和抖动（闪烁）的情况，是因为其周边元素与动画元素被放置到了同一个复合层中进行渲染，当CSS3动画发生时，其周边内容也一样会重新渲染，而在重新渲染的过程中，由于某些原因会导致其周边内容会产生0.5px乃至1px的误差，所以出现了模糊和抖动的情况。

那么解决该方案有两种途径：

1. 寻找导致造成误差的具体原因，然后修复。
2. 避免周边内容被放到同一个复合层中进行渲染。

对于第一种，网上有说是存在奇数数值的宽高或者存在.5的情况导致的，但经过实践表明无论是奇偶数，还是小数点的情况，都会存在抖动的情况，所以这一途径暂时无解。

那么第二种解决方案，就是避免被放到同一个复合层。具体的做法有：




**参考：**

https://www.jianshu.com/p/f8b1d6e598db

[CSS3硬件加速也有坑](http://web.jobbole.com/83575/)

[CSS动画之硬件加速](http://www.w3cplus.com/css3/introduction-to-hardware-acceleration-css-animations.html)

[使用CSS3 will-change提高页面滚动、动画等渲染性能](https://www.zhangxinxu.com/wordpress/2015/11/css3-will-change-improve-paint/)

[两张图解释CSS动画的性能](http://web.jobbole.com/87919/)

[CSS3篇--rotate/translate等导致字体模糊](https://blog.csdn.net/u010556394/article/details/78517830)

[CSS过渡效果导致文字模糊或抖动？](https://segmentfault.com/q/1010000009522608)

