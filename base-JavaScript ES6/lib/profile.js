'use strict';

console.log('module profile start');

var prop = {};
var test = 'test a message';

// 将声明的变量导出
export var firstName = 'first-Michael';
export var lastName = 'last-Jackson';
export var year = 1958;

// 导出一个函数
export function multiply(x, y) {
	return x * y;
}

// 导出一组变量
export { prop, test };

// 使用as关键字重命名exprot导出的变量名称
// oldname as newname
export { prop as a, test as b };

// 导出默认值
export default {
	firstName: firstName,
	lastName: lastName,
	year: year,
	prop: prop,
	test: test,
	multiply: multiply
};

// exprot语句导出的接口，与其对应的值是动态绑定的。即通过该接口，可以去到模块内部实时的值
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
setTimeout(function () {
	year = 1992;
}, 500);

console.log('module profile end');

// export命令可以出现在模块的任何位置，只要处于模块顶层就可以。
// 如果处于块级作用域内，就会报错，import命令也是如此。
// 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

// export命令不能重复导出相同名称的变量，否则会报错


// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
// export { foo, bar } from 'my_module';

// // 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };