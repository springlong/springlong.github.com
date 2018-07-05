// 请回答下述语句的执行结果
var a = 1;

(function(){
	f = function a(){
		alert(a);
	};
	alert(a);
})();

f();