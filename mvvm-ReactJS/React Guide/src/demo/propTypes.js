import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DemoPropTypes extends Component {
  // 初始化页面常量、绑定事件方法
  constructor(props) {
    super(props);

    // 组件数据
    this.state = { }
  }

  // DOM渲染
  render() {
    // 函数、对象不能作为React子元素
    console.log('typeArray:', this.props.typeArray);
    console.log('typeBool:', this.props.typeBool);
    console.log('typeFunc:', this.props.typeFunc);
    console.log('typeNumber:', this.props.typeNumber);
    console.log('typeObject:', this.props.typeObject);
    console.log('typeString:', this.props.typeString);
    console.log('typeSymbol:', this.props.typeSymbol);
    console.log('typeElement:', this.props.typeElement);
    console.log('typeOneOf:', this.props.typeOneOf);
    console.log('typeOneOfType:', this.props.typeOneOfType);
    console.log('typeArrayOf:', this.props.typeArrayOf);
    console.log('typeObjectOf:', this.props.typeObjectOf);
    console.log('typeShape:', this.props.typeShape);
    console.log('typeRequire:', this.props.typeRequire);
    console.log('typeAnyRequire:', this.props.typeAnyRequire);
    console.log('typeCustom:', this.props.typeCustom);
    console.log('typeCustomArrayOf:', this.props.typeCustomArrayOf);

    return (
      <div className="demo-module">
        <h2>demo-propTypes</h2>
      </div>
    );
  }
}

// 配置props属性的类型验证
DemoPropTypes.propTypes = {
  // JS原始类型验证
  typeArray: PropTypes.array,
  typeBool: PropTypes.bool,
  typeFunc: PropTypes.func,
  typeNumber: PropTypes.number,
  typeObject: PropTypes.object,
  typeString: PropTypes.string,
  typeSymbol: PropTypes.symbol,

  // 一个React元素
  typeElement: PropTypes.element,

  // 类似枚举值，符合某个集合中的某一个值
  typeOneOf: PropTypes.oneOf(['News', 'Photos']),

  // 多个类型的其中之一
  typeOneOfType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  // 某种类型值的数组
  typeArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 某种类型值的对象
  typeObjectOf: PropTypes.objectOf(PropTypes.string),

  // 一个特定类型的对象
  // 经测试：不起作用
  typeShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 要求必填项
  typeRequire: PropTypes.string.isRequired,

  // 任意类型的必填项
  typeAnyRequire: PropTypes.any.isRequired,

  // 自定义验证器
  // 如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，
  // 因为这不会在 `oneOfType` 类型的验证器中起作用。
  typeCustom: (props, propName, compName) => {
    if (props[propName] !== 'customValue') {
      return new Error('Invalid prop `' + propName + '` supplied to `' + compName + '`')
    }
  },

  // 可以声明`arrayOf`和`objectOf`类型的验证器
  typeCustomArrayOf: PropTypes.arrayOf((propValue, key, compName, location, propFullName) => {
    if (typeof propValue[key] !== 'string') {
      return new Error('Invalid prop `' + propFullName + '` supplied to `' + compName + '`')
    }
  }),

  // 你也可以声明一个 prop 是类的一个实例。
  // 使用 JS 的 instanceof 运算符。
  // typeMessage: PropTypes.instanceOf(Message),

  // 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
  // typeNode: PropTypes.node,
}

// 配置props的默认值
// 和PropTypes无关，React原生可直接设置
DemoPropTypes.defaultProps = {
  typeString: 'str-default',
}

export default DemoPropTypes;
