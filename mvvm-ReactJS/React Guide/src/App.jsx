import React from 'react';
import {
  HashRouter,
  BrowserRouter,
  Route
} from 'react-router-dom';

import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import Center from './pages/User/Center'

import Header from './components/Layouts/Header'
import Nav from './components/Layouts/Nav'
import Footer from './components/Layouts/Footer'

import './App.scss'

// 路由包装组件demo
const WrappedComponent = () => (
  <div className="page-wrap">这是通过 Route 组件的 render 方式包装后的路由组件所呈现的内容</div>
)

// 使用 Route 组件的 render 方式包装路由组件
const WrappedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      <div className="wrapped-route">
        <Component {...props} />
      </div>
    )}
  />
)

// 主要的布局组件
const PrimaryLayout = () => (
  <div id="app">
    {/* 头部，组件props无法访问路由信息 */}
    <Header/>

    {/*
      导航（在该组件中测试 Link 和 NavLink 组件的使用规则，并测试通过JS代码进行导航的相关行为）
      该组件通过 withRouter 高阶组件进行包装，可以通过props访问路由信息。
    */}
    <Nav/>

    {/*
      Route 组件的作用：当一个 location 与路由的 path 匹配时，渲染给定的UI组件。
      一个 location 允许匹配多个 Route 组件进行UI渲染。
    */}
    {/*
      Route 组件的属性：
      |-- path (string):
          路由的匹配路径。如果没有指定 path 属性，那么 Route 组件将总是会被匹配。
      |-- exact (bool):
          默认为 false，即路由匹配为包含模式。例如 location.pathname 为 '/detail/1688'，将会分别匹配到 path 为 '/detail/:id'、'/detail/'、 '/detail'、'/'的 Route 组件。
          为 true 时，则表示完全匹配模式。要求 path 的路径与 location.pathname 必须完全匹配。例如 path="/"，仅会匹配 location.pathname 为 '/' 的路径。
      |-- strict (bool):
          默认为 false，即非严格模式，针对有斜杠(/)结尾的 path 路径，location.path 不做斜杠的校验处理。
          为 true 时，那么有斜杠结尾的 path 路径，只能匹配带有斜杠的 location.path。
      |-- sensitive (bool):
          默认为 false，不区分大小写。
          为 true 时，将区分路径的大小写规则。
    */}
    {/*
      Route 组件的三种渲染方式：
      |-- component:
          当路由匹配时，渲染组件。
      |-- render (func):
          当路由匹配时，通过 render 函数返回最终渲染的内容，用于内联渲染和包装路由组件。
      |-- children (func):
          与render表现一致，只是不管路由是否匹配都会被渲染。
    */}
    {/*
      通过 Route 渲染的组件，其 props 都将携带如下路由信息：
      |-- match (Object):
          当前匹配的路由信息
          |-- path (string): 路径模式，即Route组件中的path属性
          |-- url (string): 匹配路径，即location.pathname与路径模式path相匹配的url部分。
          |-- params (Object): 动态参数
          |-- isExact (bool): 是否与当前网页路径完全匹配
      |-- location (Object):
          当前匹配的url信
          |-- pathname (string): 页面路径
          |-- search (string): 查询参数
          |-- hash (string): hash字符串
          |-- state (Object): 路由跳转携带的数据
      |-- history (Object):
          历史记录
          |-- length (number): 当前历史记录的记录条数
          |-- action (string): 当前访问记录的行为（PUSH-新页面访问、REPLACE-替换已有页面、POP-历史记录访问）
          |-- location (Object): 当前访问记录的url信息，同 Route 组件的 props.location。由于 history 对象是可变的，所以不要使用该对象访问url信息。
          |-- push(path): 跳转到新的路径
          |-- replace(path): 替换当前访问记录
          |-- go(n): 将历史堆栈中的指针移动n个条目
          |-- goBack(): 回退，相当于 go(-1)
          |-- goForward(): 前进，相当于 go(1)
    */}
    <Route exact path="/" component={Home}/>

    {/* 路由匹配默认为包含模式(exact=false)，因此 '/list/' 的路径将同时匹配下面2个路由组件 */}
    <Route path="/list" component={List}/>
    <Route strict sensitive path="/list/" component={List}/>

    {/*
      path路由配置，可以使用一些适配符号。
      具体可参见：https://github.com/pillarjs/path-to-regexp/tree/v1.7.0
    */}
    <Route path="/detail/:id?/:section?" component={Detail}/>

    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/center" component={Center}/>

    {/* 通过 render 函数进行内联渲染 */}
    <Route exact path="/" render={(props) => {
      // console.log('Route by render-props', props)
      return (<div className="page-wrap">没有指定 path 属性，那么 Route 组件将总是会被匹配。</div>)
    }}/>
    {/* 通过 render 函数包装后的 Route 组件 */}
    <WrappedRoute exact path="/" component={WrappedComponent}/>

    {/*
      通过 children 函数进行内联渲染。
      与render表现一致，只是不管路由是否匹配都会被渲染。
    */}
    <Route exact path="/center" children={(props) => {
      // console.log('Route by children-props', props)
      return (<div className="page-wrap">children渲染函数不管路由匹配与否都会被渲染。</div>)
    }}/>

    {/* 尾部，组件props无法访问路由信息 */}
    <Footer/>
  </div>
)

// 路由容器（用来保持与location的同步）
// 一个路由容器只能包含一个子元素，否则编译报错
// BrowserRouter - 使用 HTML5 history API 来模拟导航
const BrowserRouterApp = () => (
  <BrowserRouter>
    <PrimaryLayout/>
  </BrowserRouter>
)

// 路由容器（用来保持与location的同步）
// 一个路由容器只能包含一个子元素，否则编译报错
// HashRouter - 使用 Url hash 来模拟导航
const HashRouterApp = () => (
  <HashRouter>
    <PrimaryLayout/>
  </HashRouter>
)

export default BrowserRouterApp;
