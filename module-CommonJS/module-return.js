'use strict'

// CommonJS规范规定：
// 每个js文件就是一个模块，有自己的作用域，文件中的变量、函数、类等都是对其他文件不可见的。
// 如果想在多个文件中分享变量，必须定义为global对象的属性（不推荐）。
// 模块必须通过module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。


// 一个类
class Hello {
	constructor() {
		this.name = undefined;
	}
	setName(aName) {
		this.name = aName;
	}
	sayHello() {
		console.log('Hello ' + this.name);
	}
};

// 一个变量
let moduleName = 'test a module';


// 模块内容导出：方案1
// 对module.exprots进行重新赋值进行内容的导出
module.exports = {
	Hello: Hello,
	name: moduleName
};


// 模块内容导出：方案2
// exports是对module.exprots的引用
// 通过对exports附加成员进行内容的导出
exports.Hello = Hello;
exports.name = moduleName;

// 注意，CommonJS不能通过return返回