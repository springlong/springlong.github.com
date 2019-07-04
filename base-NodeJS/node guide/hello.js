'use strict'


// =======================================================================================
// =======================================================================================
// Node.js 事件循环
// Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
// Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

// 引入 events 模块
const events = require('events');

// 创建一个eventEmitter对象
const eventEmitter = new events.EventEmitter();

// 创建事件处理程序
const connectHandler = function() {
	console.log('链接成功。');

	// 触发 data_received 事件
	eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
});

// 触发 connection 事件
eventEmitter.emit('connection');

console.log('程序执行完毕');


// =======================================================================================
// =======================================================================================
// Node.js 异步编程的直接体现就是回调。


// 非阻塞代码实例
// 异步回调函数
// const fs = require('fs-extra');

// const data = fs.readFile('input.txt', function(err, data){
//     if(err) return console.error(err);
//     console.log(data.toString());
// });
// console.log('程序执行完毕');


// 阻塞代码实例
// const fs = require('fs-extra');

// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log('程序执行完毕');