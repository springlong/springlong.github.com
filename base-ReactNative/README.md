# React Native 光伏运维APP

本项目使用 [react-native-navigation-redux-starter-kit](https://github.com/atoami/react-native-navigation-redux-starter-kit) 集成包为基础进行开发，包含了 `React Native Navigation`、`Redux`、`Saga`、`ESLint`、`Babel`、`Jest` 等的集成配置。

代码仓库: [http://gitlab.intebox.com/inew/operations-rn](http://gitlab.intebox.com/inew/operations-rn)。

在线文档：[http://gitlab.intebox.com/inew/operations-rn/blob/develop/README.md](http://gitlab.intebox.com/inew/operations-rn/blob/develop/README.md)。

## 导航

- [开发环境的配置](#开发环境的配置)
- [开发基本规范](#开发基本规范)
  * [目录结构](#目录结构)
  * [文件命名规则](#文件命名规则)
- [脚本书写规范](#脚本书写规范)
  * [页面的入口文件统一添加@fileoverview注释内容](#页面的入口文件统一添加@fileoverview注释内容)
  * [功能脚本的import名称统一使用首字母大写](#功能脚本的import名称统一使用首字母大写)
  * [import的书写顺序按NPM库、功能脚本、组件、样式依次进行](#import的书写顺序按NPM库、功能脚本、组件、样式依次进行)
  * [组件的自定义事件必须使用 on 前缀](#组件的自定义事件必须使用-on-前缀)
  * [事件处理函数统一使用 handle 前缀](#事件处理函数统一使用-handle-前缀)
  * [页面的state声明尽可能添加注释](#页面的state声明尽可能添加注释)
- [React Native 样式布局](#React-Native-样式布局)
  * [React Native 基础布局](#React-Native-基础布局)
  * [React Native 屏幕适配](#React-Native-屏幕适配)
  * [React Native 不被支持的 CSS 属性](#React-Native-不被支持的-CSS-属性)
  * [React Native 差异化 CSS 表现](#React-Native-差异化-CSS-表现)
  * [其它注意事项](#其它注意事项)
    * [多行文本省略号的实现](#多行文本省略号的实现)
    * [不支持 Web CSS 方式的 iconfont](#不支持-Web-CSS-方式的-iconfont)
- [React Native 路由导航](#React-Native-路由导航)
  * [路由配置](#路由配置)
  * [Tab栏配置](#Tab栏配置)
  * [页面的显示与隐藏](#页面的显示与隐藏)
  * [Router.reLaunch 重置APP布局](#Router.reLaunch-重置APP布局)
  * [Router.switchTab 切换Tab栏](#Router.switchTab-切换Tab栏)
  * [Router.navigateTo 导航到新的页面](#Router.navigateTo-导航到新的页面)
  * [Router.redirectTo 重定向页面](#Router.redirectTo-重定向页面)
  * [Router.navigateBack 回退到上一页面](#Router.navigateBack-回退到上一页面)
  * [Router.navigateBackTo 回退到指定页面](#Router.navigateBackTo-回退到指定页面)
- [React Native 接口请求](#React-Native-接口请求)
- [React Native Storage存储](#React-Native-Storage存储)
- [React Native 信息提示](#React-Native-信息提示)
- [React Native 操作确认框](#React-Native-操作确认框)
- [React Native 开发说明](#React-Native-开发说明)
  * [第三方组件库](#第三方组件库)
  * [页面的触摸行为](#页面的触摸行为)
    * [TouchableHighlight 组件](#TouchableHighlight-组件)
    * [TouchableOpacity 组件](#TouchableOpacity-组件)
    * [TouchableWithoutFeedback 组件](#TouchableWithoutFeedback-组件)
  * [页面的滚动行为](#页面的滚动行为)
    * [ScrollView 组件](#ScrollView-组件)
  * [下拉刷新&上拉加载](#下拉刷新&上拉加载)
  * [表单的输入和处理](#表单的输入和处理)
  * [点击空白区域隐藏键盘](#点击空白区域隐藏键盘)
  * [键盘遮挡的解决办法](#键盘遮挡的解决办法)
  * [上传图片](#上传图片)
  * [预览图片](#上传图片)
- [常用的NPM开发库](#常用的NPM开发库)


## 开发环境的配置

详细情况请参见：[React Native 中文网：搭建开发环境](https://reactnative.cn/docs/getting-started/)，下面进行简单说明：


**[Homebrew](https://brew.sh/index_zh-cn)**

Homebrew, Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**[Watchman](https://facebook.github.io/watchman/docs/install.html)**

Watchman 是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。

该工具可以不安装，不影响开发体验。

```shell
brew install watchman
```

**[Node](https://nodejs.org/zh-cn/)**

前端开发必备工具。

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

Node.js 的包管理器 `npm` (Node Package Manager)，是全球最大的开源库生态系统。

如果你已经安装了 Node，请检查其版本是否在 v10 以上。

```shell
brew install node
```

nodejs 和 npm 的仓库托管在S3上，在国内访问十分困难，这里可以用淘宝的镜像站 `npm.taobao.org` 代替。安装完 Node 后建议设置 npm 镜像以加速后面的过程：

```shell
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

常用 npm 命令：

```shell
# 查看当前版本
npm -v
npm --version

# 查看帮助
npm -h
npm --help

# 安装依赖包
npm install [package]
npm install [package]@[version]
npm install [package]@[tag]

# 将依赖项分别添加到 dependencies、devDependencies、和 optionalDependencies 类别中：
npm install [package] --save
npm install [package] --save-dev
npm install [package] --save-optional

# 全局安装
npm install [package] --global

# 升级依赖包
npm update [package]

# 移除依赖包
npm uninstall [package]

# 安装项目的全部依赖
npm install

# 主要版本号+1。
npm version major

# 小版本号+1
npm version minor

# 补丁版本号+1
npm version patch
```


**[Yarn](https://yarn.bootcss.com/)**

Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

```shell
brew install yarn
```

或：

```shell
npm install -g yarn
```

安装完 yarn 后同理也要设置镜像源：

```shell
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
安装完 yarn 之后就可以用 yarn 代替 npm 了，常用 yarn 命令：

```shell
# 查看当前版本
yarn -v
yarn --version

# 查看帮助
yarn -h
yarn --help

# 安装依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

# 将依赖项分别添加到 dependencies、devDependencies、peerDependencies 和 optionalDependencies 类别中：
yarn add [package]
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

# 全局安装
yarn global add [package]

# 升级依赖包
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

# 移除依赖包
yarn remove [package]

# 安装项目的全部依赖
yarn
yarn install

# 主要版本号+1。
yarn version --major

# 小版本号+1
yarn version --minor

# 补丁版本号+1
yarn version --patch
```


**[React Native CLI](http://facebook.github.io/react-native/docs/getting-started.html)**

React Native 轻量级的命令行工具，用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```shell
npm install -g react-native-cli
```


**[react-native-debugger](https://github.com/jhen0409/react-native-debugger)**

React Native 的调试工具，可以打印日志、查看网络请求、查看存储等。

```shell
brew update && brew cask install react-native-debugger
```


**[Xcode](https://developer.apple.com/xcode/)**

虽然你可以使用任何编辑器来开发应用（编写 js 代码），但你仍然必须安装 Xcode 来获得编译 iOS 应用所需的工具和环境。

React Native 目前需要Xcode 9.4 或更高版本。你可以通过 App Store 或是到[Apple 开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

如果遇到 IOS XCode 模拟器卡顿的问题，可以查看如下问题：

1. 是不是勾选了「 Debug 」菜单中的「 Slow Animations 」？如果有的话，去掉勾选，再运行模拟器以后就OK了，模拟器操作变得很顺畅。

2. Simulator 中的「 Hardware 」菜单的「 Earse All Content and Settings...」可以重置模拟器。


**[CocoaPods](https://cocoapods.org/)**

CocoaPods 是针对 iO S和 Mac 开发的包管理工具，只需要一行命令就可以完全解决类库之间的依赖和更新问题。

不过要使用它必须提前正确的设置它。可以参考“[最新cocoapods安装、降级、使用(Mac Pro)](https://www.jianshu.com/p/b1113215c728)”这篇文章按照步骤进行安装配置即可。


**[Android Studio](https://developer.android.com/studio/index.html)**

Android开发环境。

该开发环境可以不安装，我们在IOS开发后，再处理Android兼容即可。


### 运行项目

运行 iOS 项目

```shell
yarn                            # 先安装npm依赖
cd ios && pod install           # 切换到IOS目录，安装pod依赖
cd .. && react-native run-ios   # 返回项目目录，运行IOS项目
```

运行 Android 项目

```shell
react-native run-android
```


## 开发基本规范

内容待定。

### 目录结构

内容待定。

### 文件命名规则

内容待定。

## 脚本书写规范

### 组件的自定义事件必须使用 on 前缀

```jsx
<LoadMore
  onComplete={this.handleMoreComplete}
/>
```

### 事件处理函数统一使用 handle 前缀

```js
// 跳转至详情页
handleNavToDetail = (id) => {
  // ...
}
```

### 页面的state声明尽可能添加注释

```js
this.state = {
  // 列表数据
  listData: [],
  // 头部筛选定位样式
  listFixedStyle: '',
  // 工单状态
  workOrderStatus: '',
  // 工单记录的数量
  orderCount: '',
}
```

### 页面的入口文件统一添加@fileoverview注释内容

该注释内容主要描述如下信息：

- 这是一个什么页面
- 初始开发者是谁
- 最近的更新时间
- 页面的传参列表

```js
/**
 * @fileoverview 工单详情
 * @author 阳团
 * @update 2019-07-22
 *
 * this.props 传参列表
 * |-- orderId     工单id
 */
```

### 功能脚本的import名称统一使用首字母大写

```js
import Dict from '../../utils/dict'
import Util from '../../utils/util'
import Actions from '../../actions/actions'
```

### import的书写顺序按NPM库、功能脚本、组件、样式依次进行

为了便于import导入语句的阅读，不同种类的导入代码之间空一行，示例如下：

```js
// NPM库
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

// 功能脚本
import Actions from '../../../actions/actions'
import Util from "../../../utils/util"
import Dict from '../../../utils/dict'

// 组件
import ListScrollLoad from "../../../components/ListScrollLoad/index"
import ListStatus from "../../../components/ListScrollLoad/ListStatus"
import Field from '../../../components/FormFied/Field'

// 样式&图片
import styles from './indexStyle';
```

## React Native 样式布局

### React Native 基础布局

首先我们必须了解下 React Native 样式布局的几条基本规则：

1、React Native 中的样式，是直接通过组件的 style 属性进行设置，并不支持 Web 开发中常用的 CSS 类名设置。

2、React Native 中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

3、React Native 中的布局一律采用 `Flex` 布局，且 `flex-direction` 默认值为纵向（`column`）。

4、React Native 中的文字内容必须包裹在文本组件（即 `Text` 组件）中。如果将文字直接包裹在容器类组件（例如 `View` 组件）中，将不会显示该文字内容。

5、React Native 中不同类型的组件所支持的样式属性并不一致：font、text、color等字体、文本、颜色属性不能应用于容器类组件（例如 `View` 组件）中，只能加在 Text 组件上。同时 padding、border、margin、backgroundColor 等盒模型、背景属性只能应用于容器类组件（例如 `View` 组件）中，而不能应用于 Text 组件。

基于上述规则，我们在布局时，往往需要对文本内容进行 View + Text 的层级嵌套书写：

```jsx
import { View, Text } from 'react-native';

render() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Text
        style={{
          fontSize: 15,
          lineHeight: 20,
          color: '#707070',
        }}
      >
        文本内容
      </Text>
    </View>
  )
}
```

实际开发中，组件的样式会越来越复杂，因此建议通过 `StyleSheet.create` 来集中定义组件的样式。如下所示：

```jsx
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  userBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  userText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#707070',
  },
});

render() {
  return (
    <View
      style={styles.userBox}
    >
      <Text style={styles.userText}>
        文本内容
      </Text>
    </View>
  )
}
```

为了更方便地区分样式和组件内容，并增加样式的可维护性、和可重用性，我们还会继续将样式的定义抽离为单独的脚本文件，并与组件文件放置在统一目录下：

```jsx
// index.js
import { View, Text } from 'react-native';
import styles from './indexStyle';

render() {
  return (
    <View
      style={styles.userBox}
    >
      <Text style={styles.userText}>
        文本内容
      </Text>
    </View>
  )
}
```

```jsx
// indexStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  userBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  userText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#707070',
  },
});
```

另外，React Native 支持的样式并不与 CSS 完全一致，因此在开发之前，我们推荐阅读 Taro 提供的 [React Native 开发注意事项](https://nervjs.github.io/taro/docs/before-dev-remind.html#%E6%A0%B7%E5%BC%8F)。

为了更好的了解什么属性能用，什么不能用，你也可以查看 React Native 支持的 CSS 的基本情况：

- [布局属性](https://reactnative.cn/docs/layout-props/)
- [View样式属性](https://reactnative.cn/docs/view-style-props/#props)
- [Text样式属性](https://reactnative.cn/docs/text-style-props/#docsNav)

### React Native 屏幕适配

内容待定。

### React Native 不被支持的 CSS 属性

- `order`
- `box-sizing`
- `box-shadow`
- `white-space`
- `word-break`
- `word-wrap`
- `text-overflow`
- `border-top`
- `border-right`
- `border-bottom`
- `border-left`
- `background-image`
- `pointer-events`

### React Native 差异化 CSS 表现

- **`position`**

仅支持 `position: absolute`、`position: relative`。

- **`display`**

仅支持 `display: flex`、`display: none`。

- **`padding`**

RN中的 padding 属性仅支持1个值，用来同时设置四个方向的padding，而不支持分别给四个方位设置不同的padding。如果需要单独设置某个方位的值，则只能使用 `padding-left`、`padding-right`、 `padding-top`、`padding-bottom` 进行单独设置。不过 RN 中新增了 `padding-horizontal` 和 `padding-vertical` 两个属性用来分别设置水平和垂直方向上两端的值。

- **`border`**

RN中的 border-style 不能应用于单个边框，因此在书写样式时不支持使用 `border-left`、`border-right` 等属性。

可以正常使用 `border-width`、`border-color`、`border-left-width`、`border-left-color` 等属性，且 `border-style` 仅支持 `solid, dotted, dashed` 。

如果想要 CSS 中常规的设置 `border-top: 1px solid #ddd`，那么需要拆分书写为下面的代码：

``` jsx
<View
  style={{
    borderWidth: 0,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
  }}
/>
```

- **`border-radius`**

RN中的 border-radius 仅支持数字值，因此 CSS 中常见使用的百分比不能使用。

- **`margin`**

RN中的 margin 属性仅支持1个值，用来同时设置四个方向的 margin，而不支持分别给四个方位设置不同的margin。如果需要单独设置某个方位的值，则只能使用 `margin-left`、`margin-right`、 `margin-top`、`margin-bottom` 进行单独设置。不过 RN 中新增了 `margin-horizontal` 和 `margin-vertical` 两个属性用来分别设置水平和垂直方向上两端的值。

- **`transform`**

RN中的 transform 相关设置不支持百分比，如果书写了百分比的属性值，将导致编译报错。

- **`background`**

RN中的背景设置仅支持 `background-color` 一个属性，不支持 `background: url()` 等其它方式。

- **`flex-direction`**

RN中的 `flex-direction` 属性默认值是 column，而CSS的默认值是 row。因此在书写样式代码时，为了提高可读性，建议显式指定 `flex-direction` 的值。

- **`box-sizing`**

RN不支持 `box-sizing` 属性，但是 View 标签的盒模型默认的是 `boder-box`，与 Web、小程序的表现有所区别。

- **`overflow`**

RN中，区块内容超出容器将会自动隐藏，也就相当于 `overflow: hidden`。需要注意下与Web和小程序的区别。

- **`word-break`**

RN中不支持该属性，但是长串字母或数字在容器中将会自动换行处理。需要注意下与Web和小程序的区别。

### 其它注意事项

#### 多行文本省略号的实现

RN中通过 Text 组件的 [numberOfLines](https://reactnative.cn/docs/text/#numberoflines) 属性来实现，而 H5 和小程序则使用 `-webkit-line-clamp` 实现，需要注意下两者之间的区别。

```jsx
<Text numberOfLines={2}>多行文本省略号</Text>
```

#### 不支持 Web CSS 方式的 iconfont

APP 有一套自己的方式去使用 iconfont ，这与Web端、小程序端有所差异。在 React Native 中如果需要使用自定图标，则需要使用 [ react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 组件来达成目的。

## React Native 路由导航

路由导航使用 [React Native Navigation](https://wix.github.io/react-native-navigation/#/) 这款第三方库来完成。

### 路由配置

为了便于路由的统一管理和配置，我们在 `@/router/pageConfig.js` 文件中为每个页面提供了路由配置选项，如下所示：

```js
{
  /**
   * 首页
   */
  Home: {
    name: 'Home',
    component: Home,
    title: '首页',
    isTab: true,
    tabIcon: require('assets/icons/icon-tab-room.png'),
  },

  /**
   * 登录
   */
  Login: {
    name: 'Login',
    component: Login,
    title: '登录',
    hideTab: true,
  },
};
```

**可配置项如下：**

| 配置项 | 类型 | 说明
| ------ | ------ | ------ |
| `name` | `string` | 页面的名称标识
| `component` | `Component` | 页面对应的组件
| `title` | `string` | 页面的显示标题
| `isTab` | `boolean` | 为 `True` 时将作为Tab栏展示
| `tabIcon` | `File` | 为Tab栏提供的图标展示
| `hideTab` | `boolean` | 该页面是否隐藏Tab栏

**访问页面配置项**

当我们在开发过程中需要进行跳转，或者访问某个页面的配置项时，可以通过 `Router.page.Home` 的形式进行访问。

### Tab栏配置

为了方便Tab栏的维护和管理，我们将Tab栏的配置放到了路由配置里面。我们可以在路由配置中，通过 `isTab` 选项来指定某个路由页面是否作为Tab栏进行展示，并通过 `tabIcon` 选项来指定图标展示。Tab栏的展示顺序，将按照路由配置的顺序依次显示。

```js
{
  Home: {
    name: 'Home',
    component: Home,
    title: '首页',
    isTab: true,
    tabIcon: require('assets/icons/icon-tab-room.png'),
  },
}
```

需要注意的是，我们的Tab栏是基于 `React Native Navigation` 的 `bottomTabs` 配置来实现的。当APP首次完成加载时，Tab所对应的页面组件都将触发 `componentDidMount` 事件。

### 页面的显示与隐藏

由于APP首次完成加载时，Tab所对应的页面组件都将触发 `componentDidMount` 事件，这将导致其它非当前Tab也会产生不必要的资源请求。

为了解决这个问题， `React Native Navigation` 提供了 `componentDidAppear` 和 `componentDidDisappear` 这两个事件供开发者使用。

如果不是初始展示的Tab页面，其资源请求应当在首次触发 `componentDidAppear` 事件时调用。

```js
import { Navigation } from 'react-native-navigation';

componentDidMount() {
  // 使用前需要注册事件
  this.navigationEventListener = Navigation.events().bindComponent(this);
}

componentWillUnmount() {
  // 页面卸载时需要移除事件
  if (this.navigationEventListener) {
    this.navigationEventListener.remove();
  }
}

componentDidAppear() {
  // 页面呈现给用户时触发
}

componentDidDisappear() {
  // 页面被隐藏时触发
}
```

### Router.reLaunch 重置APP布局

关闭所有页面，打开到应用内的某个页面。

```js
import Router from '@/router';

// 根据传入的页面重置APP布局
Router.reLaunch(Router.page.Login);
```

### Router.switchTab 切换Tab栏

Tab栏切换不支持传递参数，如有需要，可以使用 `globalData` 进行配合。

```js
import Router from '@/router';

// 切换Tab栏
// 需传入指定Tab对应的页面配置项
Router.switchTab(Router.page.OperationsHome);
```


### Router.navigateTo 导航到新的页面

保留当前页面，跳转到另一个页面，不支持切换到Tab栏。

```js
import Router from '@/router';

// 导航到新的页面
Router.navigateTo({
  // 当前页面id，即 this.props.componentId
  componentId: this.props.componentId,
  // 需要跳转到的页面配置项
  page: Router.page.Login,
  // 页面传参
  params: {
    propA: 1,
    propB: 2,
  }
});
```

### Router.redirectTo 重定向页面

关闭当前页面，跳转到另一个页面，不支持切换到Tab栏。

```js
import Router from '@/router';

// 重定向页面
Router.redirectTo({
  // 当前页面id，即 this.props.componentId
  componentId: this.props.componentId,
  // 需要跳转到的页面配置项
  page: Router.page.Login,
  // 页面传参
  params: {
    propA: 1,
    propB: 2,
  }
});
```

### Router.navigateBack 回退到上一页面

页面回退不支持传递参数，如有需要，可以使用 `globalData` 进行配合。

```js
import Router from '@/router';

// 回退到上一页面
// 需传入当前页面的 this.props.componentId
Router.navigateBack(this.props.componentId);
```

### Router.navigateBackTo 回退到指定页面

页面回退不支持传递参数，如有需要，可以使用 `globalData` 进行配合。

```js
import Router from '@/router';

// 回退到指定页面
// 需传入回退页面的 props.componentId
Router.navigateBackTo(componentId);
```

## React Native 接口请求

内容待定。

## React Native Storage存储

内容待定。

## React Native 信息提示

内容待定。

## React Native 操作确认框

内容待定。

## React Native 开发说明

### 第三方组件库

React Native 提供了一些内置的[组件](https://reactnative.cn/docs/components-and-apis/)，得以满足一些常规基础的功能实现。但是一个项目，往往会存在各种各样的需求，这些内容组件并不一定能够满足需求。

这个时候，我们首先推荐前往 [@ant-design/react-native](https://rn.mobile.ant.design/docs/react/introduce-cn) 组件库寻找满足需求的组件，如果没有则可以在 `github` 或是 `npm` 上搜索到带有 `react native` 关键字的大量的第三方组件，当然你也可以直接百度查找。

如果你在项目中使用了其它的第三方组件或者开发库，请记得及时更新 [常用的NPM开发库](#常用的NPM开发库) 中的内容，并提供简单的描述和使用说明。

### 页面的触摸行为

在 移动Web 或者 微信小程序 开发中，绝大多数标签或组件都存在触摸事件，来响应用户的触摸行为。

而在 React Native 中，除了 `Button` 组件外，其它常用的 `View`、`Text`、`Image` 等组件都不提供触摸事件。

如果需要响应用户的触摸行为，则需要使用特定的组件来完成。下面罗列的三种可以用来响应触摸操作的组件，主要区别在于触摸被按下时的差异化表现效果，在实际开发过程中，大家根据实际需要选择相应的组件进行使用即可。

#### TouchableHighlight 组件

该组件可以用来响应触摸操作，当被按下的时候，可以通过底层颜色（underlayColor）和不透明度（activeOpacity）的差异化设置，使得视图变暗或变亮。

该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。

```jsx
<TouchableHighlight
  /* 是否禁止该组件的一切交互，默认为false */
  disabled={false}
  /* 用来指定组件被触摸时的不透明度，默认值为0.85，取值在0~1之间 */
  activeOpacity={0.85}
  /* 用来指定组件被触摸时显示的底层颜色，默认值为白色。这里设置为transparent则相当于没有底层颜色的差异化表现 */
  underlayColor="transparent"
  onPress={() => {
    console.log('触摸屏幕完成时触发（按压屏幕并松开）');
  }}
  onPressIn={() => {
    console.log('按压屏幕时触发');
  }}
  onPressOut={() => {
    console.log('按压屏幕后松开时触发');
  }}
  style={styles.touchEle}
>
  <View style={styles.parent}>
    {/* 该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。 */}
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
  </View>
</TouchableHighlight>
```

#### TouchableOpacity 组件

该组件可以用来响应触摸操作，与 `TouchableHighlight` 不同的是，当被按下的时候，该组件并没有额外的颜色变化，只能通过 `activeOpacity` 来降低视图的不透明度。

该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。

```jsx
<TouchableOpacity
  /* 是否禁止该组件的一切交互，默认为false */
  disabled={false}
  /* 用来指定组件被触摸时的不透明度，默认值为0.2，取值在0~1之间。我们建议一般设置0.85较为合适。 */
  activeOpacity={0.85}
  onPress={() => {
    console.log('触摸屏幕完成时触发（按压屏幕并松开）');
  }}
  onPressIn={() => {
    console.log('按压屏幕时触发');
  }}
  onPressOut={() => {
    console.log('按压屏幕后松开时触发');
  }}
  style={styles.touchEle}
>
  <View style={styles.parent}>
    {/* 该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。 */}
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
  </View>
</TouchableOpacity>
```

#### TouchableWithoutFeedback 组件

该组件可以用来响应触摸操作，与 `TouchableHighlight` 和 `TouchableOpacity` 不同的是，当被按下的时候，该组件并没有视觉上的差异化反馈效果。

除非你有一个很好的理由，否则不要使用这个组件。所有能够响应触摸操作的元素在触摸后都应该有一个视觉上的反馈，然而该组件并没有任何视觉反馈。

常见的使用场景，比如想实现点击空白处触发某个操作，那么就可以把空白部分用 TouchableWithoutFeedback 包起来，或者绝对定位覆盖住。

该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。

```jsx
<TouchableWithoutFeedback
  /* 是否禁止该组件的一切交互，默认为false */
  disabled={false}
  onPress={() => {
    console.log('触摸屏幕完成时触发（按压屏幕并松开）');
  }}
  onPressIn={() => {
    console.log('按压屏幕时触发');
  }}
  onPressOut={() => {
    console.log('按压屏幕后松开时触发');
  }}
  style={styles.touchEle}
>
  <View style={styles.parent}>
    {/* 该组件只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。 */}
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
    <View style={styles.child}>
      <Text style={styles.childText}></Text>
    </View>
  </View>
</TouchableWithoutFeedback>
```

### 页面的滚动行为

在 Web 页面中，当内容超出浏览器视窗高度后，默认情况下我们可以通过滑动鼠标（PC）或者通过手势上下滑动（触屏）来滚动屏幕查看更多内容。

而在 React Native 中，如果内容超出屏幕高度，默认情况下会被隐藏，无法通过手势上下滑动来滚动屏幕，这里我们必须配合 `ScrollView`、`FlatList` 等组件实现 APP 中内容的可滚动处理。

#### ScrollView 组件

ScrollView 必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。要给 ScrollView 一个确定的高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度。一般来说我们会给 ScrollView 设置 `flex: 1` 以使其自动填充父容器的空余空间，但前提条件是所有的父容器本身也设置了 flex 或者指定了高度，否则就会导致无法正常滚动，你可以使用元素查看器来查找具体哪一层高度不正确。

我们建议每个页面都使用一层 `container` 用来作为最外层容器，然后再通过 `scrollview` 用来包裹可滚动区域，另外可以配合 `header` 和 `footer` 来表示头部和尾部的固定区域。通常组合代码如下：

```jsx
// index.js
import { ScrollView, View } from 'react-native';
import styles from './indexStyle';

render() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 头部固定区域 */}
      </View>
      <ScrollView
        style={styles.scrollView}
      >
        {/* 可滚动内容区域 */}
      </ScrollView>
      <View style={styles.footer}>
        {/* 尾部固定区域 */}
      </View>
    </View>
  )
}
```

```js
// indexStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // 页面容器
  container: {
    flexDirection: 'column',
    height: '100%',
  },

  // 头部区域
  header: {
    height: 200,
  },

  // 可滚动区域
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // 尾部区域
  footer: {
    height: 100,
  },
});
```

### 下拉刷新&上拉加载

内容待定。

### 表单的输入和处理

内容待定。

### 点击空白区域隐藏键盘

在 React Native 中，当输入框获得焦点弹出键盘后，点击空白区域默认不会隐藏键盘。

这里有两种方式可以使得点击空白区域隐藏键盘：

1、将输入框包裹在 [ScrollView](https://reactnative.cn/docs/scrollview/) 组件中，这样当点击 `TextInput` 之外的子组件时会使当前的键盘自动收起，但此时子元素不会收到点击事件。

```jsx
import { ScrollView } from 'react-native';

export default class Demo extends PureComponent {
  reder() {
    return (
      <ScrollView>
        {/* 位于ScrollView组件中的输入框，点击空白处会自动收起键盘 */}
      </ScrollView>
    );
  }
}
render() {
}
```

2、使用我们封装的 `DismissKeyboardHOC` 高阶组件，对页面组件进行一次包装。这样在点击空白区域时，会通过事件冒泡传给 `DismissKeyboardHOC` 组件，在组件内部使用 `Keyboard` 模块的 [dismiss](https://reactnative.cn/docs/keyboard/#dismiss) 方法手动将键盘隐藏。

```jsx
import { View } from 'react-native';
import { DismissKeyboardHOC } from '@/components';

@DismissKeyboardHOC
export default class Demo extends PureComponent {
  reder() {
    return (
      <View>
        {/* 通过DismissKeyboardHOC高阶组件手动隐藏键盘 */}
      </View>
    );
  }
}
```

在实际页面开发中，我们无法避免不使用 `ScrollView` 组件，因为绝大多数页面的内容都超出了一屏的显示高度。但是如果使用了 `ScrollView`，点击空白处虽然可以隐藏键盘，但也导致子元素不会收到点击事件。

这一问题将导致当我们输入内容后，如果直接点击提交按钮，此时只会将键盘隐藏，而无法触发提交按钮的事件处理。因此我们往往需要将以上两种方法进行组合使用：

```jsx
import { ScrollView } from 'react-native';
import { DismissKeyboardHOC } from '@/components';

@DismissKeyboardHOC
export default class Demo extends PureComponent {
  reder() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
      >
        {
          // ScrollView 组件默认情况下点击空白区域会让键盘自动收起，
          // 但这样的话子组件将无法捕捉到点击事件

          // 我们可以设置 keyboardShouldPersistTaps 属性为 always
          // 这样点击空白区域不会让键盘自动收起，但子组件可以正常捕捉点击事件

          // 至于让键盘收起，则通过 DismissKeyboardHOC 来实现
        }
      </ScrollView>
    );
  }
}
```

### 键盘遮挡的解决办法

内容待定。

### 上传图片

内容待定。

### 预览图片

内容待定。

## 常用的NPM开发库

### 项目使用的NPM开发库


**[React Native Navigation](https://wix.github.io/react-native-navigation/#/)**

路由组件库。


**[react-native-keyboard-aware-scroll-view](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view)**

解决 APP 中的键盘遮挡问题。


**[react-native-image-zoom-viewer](https://github.com/ascoders/react-native-image-viewer)**

实现大图预览（支持手势缩放）。


**[react-native-image-picker](https://github.com/ascoders/react-native-image-viewer)**

实现图片上传，查看[中文教程](https://github.com/react-native-community/react-native-image-picker)。


**[react-native-actionsheet-api](https://github.com/qfight/react-native-actionsheet-api)**

提供Android和iOS平台通用的的showActionSheetWithOptions()API。统一使用ActionSheet。调用时，如果是iOS，调用ActionSheetIOS.showActionSheetWithOptions()。


**[react-native-echarts](https://github.com/somonus/react-native-echarts)**

支持在 React Native 中进行 Echarts 图标绘制。


**[@ant-design/react-native](https://rn.mobile.ant.design/docs/react/introduce-cn)**

Ant Design 的移动规范的 React Native 实现。我们在使用 RN 提供的组件无法满足需求时，可以参考该组件库。


**[react-component/form](https://github.com/react-component/form)**

用于表单封装，提供表单绑定、校验、取值、写值等功能，使用方法同 [Ant-Design Form](https://ant.design/components/form-cn/#Form.create(options))。


**[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)**

Moment.js 的 2kB 轻量化方案，拥有同样强大的 API。


### 其它推荐关注的NPM开发库


**[ react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)**

自定义图标。查看[中文教程](https://www.jianshu.com/p/c4dfc85d3009)。


**[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)**

实现图片选择、图片剪裁 。查看[中文教程](https://blog.csdn.net/ZhangKui0418/article/details/82887649)。


**[react-native-navbar](https://github.com/react-native-community/react-native-navbar)**

头部导航栏定制组件。用过系统的 Navigator 组件后，一般都需要自己自定制导航条的按钮和标题，用了这个组件则会省下很多的步骤。


**[react-native-tab-navigator](https://github.com/ptomasroos/react-native-tab-navigator)**

Tab导航栏组件。查看[中文教程](https://www.jianshu.com/p/e068d017ad4d)。


**[react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)**

Tab导航栏组件（切换Tab时，可实现左右滚动效果）。查看[中文教程](https://www.jianshu.com/p/a730190994c2)。


**[react-native-swiper](https://github.com/leecade/react-native-swiper)**

轮播图组件。查看[中文教程](https://www.jianshu.com/p/f42b0c13710e)。
