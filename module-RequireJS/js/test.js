
console.log('module test start');

// 模块声明可以直接声明并返回一个对象
define({
	abc: function(){},
	prop: 'test.js',
});

console.log('module test end');