
console.log('module main start');

// 不配置模块id和依赖关系的情况下：
// 模块id：默认为脚本文件路径
// 依赖关系：默认会通过函数体的代码体进行查找
// define(function(require, exports, module){

// seajs.use根据模块id加载指定脚本文件后，
// 如果该模块定义所使用的模块id与其不一致时，该模块将不会被执行
// define('main', [], function(require, exports, module){

// 只有当模块定义所使用的模块id与seajs.use所使用的模块id一致时，模块代码才会被执行
// 如果指定了依赖关系，那么seajs将不再对函数体进行查找来确认该模块依赖了哪些模块，所以在这种情况下，该模块下的依赖将不会被加载，require的结果将为null
// define('js/main', [], function(require, exports, module){

// 一个完整的define定义，应该包含正确的模块id，和依赖关系
define('js/main', ['local/cookie', 'local/test', 'local/test2'], function(require, exports, module){

	console.log('module main code');

	console.log('module main require cookie.js');
	var cookie = require("local/cookie");
	console.info("cookie.js: \n", cookie);

	console.log('module main require test.js');
	var test = require("local/test");
	console.info("test.js: \n", test);

	console.log('module main require test2.js');
	var test2 = require("local/test2");
	console.info("test2.js: \n", test2);

	console.log('module main require end');


    return {
        a: 1,
        b: 2
    }
});

console.log('module main end');