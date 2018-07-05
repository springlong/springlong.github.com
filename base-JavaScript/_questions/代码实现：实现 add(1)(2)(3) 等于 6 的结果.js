// 实现 add(1)(2)(3) --> 6 的结果

// 要点一：函数执行后每次都将返回一个用于相加的函数，以供持续调用
// 要点二：JavaScript 中的数值运算和字符串取值，每次都会调用自身的 .valueOf() 和 .toString() 来取值

function add(num)
{
	// 保存相加的和
	var sum = num;

	// 每次函数调用都将返回这个函数用于继续执行参数调用
	var add = function(num){
		sum += num;
		return add;
	};

	// 改写 .valueOf() 和 .toString() ，以保证字符串输出或者参与数值运算时能够取得正确的结果值
	add.toString = add.valueOf = function(){
		return sum;
	};

	return add;
}

console.log( add(1)(2)(3) );