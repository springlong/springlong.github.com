
console.log('module test start');

define("testAlias", [], function(require, exports, module){

	console.log('module test code');

    return {
    	prop: 'test.js'
    };
});

console.log('module test end');