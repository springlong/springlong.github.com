import React, { Component } from 'react'

export default class Register extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }
  }

  // 注册
  handleRegister = () => {

  }

  // 返回登录
  handleNavigatorToLogin = () => {

  }

  // DOM渲染
  render() {
    return (
      <div className="page-wrap">
        <h2 className="page-title">
          注册页面
        </h2>
        <div className="page-cont">
          <div><button onClick={this.handleRegister}>注册</button></div>
          <div><button onClick={this.handleNavigatorToLogin}>返回登录</button></div>
        </div>
      </div>
    );
  }
}
