# React Native 开发说明

我们建议使用 [react-native-navigation-redux-starter-kit](https://github.com/atoami/react-native-navigation-redux-starter-kit) 集成包为基础进行React Native项目的开发，该集成包包含了 `React Native Navigation`、`Redux`、`Saga`、`ESLint`、`Babel`、`Jest` 等的集成配置，便于快速搭建开发环境和相关配置。

## 导航

- [开发环境的配置](#开发环境的配置)
- [常用的NPM开发库](#常用的NPM开发库)
- [运行项目](#运行项目)
- [开发基本规范](#开发基本规范)
  * [目录结构](#目录结构)
  * [文件命名规则](#文件命名规则)
- [React Native 样式布局](#React-Native-样式布局)
  * [React Native 不被支持的 CSS 属性](#React-Native-不被支持的-CSS-属性)
  * [React Native 差异化 CSS 表现](#React-Native-差异化-CSS-表现)
  * [其它注意事项](#其它注意事项)
    * [多行文本省略号的实现](#多行文本省略号的实现)
    * [不支持 Web CSS 方式的 iconfont](#不支持-Web-CSS-方式的-iconfont)
- [React Native 路由导航](#React-Native-路由导航)
- [React Native 接口管理](#React-Native-接口管理)
- [React Native 功能点实现](#React-Native-功能点实现)
  * [第三方组件库](#第三方组件库)
  * [页面滚动行为](#页面滚动行为)
  * [键盘遮挡的解决办法](#键盘遮挡的解决办法)
  * [Storage存储](#Storage存储)
  * [信息提示](#信息提示)
  * [操作确认框](#操作确认框)
  * [上传图片](#上传图片)
  * [预览图片](#上传图片)


## 开发环境的配置

详细情况请参见：[React Native 中文网：搭建开发环境](https://reactnative.cn/docs/getting-started/)，下面进行简单说明：

**[Android Studio](https://developer.android.com/studio/index.html)**

Android开发环境。

**[Xcode](https://developer.apple.com/xcode/)**

React Native 目前需要Xcode 9.4 或更高版本。你可以通过 App Store 或是到[Apple 开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

**[CocoaPods](https://cocoapods.org/)**

IOS最常用最有名的类库管理工具，只需要一行命令就可以完全解决类库之间的依赖和更新问题。不过要使用它必须提前正确的设置它。可以参考“[最新cocoapods安装、降级、使用(Mac Pro)](https://www.jianshu.com/p/b1113215c728)”这篇文章按照步骤进行安装配置即可。

**[Node](https://nodejs.org)**

前端开发必备工具，不用多说什么。

**[React Native CLI](http://facebook.github.io/react-native/docs/getting-started.html)**

React Native 的命令行工具。

```shell
npm install -g react-native-cli
```

**[react-native-debugger](https://github.com/jhen0409/react-native-debugger)**

React Native 的调试工具，可以打印日志、查看网络请求、查看存储等。

```shell
brew update && brew cask install react-native-debugger
```


## 常用的NPM开发库

**[React Native Navigation](https://wix.github.io/react-native-navigation/#/)**

路由组件库。

**[react-native-keyboard-aware-scroll-view](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view)**

解决 APP 中的键盘遮挡问题。

**[react-native-image-zoom-viewer](https://github.com/ascoders/react-native-image-viewer)**

实现大图预览（支持手势缩放）。

**[react-native-image-picker](https://github.com/ascoders/react-native-image-viewer)**

实现图片上传，查看[中文教程](https://github.com/react-native-community/react-native-image-picker)。

**[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)**

实现图片选择、图片剪裁 ，查看[中文教程](https://blog.csdn.net/ZhangKui0418/article/details/82887649)。

**[react-native-actionsheet-api](https://github.com/qfight/react-native-actionsheet-api)**

提供Android和iOS平台通用的的showActionSheetWithOptions()API。统一使用ActionSheet。调用时，如果是iOS，调用ActionSheetIOS.showActionSheetWithOptions()。

**[@ant-design/react-native](https://rn.mobile.ant.design/docs/react/introduce-cn)**

Ant Design 的移动规范的 React Native 实现。我们在使用 RN 提供的组件无法满足需求时，可以参考该组件库。

**[react-component/form](https://github.com/react-component/form)**

用于表单封装，提供表单绑定、校验、取值、写值等功能，使用方法同 [Ant-Design Form](https://ant.design/components/form-cn/#Form.create(options))。

**[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)**

Moment.js 的 2kB 轻量化方案，拥有同样强大的 API。


## 运行项目

运行 Android 项目

```shell
$ react-native run-android
```

运行 iOS 项目


```shell
$ cd ios && pod install
$ cd .. && react-native run-ios
```

## 开发基本规范

内容待定。

### 目录结构

内容待定。

### 文件命名规则

内容待定。


## React Native 样式布局

首先必须了解下 React Native 样式布局的两条基本规则：

1、React Native 中的样式，是直接通过组件的 style 属性进行内联设置，不支持 CSS 类名设置。

2、React Native 中的文字必须包裹在 Text 组件里面，否则不显示内容。而且font、text、color等字体、文本、颜色属性不能加在 View 组件上，只能加在 Text 组件上。同时padding、border、margin、backgroundColor等盒模型、背景属性只能加在 View 组件上，而不能应用于 Text 组件。

因此在布局时，往往需要对文本内容进行 View + Text 的层级嵌套书写：

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
    borderTopWidth: '1px',
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

RN中的背景设置仅支持 `background-color` 一个属性，不支持 `background: url()` 等其它方式。在 Taro 中书写 CSS `background: #fff;`，最终编译会被转换为 `background-color: #fff;` ，但是在JS代码中书写的则不会被转换。因此统一禁止 `background` 属性的使用，一律通过 `background-color` 属性进行背景颜色的设置。

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

APP有一套自己的方式去使用iconfont，这与Web端、小程序端有所差异，为了多端统一，我们暂时不得不放弃使用iconfont，而改用 `Image` 图片引入。待有比较好的兼容方案再做优化调整。

## React Native 路由导航

内容待定。

## React Native 接口管理

内容待定。

## React Native 功能点实现

内容待定。

### 第三方组件库

内容待定。

### 页面滚动行为

内容待定。

### 键盘遮挡的解决办法

内容待定。

### Storage存储

内容待定。

### 信息提示

内容待定。

### 操作确认框

内容待定。

### 上传图片

内容待定。

### 预览图片

内容待定。
