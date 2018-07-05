'use strict'

// 引入http模块
const http = require('http');

// 打开浏览器页面
const open = require("open");

// server回调
const serverCallback = require('./server-callback.js');

// 创建服务器
// 每次http请求都将执行回调函数
const server = http.createServer(serverCallback);

// 监听端口
server.listen(8000);

// 控制台输出提示
console.log('Server running at http://127.0.0.1:8000/');

// 浏览器打开页面
open('http://127.0.0.1:8000/pages/index/index.html');
