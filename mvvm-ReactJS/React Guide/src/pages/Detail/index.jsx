import React, { Component } from 'react'

export default class Detail extends Component {
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
          详情页面
        </h2>
        <div className="page-cont">
          ...
        </div>
      </div>
    );
  }
}
