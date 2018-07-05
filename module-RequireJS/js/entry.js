
console.log('module entry start');


// 使用局部require加载依赖
// requireJS会通过函数代码体查找依赖关系并加载执行，之后才会执行该模块的代码体，之后遇到require()语句将对应模块的导出值返回
define('js/entry', function(require, exprots, module){

	console.log('module entry code');

	console.log('module entry require cookie.js');
	var cookie = require("js/cookie");
	console.info("cookie.js: \n", cookie);

	console.log('module entry require test.js');
	var test = require("js/test");
	console.info("test.js: \n", test);

	console.log('module entry require test2.js');
	var test2 = require("js/test2");
	console.info("test2.js: \n", test2);

	console.log('module entry require end');

    return {
        a: 1,
        b: 2
    }
});

console.log('module entry end');