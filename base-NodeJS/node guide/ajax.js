'use strict'

const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');


const postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';




http.createServer((request, response) => {

    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
        console.log('on-data:', chunk);
        console.log('on-data-body:', body);
    });

    request.on('end', () => {

        // 解析参数
        // 把一个 URL 查询字符串 str 解析成一个键值对的集合
        // querystring.parse(str[, sep[, eq[, options]]])
        body = querystring.parse(body);

        console.log(body);

        response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

        if(body.name && body.url) {
            response.write('网站名：' + body.name);
            response.write('<br>');
            response.write('网站url：' + body.url);
        }else{
            response.write(postHTML);
        }

        response.end();
    });

}).listen(3000);

 





// // 获取GET请求内容
// // 创建服务器
// http.createServer((request, response) => {

//     response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

//     // 打印request.url
//     // 不包含http://127.0.0.1:300部分
//     response.write('request.url:' + request.url + '\n');

//     // 将url解析对象转换为字符串形式输出
//     response.write(util.inspect(url.parse(request.url, true)));

//     // 获取url参数
//     // url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
//     // 如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。
//     const queryPart = url.parse(request.url, true).query;

//     // 遍历参数列表并输出
//     for(let name in queryPart) {
//         response.write('\r' + name + ':' + queryPart[name]);
//     }

//     // 发送响应数据
//     response.end();

// }).listen(3000);


// 控制台输出提示
console.log('Server running at http://127.0.0.1:3000/');