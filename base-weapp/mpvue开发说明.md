# mpvue 开发说明

### 同一页面关闭再重新进入后，data不会初始化

mpvue 的生命周期默认是是一个页面只会触发一次 `beforeCreate` 和  `created` 周期，

也就是说针对同一页面，data()初始化只会执行一次，

这样当同一页面关闭再重新进入后，data是不会初始化的。

为了避免这种情况，我们可以选择在 `onLoad` `onShow` `onReady` 这些小程序的生命周期中执行对数据的初始化更新操作。

### v-for 循环导致编译出错

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

以下在vue中常见的处理均不能使用，应当避免使用，使用计算属性予以代替：

    <!-- 函数方法不被支持，建议放到 computed -->
    <p>{{ message.split('').reverse().join('') }}</p>

    <!-- 字符串模板不被支持，建议写字符串链接 -->
    <p :class="`item-${item.code}`"></p>

### 小程序 getCurrentPages() 获取路由栈

小程序可以通过全局的 getCurrentPages() 函数获取路由栈的相关信息。

由于 mpvue 中的 beforeCreate 和 created 周期是在 小程序页面的 onLaunch/onLoad 之前触发，在这两个周期中将无法获取当前页面的路由信息。

