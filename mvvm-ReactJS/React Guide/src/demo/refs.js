import React, { Component } from 'react';

// 自定义一个函数组件
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

class DemoRefs extends Component {
  // 初始化页面常量、绑定事件方法
  constructor(props) {
    super(props);

    // 组件数据
    this.state = { }
  }

  // 事件绑定函数
  handleFocus = (e) => {
    this.input.focus()

    console.log(this.inputElement);
  }

  // DOM渲染
  render() {
    // 通过ref回调函数可以访问DOM元素的引用，
    // 将其赋值给this上下文即可在组件其他位置访问
    return (
      <div className="demo-module">
        <h2>demo-refs</h2>
        <hr />
        <input
          type="text"
          ref={(input) => { this.input = input; }}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleFocus}
        />
        <hr />
        <p>父子组件之间的ref传递</p>
        <CustomTextInput inputRef={el => this.inputElement = el} />
      </div>
    );
  }
}

export default DemoRefs;
