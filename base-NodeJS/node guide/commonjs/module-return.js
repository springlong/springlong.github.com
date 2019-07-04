'use strict'

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

// 模块返回方案1
module.exports = {
	Hello: Hello,
	name: moduleName
};

// 模块返回方案2
exports.Hello = Hello;
exports.name = moduleName;