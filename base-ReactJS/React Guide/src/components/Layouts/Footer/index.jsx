import React, { Component } from 'react'

export default class Footer extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }

    // console.log('Footer-constructor', this.props)
  }

  // DOM渲染
  render() {
    return (
      <div className="ft-wrap">
        尾部模块
      </div>
    );
  }
}
