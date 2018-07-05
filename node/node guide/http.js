'use strict'

// 引入http模块
const http = require('http');

// 引入文件操作
// https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');

// 打开浏览器页面
const open = require("open");

// 引入url模块
const url = require('url');
const { URL, URLSearchParams } = url;

// 用于生成MD5
const crypto = require('crypto');


// // 返回URL组成部分
// // new URL()的参数必须是一个完成的url，否则将报错
// // 如果得到的url字符串只是一部分，那么就需要使用url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
// const urlPart = new URL('https://sub.host.com:8080/p/a/t/h?query=string&test=yoyo#hash');
// console.log(urlPart);

// // 返回URL Search部分
// console.log('test参数：' + urlPart.searchParams.get('test'));
// console.log('未知参数：' + urlPart.searchParams.get('somename'));


// 创建服务器
// 每次http请求都将执行回调函数
const server = http.createServer((request, response) => {

	console.log('\n===========================================================\n');

	// request.url表示请求url的剔除协议、域名、端口后的剩余部分
	// 解析成Url对象
	const parseResult = url.parse(request.url);
	let path = decodeURI(parseResult.pathname.substr(1));  // url路径需要解码

	// 目录请求
	if(/\/$/.test(path) || path === '') {
		path += 'index.html';
	}

	// 输出请求的文件名
	// console.log(parseResult);
	console.log('request for ' + path + ' reveived.');

	// 当前http请求的方法
	console.log('request.method: ', request.method);

	// 当前http请求的头信息
	console.log('request.headers: ', request.headers);
	console.log('\n_______________\n')

	// // data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。
	// request.on('data', function(chunk) {
	// 	console.log('data事件: ', chunk);
	// });

	// // end事件则是在所有数据接收完成后触发。
	// request.on('end', function() {
	// 	console.log('end事件: ');
	// });

	// 遍历 response
	// for(let name in response){
	// 	console.log('response-' + name);
	// }

	// 获取文件信息状态
	const promiseStat = new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if(err) {
				reject(err);
			}else{
				resolve(stats);
			}
		});
	});

	// 读取文件内容
	const promiseReadFile = new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if(err) {
				reject(err);
			}else{
				resolve(data);
			}
		});
	})

	// 当文件内容和文件信息状态都获取成功后执行
	Promise.all([promiseStat, promiseReadFile])
	.then(([fileStat, fileData]) => {

		let code = 200,  // 状态码
			conLen = Buffer.byteLength(fileData),          // 内容长度（字节）
			etag = fileStat.mtime.getTime() + conLen + '', // ETag标识
			strMtime = fileStat.mtime.toUTCString(),       // 修改时间
			ext = /\.[^.]+$/.exec(parseResult.path)[0];    // 扩展名

		// 生成md5 hash
		etag = crypto.createHash('md5').update(etag).digest('hex');

		// 内容类型
		const CONTENT_TYPE = {
			'.html': 'text/html',
			'.js': 'application/javascript',
			'.css': 'text/css',
			'.jpeg': 'image/jpge',
			'.jpg': 'image/jpg',
			'.png': 'image/png',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
		}

		// 判断返回数据是文本还是二进制数据
		const returnText = '.html|.js|.css|.txt'.includes(ext) ? true : false;

		// 辨别304状态码
		let matchEtag = request.headers['if-none-match'];
		let matchModified = request.headers['if-modified-since'];
		if(matchEtag) {
			if(matchEtag === etag) {
				code = 304;
			}
		}else if(matchModified === strMtime) {
			code = 304;
		}
		console.log('etag:', etag, ' | if-none-match:', matchEtag, ' | ' + (matchEtag === etag));
		console.log('modified:', strMtime, ' | if-modified-since', matchModified + ' | ' + (matchModified === strMtime));
		console.log('code:', code);

		// 写入头信息
     	response.writeHead(code, {
     		'Content-Type': CONTENT_TYPE[ext] || 'text/html',
			'Content-Length': conLen,
     		'Cache-Control': 'max-age=' + 60*60*24*30,
     		'Expires': new Date(new Date().getTime() + 15*1000).toUTCString(),
     		'Date': new Date().toUTCString(),
     		'ETag': etag,
     		'Last-Modified': strMtime,
     		'Server': 'Node.js/' + process.version,
     	});

     	// 写入返回内容
     	if(code === 200) {
     		response.write(returnText ? fileData.toString() : fileData);
     	}

		// 发送响应数据
		response.end();
	})
	.catch(err => {

		console.log('code:', 404);

        // 写入头信息
		response.writeHead(404, {
     		'Content-Type': 'text/html'
		});

		// 写入返回内容
		response.write('<h1>您访问的页面不存在！</h1>');

		// 发送响应数据
		response.end();
	});

});

// 监听端口
server.listen(8000);

// 控制台输出提示
console.log('Server running at http://localhost:8000/');

// 浏览器打开页面
open('http://localhost:8000/');
