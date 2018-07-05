'use strict'

// 引入文件操作
// https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');


// 文件读取
// =================================================================
// =================================================================

// // 异步读取
// fs.readFile('input.txt', function(err, data){
// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log('异步读取：', data.toString());

// 	for(let name in data) {
// 		console.log('readFile-data.' + name);	
// 	}
// 	console.log('toString():', data.toString());
// 	console.log('toLocaleString():', data.toLocaleString());
// });

// // 同步读取
// const data = fs.readFileSync('input.txt');
// console.log('同步读取:', data.toString());

// console.log('程序执行完毕！');








// 打开文件
// fs.open(path, flags[, mode], callback)
// path - 文件的路径。
// flags - 文件打开的行为。具体值详见下文。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。
//
// flats:
// r	以读取模式打开文件。如果文件不存在抛出异常。
// r+	以读写模式打开文件。如果文件不存在抛出异常。
// rs	以同步的方式读取文件。
// rs+	以同步的方式读取和写入文件。
// w	以写入模式打开文件，如果文件不存在则创建。
// wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
// w+	以读写模式打开文件，如果文件不存在则创建。
// wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
// a	以追加模式打开文件，如果文件不存在则创建。
// ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
// a+	以读取追加模式打开文件，如果文件不存在则创建。
// ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
// =================================================================
// =================================================================

// console.log('准备打开文件');

// fs.open('input.txt', 'r+', function(err, fd){
// 	if(err) {
// 		return console.error(err);
// 	}
// 	console.log(fd);
// 	console.log('打开成功');
// });








// 获取文件信息
// fs.stat(path, callback)
// path - 文件路径。
// callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
// stats.isFile()	如果是文件返回 true，否则返回 false。
// stats.isDirectory()	如果是目录返回 true，否则返回 false。
// stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
// stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
// stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
// stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
// stats.isSocket()	如果是 Socket 返回 true，否则返回 false。
// =================================================================
// =================================================================

// console.log("准备读取文件信息");
// fs.stat('input.txt', function(err, stats) {

// 	if(err) {
// 		return console.error(err);
// 	}

// 	console.log(stats);
// 	console.log('读取文件信息成功');

// 	console.log('是否为文件(isFile)：', stats.isFile());
// 	console.log('是否为目录(isDirectory)：', stats.isDirectory());
// });








// 写入文件
// fs.writeFile(file, data[, options], callback)
// file - 文件名或文件描述符。
// data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
// options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
// =================================================================
// =================================================================

// console.log('准备写入文件');

// fs.writeFile('output.txt', '我是通过写入的文件内容', function(err){
// 	if(err){
// 		return console.error(err);
// 	}

// 	console.log('数据写入成功！');

// 	console.log('读取写入的数据\n');

// 	fs.readFile('output.txt', function(err, data){

// 		if(err) {
// 			return console.error(err);
// 		}

// 		console.log('异步读取文件数据:' + data.toString());
// 	});
// });








// 读取文件数据
// fs.read(fd, buffer, offset, length, position, callback)
// fd - 通过 fs.open() 方法返回的文件描述符。
// buffer - 数据写入的缓冲区。
// offset - 缓冲区写入的写入偏移量。
// length - 要从文件中读取的字节数。
// position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
// callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
// =================================================================
// =================================================================

// const buf = new Buffer(1024);

// console.log('准备打开已存在的文件!');

// fs.open('input.txt', 'r+', function(err, fd){

// 	if(err) {
// 		return console.log(err);
// 	}

// 	console.log('文件打开成功！');

// 	console.log('准备读取文件：');

// 	fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
// 		if(err){
// 			console.log(err);
// 		}

// 		console.log(bytes + ' 字节被读取');

// 		// 仅打印输出的字节
// 		if(bytes > 0) {
// 			console.log(buf.slice(0, bytes).toString());
// 		}

// 		// 关闭文件
// 		// fs.close(fd, callback)
// 		// fd - 通过 fs.open() 方法返回的文件描述符。
// 		// callback - 回调函数，没有参数。
// 		fs.close(fd, function(err){
// 			if(err) {
// 				console.log(err);
// 			}
// 			console.log('关闭文件成功！');
// 		});
// 	})
// });






// 截取文件内容，从指定位置截取文件内容，替换文件内容
// fs.ftruncate(fd, len, callback)
// fd - 通过 fs.open() 方法返回的文件描述符。
// len - 文件内容截取的长度。
// callback - 回调函数，没有参数。
// =================================================================
// =================================================================

// const buf = new Buffer(1024);

// console.log('准备打开文件！');

// fs.open('input.txt', 'r+', function(err, fd){
// 	if(err) return console.log(err);

// 	console.log('文件打开成功');
// 	console.log('截取10字节后的文件内容');

// 	// 截取文件内容
// 	fs.ftruncate(fd, 10, function(err){
// 		if(err){
// 			console.log(err);
// 		}

// 		console.log('文件截取成功');
// 		console.log('读取相同文件');

// 		// 读取文件
// 		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
// 			if(err) console.log(err);

// 			// 仅输出读取的字节
// 			if(bytes > 0) {
// 				console.log(buf.slice(0, bytes).toString());
// 			}

// 			// 关闭文件
// 			fs.close(fd);
// 		});
// 	})
// });





// 异步地追加数据到一个文件，如果文件不存在则创建文件。
// fs.appendFile(file, data[, options], callback)
// file <string> | <Buffer> | <number> 文件名或文件描述符
// data <string> | <Buffer>
// options <Object> | <string>
// 	encoding <string> | <null> 默认为 'utf8'
// 	mode <integer> 默认为 0o666
// 	flag <string> 默认为 'a'
// callback <Function>
// err <Error>
// =================================================================
// =================================================================

// fs.appendFile('message.txt', 'data to append', (err) => {
// 	if (err) throw err;
// 	console.log('The "data to append" was appended to file!');
// });








// 异步的将 src 拷贝到 dest
// fs.copyFile(src, dest[, flags], callback)
// src <string> | <Buffer> | <URL> 要被拷贝的源文件名称
// dest <string> | <Buffer> | <URL> 拷贝操作的目标文件名
// flags <number> 拷贝操作修饰符 默认: 0
// callback <Function>
// =================================================================
// =================================================================

// 默认情况下，destination.txt 将创建或覆盖
// 如果目标路径包含目录，且目录不存在，将报错
// fs.copyFile('message.txt', 'destination.txt', (err) => {
// 	if (err) throw err;
// 	console.log('source.txt was copied to destination.txt');
// });





// 重命名文件
// fs.rename(oldPath, newPath, callback)
// =================================================================
// =================================================================

// fs.rename('message.txt', 'message-newname.txt', (err) => {
// 	if (err) throw err;
// 	console.log('rename success');
// });





// 例子，处理 fs.watch 监听器
// 文件变更时，会触发callback回调, eventType == 'change'
// 文件删除时，会触发callback回调，eventType == 'rename'
// fs.watch('./input.txt', { encoding: 'buffer' }, (eventType, filename) => {
// 	if (filename) {
// 		console.log(filename); // 输出: <Buffer ...>
// 		console.log(filename.toString());
// 	}
// 	console.log('eventType:' , eventType);
// });




// 删除文件
// fs.unlink(path, callback)
// path - 文件路径。
// callback - 回调函数，没有参数。
// =================================================================
// =================================================================

// console.log('准备删除文件');

// fs.unlink('output2.txt', function(err){

// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log('文件删除成功！');
// });






// 创建目录
// fs.mkdir(path[, mode], callback)
// path - 文件路径。
// mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。
// 
// 重复创建目录将报错
// =================================================================
// =================================================================

// console.log("创建目录 test");

// fs.mkdir("./test",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });





// 读取目录
// fs.readdir(path, callback)
// path - 文件路径。
// callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。
// =================================================================
// =================================================================

// console.log("查看 test 目录");

// // 目录下不存在子级文件或目录，将报错
// fs.readdir("test", function(err, files){
//    if (err) {
//        return console.error(err);
//    }

//    console.log(files);
   
//    files.forEach( function (file){
//        console.log( file );
//    });
// });





// 删除目录
// fs.rmdir(path, callback)
// path - 文件路径。
// callback - 回调函数，没有参数。
// 
// 目录不为空，将无法删除，会报错
// =================================================================
// =================================================================

// console.log("准备删除目录 test");

// fs.rmdir("test", function(err){
//    if (err) {
//        return console.error(err);
//    }

//    console.log("读取 test 目录");

//    // 目录下不存在子级文件或目录，将报错
//    fs.readdir("test", function(err, files){
//       if (err) {
//           return console.error(err);
//       }

//       files.forEach( function (file){
//           console.log( file );
//       });
//    });
// });



