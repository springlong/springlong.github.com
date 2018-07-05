
console.log('module main start');


// 模块声明需要依赖其它模块，只有当依赖的模块全部加载并执行完毕后，才会执行后面的函数
define(['js/cookie', 'js/test', 'js/test2'], function(cookie, test, test2){

	console.log('module main code');

	console.info("cookie.js: \n", cookie);
	console.info("test.js: \n", test);
	console.info("test2.js: \n", test2);

    return {
        a: 1,
        b: 2
    }
});

console.log('module main end');