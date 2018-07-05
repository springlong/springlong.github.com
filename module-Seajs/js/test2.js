
console.log('module test2 start');

define(function(require, exports, module){

	console.log('module test2 code');

    return {
    	prop: 'test2.js'
    };
});

console.log('module test2 end');