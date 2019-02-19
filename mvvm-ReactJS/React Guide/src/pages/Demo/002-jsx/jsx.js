import React, { Component } from 'react';

// 无状态函数式组件（PureCompoent）：组件名称必须首字母大写，否则在JSX中会被当作普通html标签处理
function testComp1() {
  return (<p>testComp1</p>)
}

// 无状态函数式组件（PureCompoent）：组件名称必须首字母大写
function TestComp2(props) {
  return (
    <div>
      TestComp2 {props.foo}
      <p>{props.message1}</p>
      <p>{props.message2}</p>
      <p>{String(props.checkType1)}</p>
      <p>{String(props.checkType2)}</p>
      <p>{String(props.checkType3)}</p>
      {/* slot内容 */}
      <div>{props.children}</div>
    </div>
  )
}

// 无状态函数式组件（PureCompoent）：重复内容
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

// ES6方式创建的有状态组件
export default class DemoJSX extends Component {
  // 初始化组件数据、绑定事件方法的this
  constructor(props) {
    super(props);

    // 组件数据
    this.state = { }
  }

  // DOM渲染
  render() {
    return (
      <div className="demo-module">
        <h2>demo-jsx</h2>
        <hr />
        <h3>Booleans, Null, 和 Undefined 将被忽略，不会输出任何内容</h3>
        <p>true: {true}</p>
        <p>false: {false}</p>
        <p>undefined: {undefined}</p>
        <p>null: {null}</p>
        <h3>如果在输出中想要渲染 false ，true，null 或者 undefined ，你必须先将其转化为字符串</h3>
        <p>true: {String(true)}</p>
        <p>false: {String(false)}</p>
        <p>undefined: {String(undefined)}</p>
        <p>null: {String(null)}</p>
        <h3>“falsy”值在&&运算中将被输出，应确保&&之前的表达式总是布尔值</h3>
        <p>0: {0}</p>
        <p>0 && 'to do': {0 && 'to do'}</p>
        <p>1 && 'to do': {1 && 'to do'}</p>
        <p>false && 'to do': {false && 'to do'}</p>
        <p>true && 'to do': {true && 'to do'}</p>
        <h3>JSX会删除每行开头和结尾的空格，并且也会删除空行。</h3>
        <p>   a    b   c   d</p>
        <p>a b c d</p>
        <p>
            a

            b

            c

            d
        </p>
        <h3>组件名称必须首字母大写，否则在JSX中会被当作普通html标签处理</h3>
        <testComp1 />
        <h3>组件名称必须首字母大写，且在当前作用域有声明</h3>
        <TestComp2
          foo={1 + 2 + 3}
          message1="test a message1 <test></test> &gt;"
          message2={'test a message2 <test></test> &gt;'}
          checkType1
          checkType2={true}
          checkType3={false}
        >
          <p>child text</p>
          <p>{'child text'}</p>
          <Repeat numTimes={10}>
            {(index) => {
              return (<div key={index}>item {index}</div>)
            }}
          </Repeat>
        </TestComp2>
      </div>
    );
  }
}
