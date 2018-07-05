import React, { Component } from 'react';

class ComponentName extends Component {
  // 初始化页面常量、绑定事件方法
  constructor(props) {
    super(props);

    // 组件数据
    this.state = { }
  }

  // DOM渲染
  render() {
    return (
      <div className="demo-module">
        <h2>demo-module</h2>
        <hr />
      </div>
    );
  }
}

export default ComponentName;
