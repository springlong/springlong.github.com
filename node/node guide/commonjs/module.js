'use strict'

// 通过require加载某个模块
// 返回结果是模块内部返回的module.exports
const mod = require('./module-return');

console.log(mod);

let objHello = new mod.Hello();
objHello.setName('Yangtuan');
objHello.sayHello();

console.log(mod.name);