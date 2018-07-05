'use strict'

// 通过require()同步加载一个模块，后续代码会等待模块加载完成后才会执行
// require()的返回结果就引用的模块内部通过module.exports导出的内容
// 如果不存在所引用的模块，将报错不再执行
const mod = require('./module-return');

console.log(mod);

let objHello = new mod.Hello();
objHello.setName('Yangtuan');
objHello.sayHello();

console.log(mod.name);