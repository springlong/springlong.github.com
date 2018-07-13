# 小程序开发注意事项

## 小程序

### `wx.navigateTo` 最多打开10个页面

    小程序通过 `wx.navigateTo` 最多打开10个页面，超过10个页面将无法正常打开页面。

    请避免多层级的交互方式，或者使用 `wx.redirectTo`。

### 不能使用 window 等BOM、DOM对象

    页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能在脚本中使用window，也无法在脚本中操作组件。

    而vue的第三方组件都或多或少使用了BOM、DOM中的对象，所以无法直接在mpvue中进行使用。

### 本地资源无法通过 WXSS 获取

    background-image：可以使用网络图片，或者 base64，或者使用<image/>标签

### 小程序内置组件以及自定义组件无法更改样式

    小程序虽然提供了功能丰富的内置组件，但是无法进行样式自定义，常常不能满足实际项目中的视觉需求。

    而自定义组件，则是一个类似独立封闭的webview，无法从外部覆盖其内部的样式。

    因此对于第三方小程序组件库的使用，常常因为需要满足项目的视觉需求而无法使用。

### button按钮去除border边框

    微信小程序中的button组件有特定的css，背景可以用“background：none”去掉，但是边框用“border : none”则无法移除。

    我们可以使用 button::after{ border: none; } 来去除边框。

### 为什么 map 组件总是在最上层

    map、canvas、video、textarea 是由客户端创建的原生组件，

    原生组件的层级是最高的，所以页面中的其他组件无论设置 z-index 为多少，都无法盖在原生组件上。

    原生组件暂时还无法放在 scroll-view 上，也无法对原生组件设置 css 动画。

## mpvue框架

### v-for循环导致编译出错

下面的代码将报：`(node:35449) UnhandledPromiseRejectionWarning: SyntaxError: Unexpected token (6:26)` 的错误：

    <div
        v-for="(item) in list"
        :key="item.ticketId"
        class="m-appointment-item"
    ></div>

两种处理方式可避免：

    <div
        v-for="item in list"
        :key="item.ticketId"
        class="m-appointment-item"
    ></div>

    <div
        v-for="(item, index) in list"
        :key="item.ticketId"
        class="m-appointment-item"
    ></div>


### Mustache 语法不支持复杂表达式

受限于小程序的数据绑定的能力限制，在 mpvue 中 Mustache 语法仅支持 `+ - * % ?: ! == === > < [] .` 常规运算符，其它处理均不支持。

以下在vue中常见的处理均不能使用，应当避免使用，使用计算属性予以代替：

    <!-- 函数方法不被支持，建议放到 computed -->
    <p>{{ message.split('').reverse().join('') }}</p>

    <!-- 字符串模板不被支持，建议写字符串链接 -->
    <p :class="`item-${item.code}`"></p>

### 小程序 getCurrentPages() 获取路由栈

小程序可以通过全局的 getCurrentPages() 函数获取路由栈的相关信息。

由于 mpvue 中的 beforeCreate 和 created 周期是在 小程序页面的 onLaunch/onLoad 之前触发，在这两个周期中将无法获取当前页面的路由信息。