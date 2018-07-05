import React, { Component } from 'react';

// 使用片段包含多个子节点
function Columns() {
  return (
    <React.Fragment>
      <td>Hello</td>
      <td>World</td>
    </React.Fragment>
  )
}

class DemoFragments extends Component {
  // 初始化页面常量、绑定事件方法
  constructor(props) {
    super(props);

    // 组件数据
    this.state = { }
  }

  // DOM渲染
  render() {
    const datas = [['col-1-1', 'col-1-2'], ['col-2-1', 'col-2-2']]

    return (
      <div className="demo-module">
        <h2>demo-fragments</h2>
        <hr />
        <table>
          <tbody>
            <tr>
              <Columns />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DemoFragments;
