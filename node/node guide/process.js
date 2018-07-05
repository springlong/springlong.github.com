'use strict';

// =====================================================================
// =====================================================================
// process 是一个全局变量，即 global 对象的属性。
// 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。

// 当进程准备退出时触发
process.on('exit', function(code){

	// 以下代码永远不会执行
	setTimeout(function(){
		console.log('该代码不会被执行');
	}, 0);

	console.log('退出码:', code);
});

console.log('程序执行结束！');

// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
// argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
process.argv.forEach(function(val, index, array) {
   console.log('argv:' + index + ': ' + val);
});

// 获取执行路径
console.log('process.execPath:' + process.execPath);

// 平台信息
console.log('process.platform:' + process.platform);

// 输出当前目录
console.log('process.cwd()当前目录: ' + process.cwd());

// 输出当前版本
console.log('process.version当前版本: ' + process.version);

// 输出内存使用情况
console.log('process.memoryUsage内存使用情况:', process.memoryUsage());

