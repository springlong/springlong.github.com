
console.log('module test2 start');

// 模块声明中使用函数进行相关处理，最后返回一个对象
define(function(){

	console.log('module test2 code');

	return {
		prop: 'test2.js'
	}
});

console.log('module test2 end');