import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

export default class List extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
      msg: 'Hello React!'
    }

    // console.log('List-constructor', this.props)
  }

  // DOM渲染
  render() {
    const {match} = this.props

    return (
      <div className="page-wrap">
        <h2 className="page-title">
          列表页面
        </h2>
        <div className="page-cont">
          <div className="page-section">path: <code>{match.path}</code></div>
          <div className="page-section">url: <code>{match.url}</code></div>
          {/*
            Switch组件：仅选择第一个匹配的Route组件进行渲染
          */}
          <Switch>
            <Route exact path={match.path} render={(props) => {
              return (<div className="page-section">默认列表</div>)
            }} />
            <Route path={`${match.path}/shop`} render={(props) => {
              return (<div className="page-section">店铺列表</div>)
            }} />
            <Route path={`${match.path}/goods`} render={(props) => {
              return (<div className="page-section">商品列表</div>)
            }} />
            <Route render={(props) => {
              return (<div className="page-section">未知列表</div>)
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}
