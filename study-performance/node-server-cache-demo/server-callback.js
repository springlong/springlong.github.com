
// 引入文件操作
// https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');

// 引入url模块
const url = require('url');

// 用于生成 md5 hash
const crypto = require('crypto');

// 返回server服务的回调函数
module.exports = (request, response) => {

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
	console.log('request for ' + path + ' reveived.');

	// 获取文件信息状态
	const promiseStat = new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				reject(err);
			} else {
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
			etag = fileStat.mtime.getTime() + conLen + '', // ETag标识（这里使用修改时间+内容长度表示，服务器实际生成规则可能不同）
			strMtime = fileStat.mtime.toUTCString(),       // 修改时间
			ext = /\.[^.]+$/.exec(path)[0];    // 扩展名

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
		let returnText = '.html|.js|.css|.txt'.includes(ext) ? true : false;

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

		// 读取缓存配置文件
		const cacheJSON = JSON.parse(fs.readFileSync('./cache.json'));

		// 根据配置规则纠正相关缓存配置字段的值
		if(cacheJSON['Cache-Control'] === 'false') {
			delete cacheJSON['Cache-Control'];
		}

		if(cacheJSON['Expires'] === 'false') {
			delete cacheJSON['Expires'];
		}else{
			cacheJSON['Expires'] = new Date(new Date().getTime() + (Number.parseInt(cacheJSON['Expires']) || 0)*1000).toUTCString();
		}

		if(cacheJSON['ETag'] === 'false') {
			delete cacheJSON['ETag'];
		}else{
			cacheJSON['ETag'] = etag;
		}

		if(cacheJSON['Last-Modified'] === 'false') {
			delete cacheJSON['Last-Modified'];
		}else{
			cacheJSON['Last-Modified'] = strMtime;
		}

		// 写入头信息
		response.writeHead(code, Object.assign({
			'Content-Type': CONTENT_TYPE[ext] || 'text/html',
			'Content-Length': conLen,
			'Date': new Date().toUTCString(),
			'Server': 'Node ' + process.version
		}, cacheJSON));

     	// 写入返回内容
     	if(code === 200) {
     		response.write(returnText ? fileData.toString() : fileData);
     	}

		// 发送响应数据
		response.end();
	})
	.catch(err => {

		console.log('code:', 404);
		console.log(err);

        // 写入头信息
		response.writeHead(404, {
     		'Content-Type': 'text/html'
		});

		// 写入返回内容
		response.write('<h1>您访问的页面不存在！</h1>');

		// 发送响应数据
		response.end();
	});
};
