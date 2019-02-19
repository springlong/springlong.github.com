import React, { Component } from 'react'

export default class Login extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }
  }

  // 登录
  handleLogin = () => {

  }

  // 找回密码
  handleFindPW = () => {

  }

  // DOM渲染
  render() {
    return (
      <div className="page-wrap">
        <h2 className="page-title">
          登录页面
        </h2>
        <div className="page-cont">
          <div><button onClick={this.handleLogin}>登录</button></div>
          <div><button onClick={this.handleFindPW}>找回密码</button></div>
        </div>
      </div>
    );
  }
}
