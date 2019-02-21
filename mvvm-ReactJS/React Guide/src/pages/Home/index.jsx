import React, { Component } from 'react'
import queryString from 'query-string'

export default class Home extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = {
    }

    console.log('Home-constructor', this.props)
  }

  // DOM渲染
  render() {
    // 由于没有处理复杂 query 字符串的标准。所以 React Router V4 决定把 query 字符串的处理权留给开发者。
    // 这里我们使用 query-string 库来完成查询字符串的解析工作。
    // 使用方式具体参见：https://www.npmjs.com/package/query-string
    const queryObj = queryString.parse(this.props.location.search)

    return (
      <div className="page-wrap">
        <h2 className="page-title">
          首页
        </h2>
        <div className="page-cont">
          {JSON.stringify(queryObj)}
        </div>
      </div>
    );
  }
}
