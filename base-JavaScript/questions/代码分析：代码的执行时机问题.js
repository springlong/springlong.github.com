// 对于下列程序运行结果，符合预期的是（来自阿里2015春季前端实习校招笔试题）：

function f1 () {
	console.time('time span');
}
function f2 () {
	console.timeEnd('time span');
}
setTimeout (f1,100);
setTimeout (f2,200);

function waitForMs(n) {
	var now = Date.now();
	while (Date.now() - now < n) {}
}
waitForMs(500);


// A. time span :700.077ms
// B. time span :0.066ms
// C. time span :500.077ms
// D. time span :100.077ms