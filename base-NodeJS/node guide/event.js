'use strict'


// ========================================================================
// ========================================================================

// 引入 events 模块
const EventEmitter = require('events').EventEmitter;

// 创建对象
const emitter = new EventEmitter();

// 注册事件
emitter.on('some_event', function(arg1, arg2){
	console.log('some_event1 事件触发', arg1, arg2);
});

// 注册事件
emitter.on('some_event', function(arg1, arg2){
	console.log('some_event2 事件触发', arg1, arg2);
});

// 触发事件传递参数
emitter.emit('some_event', 'arg1参数值', 'arg2参数值');



// ========================================================================
// ========================================================================

// // 引入 events 模块
// const EventEmitter = require('events').EventEmitter;

// // 创建对象
// const emitter = new EventEmitter();

// // 注册事件
// emitter.on('some_event', function(){
// 	console.log('some_event 事件触发');
// });

// setTimeout(function(){
// 	// 触发事件
// 	emitter.emit('some_event');
// }, 1000);