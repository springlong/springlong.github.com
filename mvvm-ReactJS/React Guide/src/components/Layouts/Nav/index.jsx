import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }
  }

  // DOM渲染
  render() {
    return (
      <div className="nav-wrap">
        <ul className="nav-cont">
          <li className="nav-item"><Link to="/">首页</Link></li>
          <li className="nav-item"><Link to="/list">列表页</Link></li>
          <li className="nav-item"><Link to="/detail">详情页</Link></li>
          <li className="nav-item"><Link to="/login">登录页面</Link></li>
          <li className="nav-item"><Link to="/center">用户中心</Link></li>
        </ul>
      </div>
    );
  }
}
