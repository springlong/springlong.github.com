import React, { Component } from 'react'
import { Link, NavLink, withRouter, matchPath } from 'react-router-dom'

class Nav extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }

    // console.log('Nav-constructor', this.props)

    // matchPath 用来比较给定的网页路径与路由配置是否匹配
    // 如果匹配则返回match对象，否则返货null
    const match1 = matchPath('/user/123', {
      path: '/user/:id',
      exact: true,
      strict: false,
    })
    const match2 = matchPath('/user/', {
      path: '/user/:id',
      exact: true,
      strict: false,
    })
    if (this.props.location.pathname === '/') {
      console.log('matchPath-demo1', match1)
      console.log('matchPath-demo2', match2)
    }
  }

  // DOM渲染
  render() {
    return (
      <div className="nav-wrap">
        <ul className="nav-cont">
          <li className="nav-item">
            {/* Link 和 NavLink 组件将被渲染为 <a> 标签 */}
            <Link
              // 跳转到新的路径(string)
              to="/?name=yangtuan&sex=male#start"
            >
              首页
            </Link>
          </li>
          <hr/>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(Object)
              to={{
                // 网页路径
                pathname: '/list',
                // 查询字符串
                search: '?type=10088',
                // hash字符串
                hash: '#the-hash',
                // 传递的数据，通过 props.match.location.state 访问
                state: {
                  from: 'home-jump'
                }
              }}
            >
              列表页 /list
            </Link>
          </li>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(string)
              to="/list/"
              // 是否替换当前访问历史记录(bool)，默认为false
              replace
            >
              列表页 /list/
            </Link>
          </li>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(string)
              to="/List/"
              // 其它<a>标签可以使用的属性
              title="该链接用来测试路由匹配的大小写敏感规则"
              className="a-link"
              id="testALink"
            >
              列表页 /List/
            </Link>
          </li>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(string)
              to="/list/shop"
              // 用于访问link组件自身的引用(func)
              innerRef={(node) => {
                if (this.props.location.pathname === '/') {
                  console.log('Nav-innerRef', node)
                }
              }}
            >
              列表页 /list/shop
            </Link>
          </li>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(string)
              to="/list/goods"
            >
              列表页 /list/goods
            </Link>
          </li>
          <li className="nav-item">
            <Link
              // 跳转到新的路径(string)
              to="/list/brand"
            >
              列表页 /list/brand
            </Link>
          </li>
          <hr/>
          {/* NavLink 扩展至 Link，当 url 与该组件的路由匹配时将添加样式属性，俗称“当前链接被激活” */}
          <li className="nav-item">
            <NavLink
              // 同 link 的 to 属性
              to="/detail"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="active"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
              // 是否开启完全匹配模式，默认为false
              exact
              // 是否开启严格模式，默认为false
              strict
            >
              详情页 /detail
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              // 同 link 的 to 属性
              to="/detail/"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="active"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
            >
              详情页 /detail/
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              // 同 link 的 to 属性
              to="/detail/6688"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="selected"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
            >
              详情页 /detail/6688
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              // 同 link 的 to 属性
              to="/detail/6688/comment"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="selected"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
            >
              详情页 /detail/6688/comment
            </NavLink>
          </li>
          <hr/>
          <li className="nav-item">
            <NavLink
              to="/login"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="selected"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
              // 用来添加额外的逻辑来确定链接是否为激活状态，返回true表示激活状态，false表示非激活状态。
              // match (Object): 如果当前url与该链接路由匹配，则返回匹配后的match信息；否则返回null
              // location (Object): 当前url的相关信息
              isActive={(match, location) => {
                // console.log('Nav-NavLink-isActive', match, location)
                // 当路由匹配，且存在search字符串时，即为激活状态
                return match && location.search !== '';
              }}
            >
              登录
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/register"
              // 当该链接处于激活状态时赋予的class类名，默认为 active
              activeClassName="selected"
              // 当该链接被激活时设置的样式属性
              activeStyle={{
                fontWeight: 'bold',
                color: 'green',
              }}
              // 用来添加额外的逻辑来确定链接是否为激活状态，返回true表示激活状态，false表示非激活状态。
              // match (Object): 如果当前url与该链接路由匹配，则返回匹配后的match信息；否则返回null
              // location (Object): 当前url的相关信息
              isActive={(match, location) => {
                // console.log('Nav-NavLink-isActive', match, location)
                // 当路由匹配，且存在search字符串时，即为激活状态
                return match && location.search !== '';
              }}
              // 默认情况下，isActive使用当前网页URL进行匹配，如果你希望与给定的路径进行匹配，则可以使用该参数进行设置
              location={{
                pathname: '/register',
                search: '?test=1',
                hash: '',
              }}
            >
              注册
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/center">
              用户中心
            </NavLink>
          </li>
          <hr/>
          <li className="nav-item">以下用来测试props.history相关的导航函数：</li>
          <li className="nav-item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                this.props.history.push('/list')
              }}
            >
              push(path): 跳转到新的路径
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                this.props.history.replace('/detal')
              }}
            >
              replace(path): 替换当前访问记录
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                this.props.history.go(2)
              }}
            >
              go(n): 将历史堆栈中的指针移动n个条目
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                this.props.history.goBack()
              }}
            >
              goBack(): 回退，相当于 go(-1)
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                this.props.history.goForward()
              }}
            >
              goForward(): 前进，相当于 go(1)
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Nav)
