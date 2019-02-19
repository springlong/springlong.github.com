import React, { Component } from 'react'

export default class DemoBase extends Component {
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
      <div className="demo-wrap">
        <h2 className="demo-title">
          demo-module
        </h2>
        <div className="demo-cont">
          <p>{this.state.msg}</p>
        </div>
      </div>
    );
  }
}
