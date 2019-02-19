import React, { Component } from 'react'

export default class Header extends Component {
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
      <div className="hd-wrap">
        头部模块
      </div>
    );
  }
}
