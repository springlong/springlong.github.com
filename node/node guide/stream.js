'use strict'

// 引入文件操作
// https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');

// 引入压缩包组件
// https://www.npmjs.com/package/zlib
var zlib = require('zlib');

// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。



// ==================================================
// ==================================================
// // 从流中读取数据
// console.log('\r\n 从流中读取数据: \r\n');

// let dataRead = '';

// // 创建可读流
// const readerStream = fs.createReadStream('input.txt');

// // 设置编码为 utf8
// readerStream.setEncoding('UTF8');

// // 处理流事件-当有数据可读时触发
// readerStream.on('data', function(chunk){
// 	console.log('data:' , chunk);
// 	dataRead += chunk;
// });

// // 处理流事件-没有更多的数据可读时触发
// readerStream.on('end', function(){
// 	console.log('end:', dataRead);
// });

// // 处理流事件-在接收和写入过程中发生错误时触发
// readerStream.on('error', function(err){
// 	console.log(err.stack);
// });

// console.log('程序执行完毕');




// ==================================================
// ==================================================
// // 写入流
// console.log('\r\n 写入流: \r\n');

// let dataWrite = '这里是一段内容，需要写入到文件中！';

// // 创建可读流
// const writerStream = fs.createWriteStream('output.txt');

// // 使用utf8编码写入数据
// writerStream.write(dataWrite, 'UTF8');

// // 标记文件末尾
// writerStream.end();

// // 处理流事件-所有数据已被写入到底层系统时触发
// writerStream.on('finish', function(){
// 	console.log('写入完成');
// });

// // 处理流事件-在接收和写入过程中发生错误时触发
// writerStream.on('error', function(err){
// 	console.log(err.stack);
// });

// console.log('程序执行完毕');






// ==================================================
// ==================================================
// // 管道流
// // 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

// console.log('\r\n 管道流: \r\n');

// // 创建一个可读流
// const readerStream = fs.createReadStream('input.txt');

// // 创建一个可写流
// const writerStream = fs.createWriteStream('output2.txt');

// // 管道读写操作
// // 读取input.txt文件内容，并将内容写入到output.txt文件中
// readerStream.pipe(writerStream);

// console.log('程序执行完毕!');






// ==================================================
// ==================================================
// 链式流
// 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

// console.log('\r\n 链式流: \r\n');

// fs.createReadStream('input.txt')
// 	.pipe(zlib.createGzip())
// 	.pipe(fs.createWriteStream('input.txt.gz'));

// console.log('文件压缩完成！');