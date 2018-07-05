# jQuery browser

集成于jQuery中，用于提供与浏览器相关的操作和判断

## 描述

`jquery-browser.js`的目的并不是用于取代原有的`$.browser`对象，况且该对象在1.9以及之后的版本中已经被摒弃。该插件的目的，主要用于提供与浏览器相关的操作与判断。同时，该插件还提供了IE6~8浏览器对于基本的HTML5语义标签的兼容处理，并解决了IE6浏览器不缓存背景图片的Bug、以及IE6中固定定位元素在滚动条滑动时的闪屏问题。

## 使用

```js
$.isIE6
```

浏览器是否为IE6。（返回类型：*Boolean*）
<br>
<br>

```js
$.isLessIE9
```

浏览器是否为IE，且低于9.0版本。（返回类型：*Boolean*）
<br>
<br>

```js
$.isMobile
```

客户端是否为移动设备。（返回类型：*Boolean*）
<br>
<br>

```js
$.canFlash()
```

浏览器是否支持Flash插件。（返回类型：*Boolean*）
<br>
<br>

```js
$.setHome()
```

将当前页面设为浏览器的首页。（返回类型：*undefined*）

该方法目前仅针对IE浏览器有效，但必须是一个完整的网页地址才能正常触发设为首页操作。

如果该方法没有执行成功，则提示用户需要手动添加首页。
<br>
<br>

```js
$.addFavorite()
```

将当前页面加入浏览器收藏夹。（返回类型：*undefined*）

如果该方法没有执行成功，则提示用户需要可按Ctrl+d进行完成。
<br>
<br>

## 移动设备的判断

在该脚本中，我们是通过下面的语句来判断客户端是否为移动设备：

```js
/iphone|ipad|itouch|android|windows phone|mobile|ucweb|fennec|blackberry|touchpad|symbianos/i.test(navigator.userAgent)
```

关于上述正则匹配中各关键词的解释如下：

1. **iphone**：
<br>苹果手机的品牌名称。

2. **ipad**：
<br>苹果平板电脑的品牌名称。

3. **itouch**：
<br>一款由苹果公司推出的便携式移动产品。

3. **android**：
<br>谷歌的一款移动操作系统。

4. **window phone**：
<br>微软的一款移动操作系统。

5. **mobile**：
<br>通常移动手机浏览器的ua中均带有mobile的字样。

5. **ucweb**：
<br>Android中某些老版本UC浏览器中的UA不包含android关键字，但包含ucweb关键字。

6. **Fennec**：
<br>Firefox浏览器针对移动电话和非个人计算机设备推出的一个浏览器版本。

7. **BlackBerry**：
<br>黑莓手机的品牌名称。

8. **TouchPad**：
<br>惠普推出的一款Pad产品。不过惠普在2011年8月宣布正式放弃围绕TouchPad平板电脑和webOS手机的所有运营，目前TouchPad产品已经停产。

9. **SymbianOS**：
<br>诺基亚手机之前所用的操作系统。Symbian系统是塞班公司为手机而设计的操作系统。2008年12月2日，塞班公司被诺基亚收购。2011年12月21日，诺基亚官方宣布放弃塞班（Symbian）品牌。

关于通过上述方式来判断移动设备，本人自觉不够完善。但苦于没有过多的设备可以测试，如果你有更多更好的判断方式，请与我联系，在此十分感谢！

## 测试

在线测试上述属性或方法的使用情况：

[http://www.fedlife.cn/demo/jquery/jquery-browser/demo.html](http://www.fedlife.cn/demo/jquery/jquery-browser/demo.html)