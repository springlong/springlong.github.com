import React, { Component } from 'react'

export default class FindPsw extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }
  }

  // 重置密码
  handleResetPsw = () => {

  }

  // 返回登录
  handleNavigatorToLogin = () => {

  }

  // DOM渲染
  render() {
    return (
      <div className="page-wrap">
        <h2 className="page-title">
          找回密码
        </h2>
        <div className="page-cont">
          <div><button onClick={this.handleResetPsw}>重置密码</button></div>
          <div><button onClick={this.handleNavigatorToLogin}>返回登录</button></div>
        </div>
      </div>
    );
  }
}
