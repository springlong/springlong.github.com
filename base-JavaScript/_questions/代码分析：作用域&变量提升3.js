// 下面代码的执行结果是？

function foo(a){
	var a;
	return a;
}

function bar(a){
	var a = 'bye';
	return a;
}

[foo('hello'), bar('hello')]
