import React, { Component } from 'react'
import { Route } from 'react-router-dom'

export default class Detail extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }

    // console.log('Detail-constructor', this.props)
  }

  // DOM渲染
  render() {
    // console.log('Detail-render', this.props)

    return (
      <div className="page-wrap">
        <h2 className="page-title">
          详情页面 (id: {this.props.match.params.id})
        </h2>
        <div className="page-cont">
          <div className="page-section">path: <code>{this.props.match.path}</code></div>
          <div className="page-section">url: <code>{this.props.match.url}</code></div>
          <div className="page-section">详情页-头部</div>
          <div className="page-section">详情页-商品介绍</div>
          <div className="page-section">详情页-商品评价</div>
          <div className="page-section">详情页-售后保障</div>
          <div className="page-section">详情页-尾部</div>
        </div>
      </div>
    );
  }
}
