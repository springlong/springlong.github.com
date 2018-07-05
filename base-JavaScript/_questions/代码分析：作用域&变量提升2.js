// 请回答下述语句的执行结果

var x = 1, y = z = 0, b;

function add(n){
	b = n + 1;
}

y = add(x);

function add(n){
	b = n + 3;
}

z = add(x);

console.log(x, y, z, b);