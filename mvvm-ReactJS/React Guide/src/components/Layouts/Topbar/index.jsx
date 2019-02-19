import React, { Component } from 'react'

export default class Topbar extends Component {
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
      <div className="topbar-wrap">
        topbar工具栏
      </div>
    );
  }
}
