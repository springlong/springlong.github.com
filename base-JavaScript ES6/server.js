'use strict'

const http = require('http');
const url = require('url');
const fs = require('fs-extra');

// 创建服务器
http.createServer(function(request, response){

	// 解析成Url对象
	const parseResult = url.parse(request.url);

	// url-文件路径
	let pathname = parseResult.pathname;

	// 输出请求的文件名
	console.log('request for ' + pathname + ' reveived.');

	// 从文件系统读取请求的文件内容
	fs.readFile(pathname.substr(1), function(err, data){

		if(err) {

			console.log(err);

	        // HTTP 状态码: 404 : NOT FOUND
         	// Content Type: text/plain
			response.writeHead(404, {'Content-Type': 'text/html'});

		}else{

			// HTTP 状态码: 200 : OK
			// Content Type: text/plain
         	response.writeHead(200, {'Content-Type': 'text/html'});

         	// 响应文件内容
         	response.write(data.toString());
		}

		// 发送响应数据
		response.end();
	});

}).listen(8080);

// 控制台输出提示
console.log('Server running at http://127.0.0.1:8080/');