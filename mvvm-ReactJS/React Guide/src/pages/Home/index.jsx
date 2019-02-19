import React, { Component } from 'react'

export default class Home extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
    }
  }

  // DOM渲染
  render() {
    return (
      <div className="page-wrap">
        <h2 className="page-title">
          首页
        </h2>
        <div className="page-cont">
          ...
        </div>
      </div>
    );
  }
}
