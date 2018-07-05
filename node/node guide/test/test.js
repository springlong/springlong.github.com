#!/usr/bin/env node

const fs = require('fs-extra'),
	path = process.cwd();

const run = (obj) => {

	if(obj[0] === '-v') {

		console.log('version is 1.0.0');

	}else if(obj[0] === '-ls'){

		fs.readdir(path, function(err, files) {
			if(err) {
				return console.log(err);
			}
			for(let i = 0, len = files.length; i<len; i++){
				console.log(files[i]);
			}
		});

	}else {

		console.log('Useage: test [options]');
		console.log('\nOptions:')
		console.log('  -v, --version \t[show version]');
		console.log('  -ls, --list \t\t[show file lists]');
	}
}

// 获取除第一个命令以后的参数
run(process.argv.slice(2));