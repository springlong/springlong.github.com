import React, { Component } from 'react'

export default class Center extends Component {
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
      <div className="page-wrap">
        <h2 className="page-title">
          用户中心页面
        </h2>
        <div className="page-cont">
          欢迎您的登录！亲爱的用户先生/女士！
        </div>
      </div>
    );
  }
}
